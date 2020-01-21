Ext.define('App.view.main.operation.solutions.OpenSolutionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main-operation-solutions-opensolution',

    stores: {
        allsolutions: {
            
            fields: ['id', 'name', 'description'],
        
            proxy: {
                type: 'ajax',
                url: Session.getScriptsPath('solution', 'allsol'),

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});
