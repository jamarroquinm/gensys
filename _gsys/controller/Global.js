Ext.define('Gsys.controller.Global', {
    extend: 'Ext.app.Controller',
    alias: 'controller.gloabal',

    runner: new Ext.util.TaskRunner(),
    task: null,

    requires: [
        'Ext.window.Toast',
        'Ext.window.MessageBox',
        'Ext.util.TaskRunner'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: '#myviewport'
        }
    ],

    control: {
        '#login button': {
            click: 'onButtonLoginClick'
        },

        '#lock button': {
            click: 'onButtonUnlockClick'
        },

        '#setpassword button': {
            click: 'onButtonPasswordClick'
        },

        '#exitSystem': {
            click: 'onButtonExitSystemClick'
        },

        '#exitSystem menuitem': {
            click: 'onMenuExitSystemClick'
        },

        '#mainmenuopciones button': {
            click: 'onButtonMainMenuClick'
        },

        '#submainmenu button': {
            click: 'onButtonSubMainMenuClick'
        },

        '#crudbar button': {
            click: 'onCurdToolButtonTap'
        },

        '#tabla': {
            itemdblclick: 'onTablaDblClick'
        },

        '#curdwindow': {
            close: 'onCrudWindowClose'
        },

        '#crudsave': {
            click: 'onCrudWindowSaveButtonClick'
        },

        'textfield[verificaClave]': {
            blur: 'onTextfieldClaveBlur'
        },

        'textfield[verificaUsuario]': {
            blur: 'onTextfieldUsuarioBlur'
        },

        '#tabla tool[type=refresh]': {
            click: 'onTablaCatalagoRefresh'
        },        
    },

    listen: {
        controller: {
            '*': {
                informa: 'onInformaUsuario',
                mask: 'onViewPortMask',
                unmask: 'onViewPortUnMask'
            }
        }
    },

    init: function() {
        this.task = this.runner.newTask({
            run: this.actualizaInformacion,
            interval: 600000,
            scope: this
        });
    }, 

    actualizaInformacion: function(){
        this.fireEvent('actualizaInformacion');
    },

    onViewPortMask: function(msj) {
        if(!msj) {
            msj = "Procesando, un momento..."
        }

        this.getViewport().mask(msj);
    },

    onViewPortUnMask: function() {
        this.getViewport().unmask();
    },

    //Controla las opciones del menu principal
    onButtonMainMenuClick: function(button){
        var view = button.up('myviewport').down('#subdesk');
        view.setActiveItem(button.opcion);
    },

    //Salir del sistema
    onButtonExitSystemClick: function( button ){
        var view = button.up('myviewport'),
            inibtn = view.down('#mainmenuopciones').getComponent(0),
            subdesk = view.down('#subdesk');

        Ext.Msg.show({
            title: 'Salir',
            message: 'Salir del sistema?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function(btn) {
                if (btn === 'yes') {

                    inibtn.setPressed(true);
                    subdesk.setActiveItem(0);
                    view.setActiveItem('login');
                    this.cierraStores();
                    this.task.stop();
                    
                    this.fireEvent('loggedout');
                }
            }
        });
    },

    onMenuExitSystemClick: function( menu ){
        var view = menu.up('myviewport'),
            mod = view.getViewModel(),
            opc = menu.opc,
            subview;

        if( opc == 'lock') {
            subview = view.setActiveItem('lock');
            subview.setUsuario(mod.get('usuario'));
        }
        else if( opc == 'password') {
            subview = view.setActiveItem('password');
            subview.setUsuario(mod.get('usuario'));
        }
        else if( opc == 'idioma') {
            this.cambiarIdioma();
        }
        else {
            this.fireEvent('menu' + opc);
        }
    },


    //Controla las opciones del submenu principal
    onButtonSubMainMenuClick: function(button){
        var view = button.up('subdesk').down('#workarea');
        view.setActiveItem(button.opcion);
    },

    //Operacion de login
    onButtonLoginClick: function(button, e, eOpts) {
        var view = button.up('myviewport'),
            win = button.up('login'),
            url = win.getUrl(),
            cntx = win.getContext(),
            user = win.down('#username'),
            pswd = win.down('#password'),
            obj, cve, psw;

        button.setDisabled(true);

        Ext.Ajax.request({
            url: url,

            params: {
                L0913_gcvT: cntx,
                x12wex_KYt: user.getValue(),
                ars4TK_1jk: pswd.getValue()
            },

            success: function(response, opts) {
                obj = Ext.decode(response.responseText);
                psw = pswd.getValue();

                if(obj.error === 0) {

                    user.reset();
                    pswd.reset();

                    obj.clave = cve;

                    this.sesion = obj.id;
                    this.password = psw;

                    this.preparaProxies(obj.id);
                    this.fireEvent('userLogged', obj);

                    // var updatesSource = new EventSource("php/updater.php?jg6tgv}=" + obj.id );

                    // updatesSource.addEventListener('update', function(e) {
                    //     var info = Ext.decode(e.data.rot13());
                    //     me.fireEvent('tablasUpdate', info);
                    // }, false);

                    if( obj.mensaje ) {
                        Ext.Msg.alert( 'Error', obj.mensaje );
                    }

                    if(cntx !== 'demo') this.task.start();
                    view.setActiveItem('desk');
                }
                else {
                    Ext.Msg.alert( 'Error', obj.error + ': ' + obj.info);
                }
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            },

            callback: function() {
                button.setDisabled(false);
            },

            scope: this
        });
    },

    onButtonUnlockClick: function(button){
        var view = button.up('myviewport'),
            win = button.up('lock'),
            pswf = win.down('#password'), 
            psw = pswf.getValue();

        if( psw && psw === this.password ){
            pswf.reset();
            view.setActiveItem('desk');
        }
        else {
            Ext.Msg.alert('Error', 'Credenciales inválidas');
        }
    },

    onButtonPasswordClick: function(button){
        var opc = button.getText().toLowerCase(),
            view = button.up('myviewport'),
            win = button.up('password'),
            pswaf = win.down('#password'), 
            psw1f = win.down('#nueva1'), 
            psw2f = win.down('#nueva2'), 
            pswa = pswaf.getValue(),
            psw1 = psw1f.getValue(),
            psw2 = psw2f.getValue(),
            me = this;

        if( opc == 'cambiar'){
            if( pswa && pswa === this.password ){
                if( psw1 && psw1 == psw2 ) {
                    if( pswa != psw1 ) {
                        cambiaClave();
                    }
                    else {
                        Ext.Msg.alert( 'Error', 'La clave nueva debe ser diferente a la actual');
                    }
                }
                else {
                    Ext.Msg.alert( 'Error', 'Las claves proporcionadas no coinciden');
                }
            }
            else {
                Ext.Msg.alert( 'Error', 'Clave acual inválida');
            }
        }
        else {
            pswaf.reset();
            psw1f.reset();
            psw2f.reset();
            view.setActiveItem('desk');
        }

        function cambiaClave() {

            Ext.Ajax.request({
                url: win.getUrl(),
            
                params: {
                    sesion: me.sesion,
                    actual: pswa,
                    nvo1: psw1,
                    nvo2: psw2
                },
            
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
            
                    if(obj.error === 0) {
            
                        Ext.toast('Clave de usuario cambiada con éxito');

                        pswaf.reset();
                        psw1f.reset();
                        psw2f.reset();

                        me.password = psw1;
                        view.setActiveItem('desk');
                    }
                    else {
                        Ext.Msg.alert( 'Error', 'Se ha presentado un error!<br>' + obj.error + ': ' + obj.info);
                    }
                },
            
                failure: function(response, opts) {
                    Ext.Msg.alert( 'Error', 'Error interno ' + response.status );
                },
            
                scope: this
            });
        }
    },

    //Valida los campo clave
    onTextfieldClaveBlur: function(component, event, eOpts) {
        var win = component.up('window'),
            ope = win.getOperacion(),
            scr = win.getValidaEn(),
            id = 0,
            rec;

        if( ope == 'edit' ) {
            rec = win.down('form').getRecord();
            id = rec.get('id');
        }

        Ext.Ajax.request({
            url: scr + '.php?operation=val',
            scope : this,

            params: {
                clave: component.getValue(),
                sesion: this.sesion,
                id: id,
                zid: ( win.getTablaId() ? win.getTablaId() : 0 )
            },

            headers: {
                'Accept': 'application/json'
            },

            success: function(response) {
                var json = Ext.JSON.decode(response.responseText),
                    valida = json.valida;

                if( valida ) {
                    component.verificaClave = true;

                } else {
                    component.verificaClave = 'No es posible usar este dato!';
                }

                //verificamos si el componente existe. Si se cerro la ventana ya no existe
                if( component.getEl() ) component.validate();
            },

            failure: function(response)
            {
                Ext.Msg.show({
                    title :'ERROR ',
                    msg : 'Se ha presentado un error en el sistema',
                    icon :Ext.Msg.ERROR,
                    buttons :Ext.Msg.OK
                });
            }
        });
    },

    onTextfieldUsuarioBlur: function(component, event, eOpts) {
        var win = component.up('window'),
            ope = win.getOperacion(),
            scr = win.getValidaEn(),
            id = 0,
            rec;

        if( ope == 'edit' ) {
            rec = win.down('form').getRecord();
            id = rec.get('id');
        }

        Ext.Ajax.request({
            url: scr + '.php?operation=usr',
            scope : this,

            params: {
                usuario: component.getValue(),
                sesion: this.sesion,
                id: id
            },

            headers: {
                'Accept': 'application/json'
            },

            success: function(response) {
                var json = Ext.JSON.decode(response.responseText),
                    valida = json.valida;

                if( valida ) {
                    component.verificaClave = true;

                } else {
                    component.verificaClave = 'No es posible usar este dato!';
                }

                //verificamos si el componente existe. Si se cerro la ventana ya no existe
                if( component.getEl() ) component.validate();
            },

            failure: function(response)
            {
                Ext.Msg.show({
                    title :'ERROR ',
                    msg : 'Se ha presentado un error en el sistema',
                    icon :Ext.Msg.ERROR,
                    buttons :Ext.Msg.OK
                });
            }
        });
    },

    preparaProxies: function(id) {
        var store, proxy;

        for( i=0; i<Ext.data.StoreManager.getCount(); i++) {
            store = Ext.data.StoreManager.getAt(i);
            proxy = store.getProxy();

            if(proxy) {
                if( proxy.type == 'ajax') {
                    proxy.setExtraParam('IhQYw45L6i', id);
                    if(store.cargar || store.isLoaded() ) store.load();
                }
            }
        }
    },

    cierraStores: function() {
        var store, proxy;

        for( i=0; i<Ext.data.StoreManager.getCount(); i++) {
            store = Ext.data.StoreManager.getAt(i);
            proxy = store.getProxy();

            if(proxy) {
                if( proxy.type == 'ajax') {
                    proxy.setExtraParam('IhQYw45L6i', null);
                    store.removeAll(true);
                }
            }
        }
    },

    onCrudWindowClose: function(panel){
        var frm = panel.down('form');
        if( frm ) frm.reset();
    },

    onTablaDblClick: function(view, record) {
        var tool = view.up('container').up('container').down('crudbar'),
            btn;

        if( tool ) {
            btn = tool.down('#editar');
            this.onCurdToolButtonTap(btn);
        }        
    },

    onTablaCatalagoRefresh: function(btn){
        var store = btn.up('grid').getStore();
        store.load();
    },

    onCurdToolButtonTap: function(button) {
        var ope = button.ope,
            view = button.up('container').up('container'),
            grid = view.down('grid'),
            storeId = view.getStoreId();

        if( ope == 'add' || ope == 'edit' ) {

            var sto = Ext.getStore(storeId),
                mdl = sto.getModel(),
                win = Ext.widget('curdwindow'),
                frm = Ext.widget(view.getForm()),
                tit = view.getFormTitle(),
                rec;

            win.add(frm);
            win.setStoreName(storeId);
            win.setTipo(view.getType());
            win.setValidaEn(view.getValidationUrl());
            win.setTitle(view.getFormTitle());
            win.setTablaId(view.getTableId());

            rec = grid.selection;

            if ( ope == 'add' ) {

                if( view.getType() == 'tree' ) {
                    win.setPadreId( rec ? rec.get('id') : 'root' );
                }

                rec = Ext.create(mdl);
                frm.loadRecord(rec);
                
                win.setIconCls('x-far fa-plus-square');
                win.setOperacion('add');

                if( typeof frm.postAddDefinition === 'function') {
                    frm.postAddDefinition();
                }

                win.show();
            }
            else {
                
                if( rec ) {
                    frm.loadRecord(rec);
                    win.setIconCls('x-far fa-edit');

                    if( ope == 'edit' ){
                        win.setOperacion('edit');
                    }
                    else {
                        win.setOperacion('see');
                    }

                    if( typeof frm.postEditDefinition === 'function') {
                        frm.postEditDefinition();
                    }

                    win.show();
                }
            }
        }

        if( ope == 'del' ) {

            var sel = grd.getSelectionModel(),
                cnt = sel.getCount(),
                tit = tool.getFormTitles(),
                rec, store, tipo, pid, node;

            if( cnt == 1 ){
                rec = grd.selection;

                if(rec){

                    tipo = tool.getType();
                    pid = rec.get('id');

                    Ext.Msg.show({
                        title: tit.del,
                        msg: 'Se borrará el registro, continuar?',
                        icon :Ext.Msg.QUESTION,
                        buttons :Ext.Msg.YESNO,

                        fn: function(button){
                            if( button === "yes" ) {

                                store = grd.getStore();

                                if( tipo === 'tree') {
                                    node = store.getNodeById(pid);
                                    grd.expandNode(rec, false, function(){

                                        if(node.hasChildNodes()){
                                            Ext.Msg.alert( 'Error', 'Imposible borrar!');
                                        }
                                        else {
                                            node.remove();
                                            store.sync();
                                        }

                                    }, this);
                                }
                                else {
                                    store.remove(rec);
                                    store.sync({
                                        failure: function(batch, opts){
                                            var error = batch.exceptions[0].getResponse().responseJson;
                        
                                            store.load();
                        
                                            if( error.info ) {
                                                Ext.Msg.alert( 'Error', error.error + ': ' + error.info);
                                            }
                                            else {
                                                Ext.Msg.alert( 'Error', 'Se ha presentado un error con la conexion del servidor!!');
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        }

    },

    onCrudWindowSaveButtonClick: function(button) {

        var win = button.up('window'),
            frm = win.down('form'),
            val = frm.getValues(),
            ope = win.getOperacion(),
            sto = win.getStoreName(),
            pid = win.getPadreId(),
            tipo = win.getTipo(),
            store = Ext.getStore(sto),
            recs, rec, id, node, vac;

        if( frm.isValid() ){

            if( ope === 'add') {

                if(tipo === 'tree') {

                    rec = Ext.create(store.getModel(), val);

                    val.padreId = pid;
                    store.getNodeById(pid).appendChild(rec);
                }
                else {
                    recs = store.add(val);
                    rec = recs[0];
                }
            }

            if( ope === 'edit') {
                rec = frm.getRecord();
                id = rec.get('id');

                if(tipo === 'tree') {
                    store.getNodeById(id).set(val);
                }
                else {
                    rec.set(val);
                }
            }

            store.sync({
                success: function() {
                    var evento = win.getEvento(),
                        eid = win.getEventoId();

                    if( evento ){
                        if( eid ) {
                            this.fireEvent(evento, {id: eid});
                        }
                        else {
                            this.fireEvent(evento);
                        }
                    }
                },

                failure: function(batch, opts){
                    var error = batch.exceptions[0].getResponse().responseJson;

                    if(ope == 'edit'){
                        rec.reject();
                    }

                    if(ope == 'add'){
                        rec.erase();
                    }

                    if( error.info ) {
                        Ext.Msg.alert( 'Error', error.error + ': ' + error.info);
                    }
                    else {
                        Ext.Msg.alert( 'Error', 'Se ha presentado un error con la conexion del servidor!!');
                    }
                },

                scope: this
            });

            win.close();
        }
    },

    onInformaUsuario: function(data) {
        var desk = this.getApplication().getMainView().down('#desk'),
            lbl = desk.down( '#nota' + data.pos );

        if( lbl )
            lbl.setText(data.info);
    }

});

String.prototype.rot13 = function(){
    return this.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toDate = function (d,m,a) {
    var ano = parseInt(this.substr(0,4)) + ( a || 0 ),
        mes = parseInt(this.substr(5,2)) - 1 + ( m || 0),
        dia = parseInt(this.substr(8,2)) + ( d || 0);
    return new Date(ano,mes,dia);
};

function post(path, params ) {
    
    var method = 'post',
        target = 'ventana',
        form = document.createElement("form"),
        win;

    form.setAttribute("method", method);
    form.setAttribute("action", path);
    form.setAttribute("target", target);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);

    win = window.open('', target, 'fullscreen=1,location=0,menubar=0,toolbar=0');
    form.submit();

    document.body.removeChild(form);
}

function calculaRfcCurp( nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero, estado ){
    
    var rfc = '', curp = '',
        nom = limpiaNombre(nombre),
        app = limpiaApellido(apellidoPaterno),
        apm = limpiaApellido(apellidoMaterno),
        completo = remueveAcentos( apellidoPaterno + ' ' + apellidoMaterno + ' ' + nombre ),
        hom = homonimia(completo),
        fecha = Ext.util.Format.date(fechaNacimiento, 'ymd'),
        p17 = fechaNacimiento.getFullYear() < 2000 ? '0' : 'A',
        claveGenero = {m: 'H', f:'M'},
        ret = {rfc: null, curp: null};

    if( app && apm ) {
        if( app.length >= 3 ){
            rfc = app.substr(0,1) + primeraVocal(app) + apm.substr(0,1) + nom.substr(0,1);            
        }
        else {
            rfc = app.substr(0,1) + apm.substr(0,1) + nom.substr(0,2);  
        }
    }
    else {
        var apx = app || apm;
        rfc = apx.substr(0,2) + nom.substr(0,2);
    }

    rfc = filtraRfc(rfc);
    curp = rfc + fecha;
    rfc += fecha + hom;
    rfc += digitoVerificadorRfc(rfc);

    curp += claveGenero[genero] + claveEstado(estado) + primeraConsonante(app) + primeraConsonante(apm) + primeraConsonante(nom);
    curp += p17 + digitoVerificadorCurp(curp);

    if( nombre && apellidoPaterno && apellidoMaterno && fechaNacimiento ) {
        ret.rfc = rfc;
        if( genero && estado ) ret.curp = curp;
    }

    return ret;


    function limpiaNombre(s){
        var comunes = ['MARIA', 'MA', 'JOSE'],
            nombres = remueveAcentos(s).split(' '),
            nombre = nombres[0];

        if(nombres.length > 1) {
            nombres = filtraArticulos(nombres);
            if( comunes.includes(nombre) ) {
                return nombres[1];
            }
        }

        return nombre;
    }

    function limpiaApellido(s) {
        var apes = remueveAcentos(s).split(' ');

        if(apes.length > 0){
            apes = filtraArticulos(apes);
        }

        return apes[0];
    }

    function primeraVocal(s) {
        for( l of s ) { if( "AEIOU".indexOf(l) >= 0 ) return l; }
    }

    function primeraConsonante(s) {
        var ret = 'X',
            s = s.substr(1);

        if(s){
            for( l of s ) { 
                if( "BDFGHJKLMNÑPQRSTVXYZ".indexOf(l) >= 0 ) {
                    ret = l;
                    break;
                }
            }
        }
        return ret == 'Ñ' ? 'X' : ret;
    }
    
    function remueveAcentos(s) {
        var r = s.trim().replace(/\./g, '').toLowerCase();
        no_asciis = { 'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 
                        'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]', ' ': '[-",\']' };
        for (i in no_asciis) { r = r.replace(new RegExp(no_asciis[i], 'g'), i); }
        return r.toUpperCase();
    }

    function filtraArticulos(a) {
        var artypre = ['EL', 'LA', 'LOS', 'LAS', 'AL', 'LO', 'DEL', 'Y', 'CON', 'DE', 'D', 'L', 'MC', 'MAC', 'MI', 'VAN', 'VON'];
        
        return a.filter( function(nombre){
            return !artypre.includes(nombre);
        });
    }

    function filtraRfc(s) {
        var malas = [
            'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'COGE', 'COJA', 'COJE', 'COJI', 'COJO', 'CULO', 
            'FETO', 'GUEY', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KOGE', 'KOJO', 'KAKA', 'KULO', 'MAME', 'MAMO', 
            'MEAR', 'MEON', 'MION', 'MOCO', 'MULA', 'PEDA', 'PEDO', 'PENE', 'PUTA', 'PUTO', 'QULO', 'RATA', 'RUIN'                        
        ]

        for( mal of malas ){
            if( mal == s ) return s.substr(0,3) + 'X';
        }

        return s;
    }

    function homonimia(nombre) {
        var tab1 = { ' ': '00', '0': '00', '1': '01', '2': '02', '3': '03', '4': '04', '5': '05', '6': '06',
                        '7': '07', '8': '08', '9': '09', '&': '10', 'A': '11', 'B': '12', 'C': '13', 'D': '14',
                        'E': '15', 'F': '16', 'G': '17', 'H': '18', 'I': '19', 'J': '21', 'K': '22', 'L': '23',
                        'M': '24', 'N': '25', 'O': '26', 'P': '27', 'Q': '28', 'R': '29', 'S': '32', 'T': '33',
                        'U': '34', 'V': '35', 'W': '36', 'X': '37', 'Y': '38', 'Z': '39', 'Ñ': '40' },
            tab2 = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                        'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ],
            cadena = '0',
            base = 0, mul = 0, tot = 0, res = 0, cos = 0;
        
        for( l of nombre ) { 
            cadena += tab1[l];
        }

        for( i=1; i<cadena.length; i++ ) {
            base = parseInt( cadena.substr(i-1,2) );
            mul = parseInt( cadena.substr(i,1) );
            tot += base * mul;
        }

        base = parseInt( ('000'+ tot.toString()).substr(-3) );
        cos = Math.floor( base / 34 );
        res = base % 34;

        return tab2[cos] + tab2[res];
    }

    function digitoVerificadorRfc(rfc) {
        var tab1 = { '0':  '0', '1':  '1', '2':  '2', '3':  '3', '4':  '4', '5':  '5', '6':  '6', '7':  '7', '8':  '8', '9':  '9', 
                        'A': '10', 'B': '11', 'C': '12', 'D': '13', 'E': '14', 'F': '15', 'G': '16', 'H': '17', 'I': '18', 'J': '19', 
                        'K': '20', 'L': '21', 'M': '22', 'N': '23', '&': '24', 'O': '25', 'P': '26', 'Q': '27', 'R': '28', 'S': '29', 
                        'T': '30', 'U': '31', 'V': '32', 'W': '33', 'X': '34', 'Y': '35', 'Z': '36', ' ': '37', 'Ñ': '38'  },
            pos = 13,
            tot = 0,
            res = 0,
            mod = 0,
            dv = '0';

        for( i=0; i<12; i++){
            tot += tab1[rfc.substr(i,1)] * pos--;
        }

        mod = tot % 11;

        if( mod > 0 ){
            res = 11 - mod;
            dv = res == 10 ? 'A' : res.toString();
        }
        else {
            dv = '0';
        }

        return dv;
    }

    function digitoVerificadorCurp(curp) {
        var tab1 = { '0':  0, '1':  1, '2':  2, '3':  3, '4':  4, '5':  5, '6':  6, '7':  7, '8':  8, '9':  9, 'A': 10, 'B': 11, 
                        'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 
                        'Ñ': 24, 'O': 25, 'P': 26, 'Q': 27, 'R': 28, 'S': 29, 'T': 30, 'U': 31, 'V': 32, 'W': 33, 'X': 34, 'Y': 35, 
                        'Z': 36 },
            pos = 18,
            tot = 0,
            res = 0,
            dv = '0';

        for( i=0; i<16; i++){
            tot += tab1[curp.substr(i,1)] * pos--;
        }

        res = 10 - tot % 10;
        dv = res == 10 ? '0' : res.toString();

        return dv;
    }

    function claveEstado(estado) {
        var pais = {
            'Aguascalientes': 'AS',
            'Baja California': 'BC',
            'Baja California Sur': 'BS',
            'Campeche': 'CC',
            'Coahuila': 'CL',
            'Colima': 'CM',
            'Chiapas': 'CS',
            'Chihuahua': 'CH',
            'Ciudad de México': 'DF',
            'Durango': 'DG',
            'Guanajuato': 'GT',
            'Guerrero': 'GT',
            'Hidalgo': 'HG',
            'Jalisco': 'JC',
            'México': 'MC',
            'Michoacán': 'MN',
            'Morelos': 'MS',
            'Nayarit': 'NT',
            'Nuevo León': 'NL',
            'Oaxaca': 'OC',
            'Puebla': 'PL',
            'Querétaro': 'QT',
            'Quintana Roo': 'QR',
            'San Luis Potosí': 'SP',
            'Sinaloa': 'SL',
            'Sonora': 'SR',
            'Tabasco': 'TC',
            'Tamaulipas': 'TS',
            'Tlaxcala': 'TL',
            'Veracruz': 'VZ',
            'Yucatán': 'YN',
            'Zacatecas': 'ZS'
        };

        return pais[estado];
    }
}

function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}

function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}


function getEdad (val) {
    var ano0 = parseInt(val.substr(0,4)),
        mes0 = parseInt(val.substr(5,2)) - 1,
        dia0 = parseInt(val.substr(8,2)),
        hoy = new Date(),
        ano1 = hoy.getFullYear(),
        base = new Date(ano1, mes0, dia0, 23, 59, 59, 999),
        dias0 = parseInt(Ext.util.Format.date(base, 'z' )),
        dias1 = parseInt(Ext.util.Format.date(hoy, 'z' )),
        frac = (dias1 - dias0) / 365,
        anos = ano1 - ano0 + frac;

    return anos;
}