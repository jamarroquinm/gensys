Ext.define('App.view.main.operation.solutions.1-solution.SolutionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-solution-solution',

    data: {
        editing: false,
        edited: false,

        key: null,
        name: null,
        description: null,
        multitenant: null, 
        multilingual: null,
        solutionNotes: null
    }

});
