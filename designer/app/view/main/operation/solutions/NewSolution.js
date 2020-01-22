
Ext.define('App.view.main.operation.solutions.NewSolution',{
    extend: 'Ext.form.Panel',
    xtype: 'newsolution',

    requires: [
        'Ext.form.field.TextArea'
    ],

    width: 500,
    border: false,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Key',
                    name: 'key',
                    allowBlank: false,
                    maxLength: 15
                    //TODO: Validar que no se repita
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Name',
                    name: 'name',
                    allowBlank: false,
                    maxLength: 60
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Description',
                    name: 'description',
                    maxLength: 300
                }
            ]
        }
    ]
});