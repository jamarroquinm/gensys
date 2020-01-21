Ext.define('Gsys.desktop.fields.User', {
    extend: 'Ext.form.field.Text',
    xtype: 'user',

    name: 'usuario',
    fieldLabel: 'Usuario',

    anchor: '100%',
    allowBlank: false,
    allowOnlyWhitespace: false,

    maxLength: 15,
    regex: /^[^<>;&"'`]+$/,
    regexText: 'Error! caracteres no permitidos',

    validator: function(value) {
        return this.verificaUsuario;
    },
    verificaUsuario: true

});
