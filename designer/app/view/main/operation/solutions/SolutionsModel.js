Ext.define('App.view.main.operation.solutions.SolutionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-solutions',

    data: {
        activeDefinitionForm: 0,
        solutionId: null,
        nodeType: null,
        nodeId: null,
        dataOnClipboard: null
    },

    formulas: {
        canAdd: {
            bind: {
                type: '{nodeType}',
                id: '{nodeId}'
            },

            get: function(data) {

                if( data.type ) {
                    if( data.type !== 'R' && data.type !== 's' ) {
                        return true;
                    }
                }

                return false;
            }
        },

        canDelete: {
            bind: {
                type: '{nodeType}'
            },

            get: function(data) {

                if( data.type ) {
                    return true;
                }

                return false;
            }
        },

        canCopy: {
            bind: {
                type: '{nodeType}'
            },

            get: function(data) {
                const alloewdPositions = ['d', 'm', 'n', 'o', 's'];
                return alloewdPositions.includes(data.type);
            }
        },

        canPaste: {
            bind: {
                type: '{nodeType}',
                data: '{dataOnClipboard}'
            },

            get: function(data) {
                const alloewdPositions = ['d', 'm', 'n', 'o', 'M', 'C', 'O'];
                
                if( data.data ) {
                    return alloewdPositions.includes(data.type);
                }

                return false;
            }
        },

        canMove: {
            bind: {
                type: '{nodeType}',
                data: '{dataOnClipboard}'
            },

            get: function(data) {
                const alloewdPositions = [ 'n', 'o', 's'];    
                return alloewdPositions.includes(data.type);
            }
        }
    },

    stores: {
        solution: {
            type: 'tree',
            
            root: {
                text: 'Solution',
                iconCls: 'x-fas fa-globe'
            },

            proxy: {
                type: 'ajax',
                url: Session.getScriptsPath('solution', 'getele'),

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }   
    }
});
