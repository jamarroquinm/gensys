Ext.define('Gsys.desktop.main.Login', {
    extend: 'Ext.container.Container',
    xtype: 'login',

    config: {
        background: null,
        context: null,
        url: null
    },

    updateBackground: function( bgif ) {
        this.setStyle('backgroundImage', 'url("' + bgif + '")');
        this.setStyle('top', 0);
        this.setStyle('left', 0);
        this.setStyle('background-repeat', 'no-repeat');
        this.setStyle('background-size', '100% 100%');
    },

    constrain: true,

    items: [
        {
            xtype: 'window',
            title: 'Acceso',
            layout: 'anchor',

            itemId: 'login',

            flex: 1,
            autoShow: true,
            closable: false,

            width: 400,
            resizable: false,
            bodyPadding: 10,
            
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'username',
                    value: 'admin',
                    fieldLabel: 'Usuario'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'password',
                    value: 'admin', 
                    inputType: 'password',
                    fieldLabel: 'Password'
                }
            ],

            fbar: [
                {
                    text: 'Ingresar',
                    width: 100,
                    scale: 'medium'
                }
            ]
        }
    ]
});