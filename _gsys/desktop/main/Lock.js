Ext.define('Gsys.desktop.main.Lock', {
    extend: 'Ext.container.Container',
    xtype: 'lock',

    requires: [
        'Ext.form.field.Display'
    ],

    viewModel: {
        usuario: null
    },

    config: {
        background : null,
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
            title: 'Escritorio bloqueado',
            layout: 'anchor',

            flex: 1,
            autoShow: true,
            closable: false,

            height: 150,
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
                }
             ],

             fbar: [
                {
                    text: 'Acceder',
                    width: 100,
                    scale: 'medium'
                }
             ]
        }
    ]
});