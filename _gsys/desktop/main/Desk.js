Ext.define('Gsys.desktop.main.Desk', {
    extend: 'Ext.container.Container',
    xtype: 'desk',

    requires: [
        'Ext.panel.Panel',
        'Ext.tab.Tab',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Gsys.data.model.Dictionary'
    ],

    viewModel: {
        logo: null
    },

    config: {
        basePath: null,
        options: null
    },

    updateOptions: function(opcs) {
        var cont = this.down('#mainmenuopciones'),
            sdesk = this.down('#subdesk'),
            me = this,
            btn, subd, smod, tbar, work, area, areaId, tab, store;

        if( opcs ) {
            Ext.Array.forEach(opcs, function(opc, idx){

                btn = Ext.create('Ext.Button',{
                    scale: 'large', height: 55, width: 55,
                    iconCls: 'x-fa fa-' + opc.icon,
                    margin: '0 0 0 5',
                    tooltip: opc.tip,
                    opcion: opc.option,
                    toggleGroup: 'mainmenu'
                });

                if( opc.hasOwnProperty('access')) {
                    access = { disabled: "{!" + opc.access + "}" };
                    btn.setBind(access);
                }

                if( idx === 0 ) btn.setPressed(true);
                cont.add(btn);


                //Subdesk creation
                subd = Ext.create({
                    xtype: 'subdesk',
                    itemId: opc.option
                });
                smod = subd.getViewModel();
                smod.set('text', opc.text);


                //Agregamos los botones y los componentes
                if( opc.hasOwnProperty('options') && opc.options ) {

                    tbar = subd.down('#submainmenu');
                    work = subd.down('#workarea');

                    Ext.Array.forEach(opc.options, function(subop, sidx){

                        areaId = opc.option + '-' + subop.option;

                        btn = Ext.create('Ext.Button',{
                            scale: 'small', width: 100, height: 34,
                            text: subop.text,
                            iconCls: 'x-fa fa-' + subop.icon,
                            tooltip: subop.tip,
                            opcion: areaId,
                            toggleGroup: opc.option,
                            disabled: (subop.hasOwnProperty('disabled' ) ? subop.disabled : false ),
                            visible: (subop.hasOwnProperty('visible' ) ? subop.visible : true )
                        });

                        if( sidx === 0) btn.setPressed(true);
                        tbar.add(btn);

                        //Creamos el workarea
                        if( subop.type == 'x' && subop.xtype ) {
                            area = Ext.create({
                                xtype: subop.option,
                                itemId: areaId
                            });
                        }
                        else if( subop.type == 's' ) {

                            area = Ext.create({
                                xtype: 'tabdesk',
                                itemId: areaId     
                            });

                            Ext.Array.forEach(subop.suboptions, function(ssubop){

                                tab = Ext.create({
                                    xtype: 'panel',

                                    title: ssubop.text,
                                    padding: 5,
                                    layout: 'fit',

                                    tabConfig: {
                                        height: 45,
                                        width: 135,
                                        closable: false,
                                        tooltip: ssubop.tip,
                                        textAlign: 'left',
                                        iconCls: 'x-fa fa-' + ssubop.icon
                                    }
                                });

                                if( ssubop.type == 'x' && ssubop.xtype ) {
                                    tab.add({xtype: ssubop.xtype});
                                }
                                else if( ssubop.type == 'd') {

                                    store = Session.getDictionayStore(ssubop.id);
                                    Ext.regStore(store.storeId, store);

                                    tab.add({
                                        xtype: 'dictionary',
                                        formTitle: ssubop.formTitle,
                                        gridTitle: ssubop.gridTitle,
                                        storeId: store.storeId,
                                        validationUrl: store.proxy.api.validation
                                    });

                                    tab.storeId = store.storeId;

                                    tab.on('activate', function(tab){
                                        const store = Ext.getStore(tab.storeId);
                                        if( store.count() == 0) store.load();
                                    });
                                }
                                else if( ssubop.type == 'c') {
                                }
                                else {
                                    tab.add({
                                        xtype: 'container'
                                    });
                                }

                                area.add(tab);
                            });

                        }
                        else {
                            area = Ext.create({
                                xtype: 'container',
                                itemId: areaId
                            });
                        }
                
                        work.add(area);

                    }, this);
                }
            
                sdesk.add( subd );

            }, this);

        }
    },


    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'container',
            border: '0 0 2 0',
            height: 80,
            padding: 5,

            style: {
                borderColor: '#256074',
                borderStyle: 'solid'
            },

            layout: {
                type: 'hbox',
                align: 'middle'
            },

            items: [
                {
                    xtype: 'image',
                    height: 68,
                    bind:{
                        src: '{logo}'
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'container',
                    itemId: 'mainmenuopciones',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    }
                },
                {
                    xtype: 'splitbutton',
                    height: 55,
                    margin: '0 0 0 15',
                    width: 65,
                    scale: 'large',
                    tooltip: 'Salir',
                    iconCls: 'x-fa fa-power-off',
                    id: 'exitSystem',
                    menu: {
                        xtype: 'menu',
                        itemId: 'exitButtonMenu',
                        width: 170,
                        items: [
                            {
                                text: 'Bloquear escritorio',
                                iconCls: 'x-fa fa-lock',
                                opc: 'lock'
                            },
                            {
                                text: 'Cambiar passwiord',
                                iconCls: 'x-fa fa-key',
                                opc: 'password'
                            },
                            '-',
                            {
                                text: 'Idioma',
                                iconCls: 'x-fa fa-comment',
                                opc: 'idioma'
                            }
                        ]
                    }
                },
                {
                    xtype: 'component',
                    margin: '0 0 0 10',
                    width: 150,
                    bind: {
                        html: '<b>{empresa}</b><br>{usuario}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            itemId: 'subdesk',
            layout: 'card'
        },
        {
            xtype: 'container',
            border: '1 0 0 0',
            frame: true,
            height: 28,
            padding: '0 0 5 0',
            margin: '0 5 2 5',
            style: {
                borderColor: '#DCDCDC',
                borderStyle: 'solid'
            },
            layout: {
                type: 'hbox',
                align: 'bottom'
            },
            items: [
                {
                    xtype: 'label',
                    itemId: 'notaizquierda',
                    flex: 1,
                    text: ''
                },
                {
                    xtype: 'label',
                    itemId: 'notacentral',
                    flex: 1,
                    cls: 'alineado-centro',
                    text: ''
                },
                {
                    xtype: 'label',
                    itemId: 'notaderecha',
                    flex: 1,
                    cls: 'alineado-derecha',
                    text: ''
                }
            ]
        }
    ]            
});




    // //Agrega las opciones del menu prinicpal
    // onDeskReady:function(desk){
    //     var opcs = desk.opciones,
    //         cont = desk.down('#mainmenuopciones'),
    //         sdesk = desk.down('#subdesk'),
    //         btn, subd, smod, tbar, area, work, acceso;

    //     if( opcs ) {
    //         Ext.Array.forEach(opcs, function(opc, idx){

    //             btn = Ext.create('Ext.Button',{
    //                 scale: 'large', height: 55, width: 55,
    //                 iconCls: 'x-fa fa-' + opc.icono,
    //                 margin: '0 0 0 5',
    //                 tooltip: opc.titulo,
    //                 opcion: opc.opcion,
    //                 toggleGroup: 'mainmenu'
    //             });

    //             if( opc.hasOwnProperty('acceso')) {
    //                 acceso = { disabled: "{!" + opc.acceso + "}" };
    //                 btn.setBind(acceso);
    //             }

    //             if( idx === 0 ) btn.setPressed(true);
    //             cont.add(btn);

    //             //Creamos el subdesk
    //             subd = Ext.create({
    //                 xtype: 'subdesk',
    //                 itemId: opc.opcion
    //             });
    //             smod = subd.getViewModel();
    //             smod.set('titulo', opc.titulo);

    //             //Agregamos los botones y los componentes
    //             if( opc.hasOwnProperty('opciones') ) {

    //                 tbar = subd.down('#submainmenu');
    //                 work = subd.down('#workarea');

    //                 Ext.Array.forEach(opc.opciones, function(subop, sidx){

    //                     btn = Ext.create('Ext.Button',{
    //                         scale: 'small', width: 100, height: 34,
    //                         text: subop.texto,
    //                         iconCls: 'x-fa fa-' + subop.icono,
    //                         tooltip: subop.titulo,
    //                         opcion: subop.opcion,
    //                         toggleGroup: opc.opcion,
    //                         disabled: (subop.hasOwnProperty('disabled' ) ? subop.disabled : false ),
    //                         visible: (subop.hasOwnProperty('visible' ) ? subop.visible : true )
    //                     });

    //                     if( sidx === 0) btn.setPressed(true);
    //                     tbar.add(btn);

    //                     //Creamos el workarea
    //                     area = Ext.create({
    //                         xtype: subop.opcion,
    //                         itemId: subop.opcion
    //                     });
                
    //                     work.add(area);

    //                 }, this);
    //             }
            
    //             sdesk.add( subd );

    //         }, this);
    //     }
    // },