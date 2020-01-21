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

    viewModel: {
        showAddButton: true,
        showEditButton: true,
        showDeleteButton: true,
        showDuplicateButton: false,
        showSearchButton: false,
        showFilterButton: false
    },

    config: {

        form: null,
        formTitle: null,
        type: null,

        validationUrl: null,
        tableId: null,

        addButton: true,
        editButton: true,
        deleteButton: true,
        duplicateButton: false,
        searchButton: false,        
        filterButton: false
    },


    updateAddButton: function(val) {
        var mod = this.getViewModel();
        mod.set('showAddButton', (val ? true : false ));
    },

    updateEditButton: function(val) {
        var mod = this.getViewModel();
        mod.set('showEditButton', (val ? true : false ));
    },

    updateDeleteButton: function(val) {
        var mod = this.getViewModel();
        mod.set('showDeleteButton', (val ? true : false ));
    },

    updateDuplicateButton: function(val) {
        var mod = this.getViewModel();
        mod.set('showDuplicateButton', (val ? true : false ));
    },

    updateSearchButton: function( val ){
        var mod = this.getViewModel();
        mod.set('showSearchButton', (val ? true : false ));
    },

    updateFilterButton: function( val ){
        var mod = this.getViewModel();
        mod.set('showFilterButton', (val ? true : false ));
    },

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
            ope: 'add',
            bind: {
                hidden: '{!showAddButton}'
            }
        },
        {
            xtype: 'button',
            itemId: 'editar',
            iconCls: 'x-far fa-edit',
            text: 'Edit',
            ope: 'edit',
            bind: {
                hidden: '{!showEditButton}'
            }
        },
        {
            xtype: 'button',
            itemId: 'copy',
            iconCls: 'x-far fa-copy',
            text: 'Copy',
            ope: 'copy',
            bind: {
                hidden: '{!showDuplicateButton}'
            }
        },
        {
            xtype: 'button',
            iconCls: 'x-far fa-minus-square',
            text: 'Delete',
            ope: 'del',
            bind: {
                hidden: '{!showDeleteButton}'
            }
        },
        {
            xtype: 'button',
            iconCls: 'x-fas fa-search',
            text: 'Search',
            ope: 'search',
            bind: {
                hidden: '{!showSearchButton}'
            }
        },
        {
            xtype: 'button',
            iconCls: 'x-fas fa-filter',
            text: 'Filter',
            ope: 'filter',
            bind: {
                hidden: '{!showFilterButton}'
            }
        }
    ]    

});