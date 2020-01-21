/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('App.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        context: null,
        company: null,
        description: null,

        userName: null,
        password: null,

        contentPath: null,
        background: null,
        
        scriptsPath: null,
        login: null,
        unlock: null,
        changepwd: null,

        menu: null
    },

    formulas: {
        getBackground: {
            bind: {
                path: '{contentPath}',
                image: '{background}'
            },

            get: function(data) {
                if( data.path && data.image ) {
                    return data.path + 'background/' + data.image;
                }

                return null;
            }
        },

        getLoginUrl: {
            bind: {
                path: '{scriptsPath}',
                script: '{login}'
            },

            get: function(data) {
                if( data.path && data.script ) {
                    return data.path + data.script + '.php';
                }

                return null;
            }
        },

        unlockUrl: {
            bind: {
                path: '{scriptsPath}',
                script: '{unlock}'
            },

            get: function(data) {
                if( data.path && data.script ) {
                    return data.path + data.script + '.php';
                }

                return null;
            }
        },

        setPasswordUrl: {
            bind: {
                path: '{scriptsPath}',
                script: '{changepwd}'
            },

            get: function(data) {
                if( data.path && data.script ) {
                    return data.path + data.script + '.php';
                }

                return null;
            }
        }
    }
});
