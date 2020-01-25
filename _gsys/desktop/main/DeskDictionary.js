Ext.define('Gsys.desktop.main.DeskDictionary', {
    extend: 'Ext.container.Container',

    requires: [
		'Gsys.desktop.crud.grid.ActiveColumn',
        'Ext.grid.Panel',
		'Ext.grid.filters.Filters'
    ],
    
    config: {
        tableId: null,
        formTitle: null,
        gridTitle: null
    },

    // ---------------------------------
    viewModel: {
        stores: {
            dictionary: {
                fields: ['id', 'clave', 'nombre', 'descripcion'],

                proxy: {
                    type: 'ajax',
            
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    },
            
                    writer: {
                        type: 'json',
                        writeAllFields: true
                    }
                },
            
                sorters: [
                    {
                        property: 'nombre'
                    }
                ]
            }
        }
    },

    controller: {
        init() {
            const mod = this.getViewModel(),
                view = this.getView(),
                bar = view.down('crudbar'),
                grid = view.down('gridpanel'),
                store = mod.getStore('dictionary'),
                proxy = store.getProxy();
    
            proxy.setExtraParam('IhQYw45L6i', Session.getId());

            proxy.setApi(
                {
                    create: Session.getDictinoryScriptsPath('add', view.getTableId() ),
                    read: Session.getDictinoryScriptsPath('read', view.getTableId() ),
                    update: Session.getDictinoryScriptsPath('update', view.getTableId() ),
                    destroy: Session.getDictinoryScriptsPath('del', view.getTableId() ),
                }
            )

            bar.setValidationUrl(Session.getDictinoryScriptsPath('del', view.getTableId() ));
            bar.setFormTitle(view.getFormTitle());

            grid.setTitle(view.getGridTitle());

            store.load();
        }
    },

    // ---------------------------------

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

            items: [
                {
                    xtype: 'crudbar',
                    form: 'dictionayform',
                    type: 'grid'
                }
            ]
        },
        {
            xtype: 'gridpanel',

            tools:[
                {
                    type:'refresh',
                    tooltip: 'Actualizar',
                }
            ],
        
            plugins: {
                gridfilters: true
            },
        
            flex: 1,
            padding: '5 0 0 0',
            
            bind: {
                store: '{dictionary}'
            },
        
            columns: [
                {
                    xtype: 'activecolumn',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'clave',
                    text: 'Clave',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nombre',
                    text: 'Nombre',
                    filter: {
                        type: 'string'
                    },
                    flex: 1
                }
            ]
        }
    ]

});