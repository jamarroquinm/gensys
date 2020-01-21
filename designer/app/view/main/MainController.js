/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '*': {
                initialParams: 'onInitialParams',
                userLogged: 'onUserLogged'
            }
        }
    },

    onInitialParams( params ) {
        const mod = this.getViewModel();

        mod.set( 'context', params.context );
        mod.set( 'company', params.company );
        mod.set( 'description', params.description );

        mod.set( 'contentPath', params.contentPath );
        mod.set( 'background', params.background );
        
        mod.set( 'scriptsPath', params.scriptsPath );
        mod.set( 'login', params.login );
        mod.set( 'unlock', params.unlock );
        mod.set( 'changepwd', params.changepwd );

        Session.context = params.context;
        Session.contentPath = params.contentPath;
        Session.scriptsPath = params.scriptsPath;

    },

    onUserLogged(obj) {
        var mod = this.getViewModel();

        Session.setId(obj.id);

        mod.set('menu', obj.menu);
        mod.set('userName', obj.userName);
    }
});
