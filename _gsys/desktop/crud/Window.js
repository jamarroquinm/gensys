Ext.define('Gsys.desktop.crud.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.curdwindow',

    itemId: 'curdwindow',
    modal: true,
    constrain: true,
    
    viewModel:{
        editando: false,
        agregando: false,
        viendo: false
    },

    config: {
        operacion: '',
        tipo: '',
        storeName: '',
        validaEn: '',
        padreId: 0,
        evento: null,
        eventoId: null,
        tablaId: null
    },

    updateOperacion: function(ope){
        var form,
            mod = this.getViewModel();

        if( ope == 'add') {
            
            form = this.down('form');

            if( typeof form.postDefineAddOperation === 'function')
                form.postDefineAddOperation(ope);

            mod.set('agregando', true);
        }

        if( ope == 'edit' || ope == 'see' ) {
            form = this.down('form');

            if( typeof form.postDefineEditOperation === 'function')
                form.postDefineEditOperation(ope);

            if( ope == 'see' )
                mod.set('viendo', true);
            else
                mod.set('editando', true);
        }
        
    },

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    layout: 'fit',
    title: 'Operación',
    resizable: false,
    maxHeight: Ext.getViewportHeight() * 0.85,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    itemId: 'crudsave',
                    margin: 5,
                    iconCls: 'x-far fa-save',
                    scale: 'medium',
                    text: 'Guardar',

                    bind: {
                        disabled: '{readOnly}'
                    }
                }
            ]
        }
    ]
});