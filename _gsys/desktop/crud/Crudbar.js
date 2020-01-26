Ext.define('Gsys.desktop.crud.Crudbar', {
    extend: 'Ext.container.Container',
    xtype: 'crudbar',

    itemId: 'crudbar',

    requires: [
        'Ext.toolbar.Spacer',
        'Ext.button.Button'
    ],    

    layout: {
        type: 'hbox',
        align: 'middle'
    },

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

    // config: {
    //     form: null,
    //     formTitle: null,

    //     validationUrl: null,
    //     storeId: null,
    // },
  

    defaults: {
        scale: 'small',
        margin: '0 5 0 0',
        width: 90, height: 28,
    },

    items: [
        {
            xtype: 'button',
            iconCls: 'x-far fa-plus-square',
            text: 'Add',
            ope: 'add'
        },
        {
            xtype: 'button',
            itemId: 'editar',
            iconCls: 'x-far fa-edit',
            text: 'Edit',
            ope: 'edit'
        },
        {
            xtype: 'button',
            iconCls: 'x-far fa-minus-square',
            text: 'Delete',
            ope: 'del'
        }
    ]    

});