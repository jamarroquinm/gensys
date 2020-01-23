Ext.define('App.view.main.operation.solutions.15-suboption.SubOptionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-suboption',

    data: {
        editing: false,

        suboptionId: null,

        sub_key: null,
        sub_name: null,
        sub_description: null,
        sub_type: null,
        sub_xtype: null,
        sub_titleform: null,
        sub_table: null,
        sub_store: null,
        sub_icon: null,
        sub_tip: null,
        sub_notes: null
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
        },

        formEditable: {
            bind: {
                editing: '{editing}',
                type: '{type.value}'   
            },

            get(data) {
                if( data.editing ) {
                    return data.type != 'x';
                }
                return false;
            }
        },

        relatedEditable: {
            bind: {
                editing: '{editing}',
                type: '{type.value}'   
            },

            get(data) {
                if( data.editing ) {
                    return data.type == 'c';
                }
                return false;
            }
        }
    }

});
