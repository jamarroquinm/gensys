/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    name: 'App',

    requires: [
        'Gsys.controller.Global'
    ],

    controllers: [
        'Gsys.controller.Global'
    ],

    quickTips: true,

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    launch: function() {
        var params = Ext.Object.fromQueryString(location.search.substring(1)),
            info = {};
        
        if( params.hasOwnProperty('context') ) {
            info.context = params.context;
        }
        else {
            info.context = Session.defaultContext;
        }

        Ext.Ajax.request({
            url: Session.apiBaseFolder + Session.contextScript,
        
            params: {
                trJu43_1jcr: info.context
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText),
                    data = obj.data;
        
                if(obj.error === 0) {

                    info.company = data.company;
                    info.description = data.description;
                    info.scriptsPath = Session.apiBaseFolder + data.module + '/' ;
                    info.contentPath = Session.contentBaseFolder + data.subpath + '/';
                    info.background = data.background;
                    info.login = data.login;
                    info.unlock = data.unlock;
                    info.changepwd = data.password;
        
                    this.fireEvent('initialParams', info);
                }
                else {
                    if( obj.success ) {
                        Ext.Msg.alert('Error', obj.errorInfo);
                    }
                    else {
                        Ext.Msg.alert('Error', obj.error + ': ' + obj.errorInfo);
                    }
                }
            },
        
            failure: function(response, opts) {
                Ext.Msg.alert('Error', response.status);
            },
        
            callback: function() {
                this.fireEvent('unmask');
            },
        
            scope: this
        });
    }
});
