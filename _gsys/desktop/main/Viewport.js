Ext.define('Gsys.desktop.main.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'myviewport',
    id: 'myviewport',

    layout: 'card',

    requires: [
        'Gsys.desktop.main.Desk',
        'Gsys.desktop.main.Subdesk',        
        'Gsys.desktop.main.Login',
        'Gsys.desktop.main.Lock',
        'Gsys.desktop.main.SetPassword',
        'Gsys.desktop.crud.Window'
    ]

});