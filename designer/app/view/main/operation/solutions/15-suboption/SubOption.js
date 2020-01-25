Ext.define('App.view.main.operation.solutions.15-suboption.SubOption',{
    extend: 'Ext.container.Container',
    xtype: 'define-suboption',

    requires: [
        'Ext.form.Panel',
        'Ext.toolbar.Spacer'
    ],

    controller: 'operation-solutions-suboption',
    viewModel: {
        type: 'operation-solutions-suboption'
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
                        [ 'x', 'Component'],
                        [ 'd', 'Dictionary Crud'],
                        [ 'c', 'Categorized dictionary Crud']
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
                    fieldLabel: 'Form title',
                    anchor: '100%',
                    name: 'formTitle',
                    reference: 'formTitle',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 40,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!formEditable}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Grid title',
                    anchor: '100%',
                    name: 'gridTitle',
                    reference: 'gridTitle',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 40,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!formEditable}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Main table',
                    anchor: '100%',
                    name: 'table',
                    reference: 'table',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 30,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!formEditable}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Related table',
                    anchor: '100%',
                    name: 'related',
                    reference: 'related',
                    allowBlank: false,
                    allowOnlyWhitespace: false,
                    maxLength: 30,
                    regex: /^[^<>;&'`]+$/,
                    regexText: 'Invalid',
                    bind: {
                        disabled: '{!relatedEditable}'
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
