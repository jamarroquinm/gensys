Ext.define('Gsys.desktop.main.SetPassword', {
    extend: 'Ext.container.Container',
    xtype: 'setpassword',

    requires: [
        'Ext.form.field.Display'
    ],

    viewModel: {
        usuario: null
    },

    config: {
        background: null,
        usuario: null,
        url: null
    },

    updateBackground: function( bgif ) {
        this.setStyle('backgroundImage', 'url("' + bgif + '")');
        this.setStyle('top', 0);
        this.setStyle('left', 0);
        this.setStyle('background-repeat', 'no-repeat');
        this.setStyle('background-size', '100% 100%');
    },

    updateUsuario: function( nom ) {
        var mod = this.getViewModel();
        mod.set('usuario', nom);
    },

    items: [
        {
            xtype: 'window',
            title: 'Cambio de password',
            layout: 'anchor',

            flex: 1,
            autoShow: true,
            closable: false,

            width: 400,
            resizable: false,
            bodyPadding: 10,
            
            items: [
                {
                    xtype: 'displayfield',
                    anchor: '100%',
                    itemId: 'usuario',
                    fieldLabel: 'Usuario',
                    bind: {
                        value: '{usuario}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'password',
                    fieldLabel: 'Password',
                    inputType: 'password'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'nueva1',
                    fieldLabel: 'Nuevo pwd',
                    inputType: 'password',
                    margin: '15 0 5 0'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    itemId: 'nueva2',
                    fieldLabel: 'Repite pwd',
                    inputType: 'password'
                }
             ],

             fbar: [
                {
                    text: 'Cambiar',
                    width: 100,
                    scale: 'medium'
                },
                {
                    text: 'Cancelar',
                    width: 100,
                    scale: 'medium'
                }
             ]
        }
    ]
});