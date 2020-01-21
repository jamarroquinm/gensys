Ext.define('Gsys.desktop.main.Subdesk', {
    extend: 'Ext.container.Container',
    xtype: 'subdesk',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        text: null
    },

    items: [
        {
            xtype: 'toolbar',
            itemId: 'submainmenu',
            dock: 'top',
            height: 45,
            padding: 5,
            items: [
                {
                    xtype: 'component',
                    width: 130,
                    bind: {
                        html: '<b>{text}</b>'
                    }
                },
                {
                    xtype: 'tbseparator',
                    height: 30,
                    margin: '0 10 0 0'
                }
            ]                  
        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'card',
            itemId: 'workarea'
        }
    ]            
});