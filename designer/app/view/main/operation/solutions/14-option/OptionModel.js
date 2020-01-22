Ext.define('App.view.main.operation.solutions.14-option.OptionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-option',

    data: {
        editing: false,
        
        optionId: null,

        opt_key: null,
        opt_name: null,
        opt_description: null,

        opt_type: null,
        opt_xtype: null,
        opt_icon: null,
        opt_tip: null,
        opt_notes: null
    },

    formulas: {
        xtypeEditable: {
            bind: {
                editing: '{editing}',
                type: '{type.value}'   
            },

            get(data) {
                if( data.editing ) {
                    return data.type == 'x';
                }
                return false;
            }
        }
    }

});
