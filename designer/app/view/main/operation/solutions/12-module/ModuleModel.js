Ext.define('App.view.main.operation.solutions.12-module.ModuleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-module-module',

    data: {
        editing: false,
        edited: false,

        moduleId: null,

        mod_key: null,
        mod_name: null,
        mod_description: null,
        mod_type: null,
        mod_apiFolder: null, 
        mod_contentFolder: null,
        mod_loginScript: null,
        mod_unlockScript: null,
        mod_changeScript: null,
        mod_notes: null
    }

});
