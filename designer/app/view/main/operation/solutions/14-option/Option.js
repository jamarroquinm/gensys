Ext.define('App.view.main.operation.solutions.14-option.Option',{
    extend: 'Ext.container.Container',
    xtype: 'define-option',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Spacer'
    ],

    controller: 'operation-solutions-option',
    viewModel: {
        type: 'operation-solutions-option'
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
                    xtype: 'combobox',
                    anchor: '100%',
                    name: 'type',
                    
                    reference: 'type',
                    publishes: 'value',

                    fieldLabel: 'Type',
                    editable: false,
                    forceSelection: true,
                    
                    store: [
                        [ 's', 'Submenu'],
                        [ 'x', 'Component']
                    ],
                    queryMode: 'local',

                    bind: {
                        disabled: '{!editing}'
                    },

                    listeners: {
                        change: 'onChangeType'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'xType',
                    anchor: '100%',
                    name: 'xtype',
                    reference: 'xtype',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 60,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!xtypeEditable}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Icon',
                    anchor: '100%',
                    name: 'icon',
                    reference: 'icon',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 30,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!editing}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Tip',
                    anchor: '100%',
                    name: 'tip',
                    reference: 'tip',
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
