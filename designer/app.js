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
        }
    }
});