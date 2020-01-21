Ext.define('App.view.main.operation.solutions.3-operationdb.OperationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-operationdb-operation',

    data: {
        editing: false,
        edited: false,
        
        operationalDbPrefix: null,
        operationalDbNotes: null
    }
});
