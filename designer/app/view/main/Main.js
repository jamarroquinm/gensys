/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
	extend: 'Gsys.desktop.main.Viewport',
    xtype: 'app-main',

    controller: 'main',
    viewModel: 'main',

    items: [
		{
			xtype: 'login',
            itemId: 'login',
            bind: {
                background: '{getBackground}',
                context: '{context}',
                url: '{getLoginUrl}'
            }
		},
		{
			xtype: 'desk',
            itemId: 'desk',
            bind: {
                basePath: '{scriptsBasePath}',
                options: '{menu}'
            }
		},
		{
			xtype: 'lock',
			itemId: 'lock',
            bind: {
                background: '{getBackground}',
                url: '{unlockUrl}'
            }
		},
		{
			xtype: 'setpassword',
			itemId: 'setpassword',
            bind: {
                background: '{getBackground}',
                url: '{setPasswordUrl}'
            }
		}
    ]    
});
