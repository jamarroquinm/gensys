Ext.define('Gsys.desktop.crud.grid.Dictionaries', {
	extend: 'Ext.grid.Panel',

	requires: [
		'Gsys.desktop.crud.grid.ActiveColumn',
		'Ext.grid.filters.Filters'
	],

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
    title: 'No title',
    padding: '5 0 0 0',

    columns: [
        {
            xtype: 'activecolumn',
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'clave',
            text: 'Clave'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'nombre',
            text: 'Nombre',
            flex: 1
        }
    ]

});