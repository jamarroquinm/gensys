Ext.define('Gsys.desktop.crud.Dictionary', {
    extend: 'Ext.container.Container',
    xtype: 'dictionary',

    requires: [
        'Gsys.desktop.crud.form.Dictionay',
        'Gsys.desktop.crud.grid.ActiveColumn',
        'Gsys.desktop.crud.Crudbar',
        'Ext.grid.Panel',
		'Ext.grid.filters.Filters'
    ],

    config: {
        form: 'dictionayform',
        type: 'grid',

        formTitle: null,
        gridTitle: null,
        storeId: null,
        validationUrl: null
    },

    controller: {

        init() {
            const view = this.getView(),
                grid = view.down('grid');

            grid.setStore(view.getStoreId());
        }
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'crudbar'
        },
        {
            xtype: 'gridpanel',

            tools:[{
                type:'refresh',
                tooltip: 'Actualizar',
            }],
        
            plugins: {
                gridfilters: true
            },
        
            flex: 1,
            padding: '5 0 0 0',

            columns: [
                {
                    xtype: 'activecolumn',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'key',
                    text: 'Clave',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
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