
Ext.define('App.view.main.operation.solutions.OpenSolution',{
    extend: 'Ext.window.Window',
    xtype: 'opensolution',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill'
    ],

    controller: 'main-operation-solutions-opensolution',
    viewModel: {
        type: 'main-operation-solutions-opensolution'
    },

    width: 600, height: 300,
    modal: true,
    resizable: false,
    layout: 'fit',

    title: 'Open Solution',

    items: [
        {
            xtype: 'gridpanel',
            reference: 'solutions',
            flex: 1,
        
            bind: {
                store: '{allsolutions}'
            },
        
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name',
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'description',
                    text: 'Description'
                }
            ],

            listeners: {
                itemdblclick: 'onSolutonDblClick'
            }
        }
    ],

    buttons: [
        {
            text: 'Open',
            iconCls: 'x-far fa-folder-open',
            scale: 'medium',

            text: 'Open',
            bind: {
                disabled: '{!solutions.selection}'
            },

            listeners: {
                click: 'onSolutionOpen'
            }
        }
    ]
});
