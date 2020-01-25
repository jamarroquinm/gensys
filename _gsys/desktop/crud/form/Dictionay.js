Ext.define('Gsys.desktop.crud.form.Dictionay', {
	extend: 'Ext.form.Panel',
    xtype: 'dictionayform',

	requires: [
		'Gsys.desktop.crud.form.CodeField',
		'Gsys.desktop.crud.form.ActiveField'
	],

	width: 450,
	bodyPadding: 10,

	items: [
		{
			xtype: 'activefield'
		},
		{
			xtype: 'codefield'
		},
		{
			xtype: 'textfield',
			anchor: '100%',
			fieldLabel: 'Nombre',
			name: 'name',
			allowBlank: false,
			allowOnlyWhitespace: false,
			maxLength: 60,
			regex: /^[^<>;&"'`]+$/,
			regexText: 'Caracteres no permitidos'
		},
		{
			xtype: 'textareafield',
			anchor: '100%',
			fieldLabel: 'Descripción',
			name: 'descripcion',
			maxLength: 150,
			regex: /^[^<>;&"'`]+$/,
			regexText: 'Caracteres no permitidos'
		}
	]
});