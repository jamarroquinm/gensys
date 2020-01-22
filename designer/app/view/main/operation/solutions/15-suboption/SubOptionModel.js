Ext.define('App.view.main.operation.solutions.15-suboption.SubOptionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operation-solutions-suboption',

    data: {
        editing: false,
        edited: false,

        optionId: null,

        opt_key: null,
        opt_name: null,
        opt_description: null,
        opt_icon: null,
        opt_tip: null,
        opt_xtype: null,
        opt_notes: null
    }

});
