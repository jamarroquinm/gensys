
Ext.define('App.view.main.operation.solutions.12-module.Module',{
    extend: 'Ext.container.Container',
    xtype: 'define-module',

    requires: [
        'Ext.form.Panel',
        'Ext.toolbar.Spacer',
        'Ext.form.RadioGroup'
    ],

    controller: 'operation-solutions-module',
    viewModel: {
        type: 'operation-solutions-module'
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
                    xtype: 'radiogroup',
                    fieldLabel: 'Type',
                    reference: 'type',
                    items: [
                        { boxLabel: 'Desktop', name: 'type', inputValue: 'd' },
                        { boxLabel: 'Mobile', name: 'type', inputValue: 'm' }
                    ],
                    bind: {
                        disabled: '{!editing}'
                    }
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
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
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
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    anchor: '100%',
                    name: 'description',
                    reference: 'description',
                    maxLength: 300,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Api folder',
                    anchor: '100%',
                    name: 'apiFolder',
                    reference: 'apiFolder',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 20,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Content folder',
                    anchor: '100%',
                    name: 'contentFolder',
                    reference: 'contentFolder',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 20,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Login script',
                    anchor: '100%',
                    name: 'loginScript',
                    reference: 'loginScript',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 60,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unlock script',
                    anchor: '100%',
                    name: 'unlockScript',
                    reference: 'unlockScript',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 60,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Chg Psw script',
                    anchor: '100%',
                    name: 'changeScript',
                    reference: 'changeScript',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 60,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    anchor: '100%',
                    name: 'notes',
                    reference: 'notes',
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
