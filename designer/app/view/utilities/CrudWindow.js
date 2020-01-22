
Ext.define('App.view.utilities.CrudWindow',{
    extend: 'Ext.window.Window',
    xtype: 'newelement',

    requires: [

    ],
    
    controller: 'utilities-crudwindow',
    viewModel: {
        type: 'utilities-crudwindow'
    },
    
    config: {
        event: null
    },

    layout: 'fit',
    modal: true,
    resizable: false,

    title: 'Window',

    buttons: [
        {
            text: 'Save',
            iconCls: 'x-far fa-save',
            scale: 'medium',
            listeners: {
                click: 'onSave'
            }
        }
    ]
});
