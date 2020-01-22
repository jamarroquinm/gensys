
Ext.define('App.view.main.operation.solutions.11-modules.NewModule',{
    extend: 'Ext.form.Panel',
    xtype: 'newmodule',

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
                    xtype: 'radiogroup',
                    fieldLabel: 'Type',
                    reference: 'type',
                    items: [
                        { boxLabel: 'Desktop', name: 'type', inputValue: 'd', checked: true },
                        { boxLabel: 'Mobile', name: 'type', inputValue: 'm' }
                    ]
                },
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