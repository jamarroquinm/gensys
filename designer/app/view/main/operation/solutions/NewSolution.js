
Ext.define('App.view.main.operation.solutions.NewSolution',{
    extend: 'Ext.window.Window',
    xtype: 'newsolution',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.TextArea'
    ],

    controller: 'main-operation-solutions-newsolution',
    viewModel: {
        type: 'main-operation-solutions-newsolution'
    },

    width: 600,
    modal: true,
    resizable: false,

    layout: 'fit',
    title: 'New Solution',

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Key',
                    name: 'key'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Name',
                    name: 'name'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: 'Description',
                    name: 'description'
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'Save',
            iconCls: 'x-far fa-save',
            scale: 'medium',
        }
    ]
});