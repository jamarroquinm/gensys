Ext.define('Gsys.desktop.crud.CatDictionary', {
    extend: 'Ext.container.Container',
    xtype: 'cardictionary',

    requires: [
        'Gsys.desktop.crud.grid.ActiveColumn',
        'Gsys.desktop.crud.Crudbar',
        'Ext.grid.Panel',
        'Ext.grid.filters.Filters',
        'Ext.grid.feature.Grouping'
    ],

    config: {
        tableId: null,
        form: null,
        formTitle: null,
        gridTitle: null
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
            itemId: 'tabla',

            tools:[
                {
                    type:'refresh',
                    tooltip: 'Actualizar catálogo',
                }
            ],

            plugins: {
                gridfilters: true
            },

            features: [{
                ftype: 'grouping',
                groupHeaderTpl: '{renderedGroupValue} ({children.length})'
            }],

            flex: 1,
            padding: '5 0 0 0',

            columns: [
                {
                    xtype: 'columnactivo',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'producto',
                    text: 'Producto',
                    flex: 1
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'precio',
                    text: 'Precio',
                    format: '0,000',
                    align: 'end'
                },
                {
                    xtype: 'templatecolumn',
                    tpl: [
                        '<tpl>',
                            '<tpl if = "enPromo === 1">',
                                '<i class="fa fa-asterisk" aria-hidden="true"></i>',
                            '<tpl elseif = "enPromo === 2">',
                                '<i class="fa fa-calendar-o" aria-hidden="true"></i>',
                            '</tpl>',
                        '</tpl>'
                    ],
                    width: 35,
                    tooltip: 'En Promoción',
                    align: 'center',
                    resizable: false
                }
            ]
        }
    ]

});