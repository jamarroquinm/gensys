Ext.define('Gsys.desktop.crud.form.ActiveField', {
    extend: 'Ext.form.field.Checkbox',
    xtype: 'activefield',

    anchor: '100%',
    fieldLabel: 'Estatus',
    
    name: 'active',
    boxLabel: 'Activo',

    inputValue: '1',
    uncheckedValue: '0'
    
});
