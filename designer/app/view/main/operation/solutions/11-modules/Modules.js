
Ext.define('App.view.main.operation.solutions.11-modules.Modules',{
    extend: 'Ext.container.Container',
    xtype: 'define-modules',

    requires: [
        'Ext.form.Panel',
        'Ext.toolbar.Spacer'
    ],

    controller: 'operation-solutions-modules-modules',
    viewModel: {
        type: 'operation-solutions-modules-modules'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'container',
        
            border: 1,
            padding: 5,
        
            style: {
                borderColor: '#98bce8',
                borderStyle: 'solid'
            },
        
            layout: {
                type: 'hbox',
                align: 'middle'
            },
        
            defaults: {
                scale: 'small',
                width: 25, height: 25,
            },
        
            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-far fa-edit',

                    bind: {
                        hidden: '{editing}'
                    },

                    listeners: {
                        click: 'onEdit'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-far fa-save',
                    margin: '0 3 0 0',

                    bind: {
                        hidden: '{!editing}'
                    },

                    listeners: {
                        click: 'onSave'
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fas fa-times-circle',

                    bind: {
                        hidden: '{!editing}'
                    },

                    listeners: {
                        click: 'onCancel'
                    }
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            margin: '5 0 0 0',
            bodyPadding: 20,

            items: [
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    anchor: '100%',
                    name: 'modulesNotes',
                    reference: 'modulesNotes',
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                }
            ]
        }
    ]
});
