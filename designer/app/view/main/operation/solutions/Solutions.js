
Ext.define('App.view.main.operation.solutions.Solutions',{
    extend: 'Ext.container.Container',
    xtype: 'operation-solutions-solutions',

    requires: [
        'Ext.toolbar.Spacer'
    ],

    controller: 'operation-solutions-solutions',
    viewModel: 'operation-solutions-solutions',

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
                borderColor: '#DCDCDC',
                borderStyle: 'solid'
            },

            layout: {
                type: 'hbox',
                align: 'middle'
            },

            defaults: {
                scale: 'small',
                margin: '0 5 0 0',
                width: 90, height: 28,
            },

            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-far fa-folder-open',
                    text: 'Open',
                    listeners: {
                        click: 'onOpenSolution'
                    },
                    bind: {
                        hidden: '{solutionId}'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-far fa-plus-square',
                    text: 'New',
                    listeners: {
                        click: 'onNewSolution'
                    },
                    bind: {
                        hidden: '{solutionId}'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-far fa-times-circle',
                    text: 'Close',
                    listeners: {
                        click: 'onCloseSolution'
                    },
                    bind: {
                        hidden: '{!solutionId}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            margin: '5 0 0 0',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            bind: {
                disabled: '{!solutionId}'
            },
        
            items: [
                {
                    xtype: 'container',
                    width: 300,

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
                                align: 'stretch'
                            },
                        
                            defaults: {
                                scale: 'small',
                                width: 25, height: 25,
                            },
                        
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-plus-circle',
                                    margin: '0 3 0 0',

                                    bind: {
                                        disabled: '{!canAdd}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-minus-circle',
                                    margin: '0 3 0 0',

                                    bind: {
                                        disabled: '{!canDelete}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-far fa-copy',
                                    margin: '0 3 0 0',

                                    bind: {
                                        disabled: '{!canCopy}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-paste',

                                    bind: {
                                        disabled: '{!canPaste}'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-arrow-down',
                                    margin: '0 3 0 0',

                                    bind: {
                                        disabled: '{!canMove}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-arrow-up',

                                    bind: {
                                        disabled: '{!canMove}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'treepanel',
                            reference: 'solutiontree',

                            flex: 1,
                            margin: '5 0 0 0',

                            bind: {
                                store: '{solution}'                   
                            },

                            listeners: {
                                select: 'onSolutonNodeSelected'
                            }
                        }                        
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 0 0 5',
                            
                    layout: 'card',
                
                    items: [
                        {
                            xtype: 'container',
                            border: 1,
                            padding: 5,
                        
                            style: {
                                borderColor: '#98bce8',
                                borderStyle: 'solid'
                            }
                        },
                        {
                            xtype: 'define-solution'
                        },
                        {
                            xtype: 'define-modules'
                        },
                        {
                            xtype: 'define-operationdb'
                        },
                        {
                            xtype: 'define-centraldb'
                        },
                        {
                            xtype: 'define-module'
                        },
                        {
                            xtype: 'define-menu'
                        },
                        {
                            xtype: 'define-option'
                        }
                    ],

                    bind: {
                        activeItem: '{activeDefinitionForm}'
                    }
                }
            ]
        }
    ]
});