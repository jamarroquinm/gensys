Ext.define('Gsys.desktop.crud.form.CodeField', {
    extend: 'Ext.form.field.Text',
    xtype: 'codefield',

    name: 'code',
    fieldLabel: 'Clave',

    allowBlank: false,
    allowOnlyWhitespace: false,

    maxLength: 20,
    regex: /^[^<>;&"'`]+$/,
    regexText: 'Error! caracteres no permitidos',

    validator: function(value) {
        return this.verificaClave;
    },
    verificaClave: true
    
});
