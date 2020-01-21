<?php

require_once "Mail.php";
require_once "Mail/mime.php";

function enviaCorreo( $to, $subject, $body, $empresaId, $grupoId = 0, $cc = "", $bcc = "", $fotos = false ){

	if( $empresaId ) {

		$sql = "Select correoalias from empresa where id = ?";
		$args = array($empresaId);
		$empresa = get($sql, $args);

		$alias = $empresa['correoalias'];

		$sql = "Select
					e.id,
					s.emserver,
					s.emport,
					s.emuser,
					s.empassword
				From
					empresa as e
				Join
					grupo as g on g.id = e.grupoId
				Join
					emserver as s on s.id = g.emserverId
				Where
					e.id = ?";

		$emserver = get($sql, $args, true);
	}
	else if( $grupoId ) {
		$alias = 'Groupward';

		$sql = "Select
				s.emserver,
				s.emport,
				s.emuser,
				s.empassword
			From
				grupo as g
			Join
				emserver as s on s.id = g.emserverId
			Where
				g.id = ?";
		$args = array($grupoId);
		$emserver = get($sql, $args, true);
	}
	else {
		return false;
	}

	$from = decrypt($emserver['emuser']);
	$server = decrypt($emserver['emserver']);
	$port = decrypt($emserver['emport']);
	$password = decrypt($emserver['empassword']);

	$recipients = "";
	$body .= "<br><br><small>Este mensaje ha sido enviado por un servicio automático.<br>Por favor no lo responda ya que la cuenta no es monitoreada</small>";

	if( $to )  $recipients = $to;
	if( $cc )  $recipients .= ( $recipients ? ", " : "" ) . $cc;
	if( $bcc ) $recipients .= ( $recipients ? ", " : "" ) . $bcc;

	if( $alias ) {
		$de = '"' . $alias . '" <' . $from .'>';
	}
	else {
		$de = $from;
	}

	$hdrs = array(
		'From' => $de,
		'To' => $to,
		'Subject' =>  $subject,
		'Charset' => 'UTF-8',
		'Content-Type' => 'text/html; charset=UTF-8'
	);

    $mime_params = array(
        'text_encoding' => '7bit',
        'text_charset'  => 'UTF-8',
        'html_charset'  => 'UTF-8',
        'head_charset'  => 'UTF-8'
    );

	$message = new Mail_mime("\n");	
	$message->setHTMLBody($body); 

	if( $fotos ) {
		foreach($fotos as $foto){
			$message->addAttachment($foto);
		}
	}

	$body = $message->get($mime_params); 
	$headers = $message->headers($hdrs); 
	
	$smtp = Mail::factory('smtp',
		array (
			'host' => $server,
			'port' => $port,
			'auth' => true,
			'username' => $from,
			'password' => $password
		)
	);
	
	$mail = $smtp->send($recipients, $headers, $body);
	
	if( $mail ) {
		return true;
	}
	else { 
		return false;
	}
}

?>