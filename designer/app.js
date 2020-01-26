Ext.application({
    extend: 'App.Application',

    name: 'App',

    requires: [
        'App.*'
    ],

    mainView: 'App.view.main.Main'
});

Ext.define('Session', {
    statics: {
        defaultContext: 'a',
        apiBaseFolder: '../mws/',
        apiModuleFolder: 'designer/',
        contentBaseFolder: '../content/',
        contextScript: 'control/appctx.php',
    
        sessionId: null,
        context: null,
        contentPath: null,
        scriptsPath: null,

        getId() {
            return this.sessionId;
        },

        setId(id) {
            this.sessionId = id;
        },

        getScriptsPath(script, operation) {
            return this.apiBaseFolder + this.apiModuleFolder + script + '.php?operation=' + operation;
        },

        getDictinoryScriptsPath(operation, tableId) {
            return this.apiBaseFolder + 'control/dictionary.php?operation=' + operation + '&code=' + tableId;
        },

        getDictionayStore(id) {

            return {

                storeId: 'dic-' + ('000' + id).substr(-3),

                requires: [
                    'Ext.data.proxy.Ajax',
                    'Ext.data.reader.Json',
                    'Ext.data.writer.Json'
                ],

                model: 'Gsys.data.model.Dictionary',

                proxy: {
                    type: 'ajax',

                    pageParam: '',
                    limitParam: '',

                    extraParams: {
                        IhQYw45L6i: this.getId()
                    },

                    api: {
                        create: this.apiBaseFolder + 'control/dictionary.php?operacion=add&code=' + id,
                        read: this.apiBaseFolder + 'control/dictionary.php?operacion=read&code=' + id,
                        update: this.apiBaseFolder + 'control/dictionary.php?operacion=update&code=' + id,
                        destroy: this.apiBaseFolder + 'control/dictionary.php?operacion=del&code=' + id,
                        validation: this.apiBaseFolder + 'control/dictionary.php?operacion=val&code=' + id
                    },
            
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    },
            
                    writer: {
                        type: 'json',
                        writeAllFields: true
                    }
                },
            
                sorters: [{
                    property: 'name'
                }]
            };
        }
    }
});