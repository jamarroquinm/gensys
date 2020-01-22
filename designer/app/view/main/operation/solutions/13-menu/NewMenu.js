
Ext.define('App.view.main.operation.solutions.13-menu.NewMenu',{
    extend: 'Ext.form.Panel',
    xtype: 'newmenu',

    requires: [
        'Ext.form.field.TextArea',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio'
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
                    fieldLabel: 'Short key',
                    name: 'key',
                    reference: 'key',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 15,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    anchor: '100%',
                    name: 'name',
                    reference: 'name',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 60,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    anchor: '100%',
                    name: 'description',
                    reference: 'description',
                    maxLength: 300,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid'
                }
            ]
        }
    ]
});