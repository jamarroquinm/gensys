Ext.define('App.view.main.operation.solutions.SolutionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-solutions',

    listen: {
        controller: {
            '*': {
                solutionselected: 'onSolutionSelected',
                solutionnamechanged: 'onSolutionNameChanged',
                addsolution: 'onAddSolution',

                moduledatachanged: 'onModuleDataChanged',
                menudatachanged: 'onMenuDataChanged',
                optiondatachanged: 'onOptionDataChanged',

                addmodule: 'onAddModule'
            }
        }
    },

    init() {
        const mod = this.getViewModel(),
            store = mod.getStore('solution'),
            proxy = store.getProxy();

        proxy.setExtraParam('IhQYw45L6i', Session.getId());
    },



    // Solutions
    onOpenSolution() {
        const win = Ext.widget('opensolution');

        win.show();
    },

    onNewSolution() {
        const win = Ext.widget('newelement'),
            form = Ext.widget('newsolution');

        win.setEvent('addsolution');
        win.setTitle('New solution');

        win.add(form);
        win.show();
    },

    onAddSolution(values) {
        const mod = this.getViewModel(),
            store = this.getStore('solution'),
            proxy = store.getProxy(),
            me = this;

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'addsol'),
        
            params: {
                'IhQYw45L6i': Session.getId(),
                key: values.key,
                name: values.name,
                description: values.description
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
                    setSolution(obj.data);
                }
                else {
                    Ext.Msg.alert('Error', obj.info);
                }
            },
        
            failure: function(response, opts) {
                Ext.Msg.alert('Error', 'Error');
            },

            scope: this
        });

        function setSolution(data) {
            
            mod.set('solutionId', data.id);

            store.setRoot({
                text: values.name,
                iconCls: 'x-fas fa-globe'
            });            

            proxy.setExtraParam('solutionid', data.id);

            me.fireEvent('solutionopened', data);
        }
    },

    onSolutionSelected(info) {
        const mod = this.getViewModel(),
            store = this.getStore('solution'),
            proxy = store.getProxy(),
            me = this;

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'getsol'),
        
            params: {
                'IhQYw45L6i': Session.getId(),
                solutionid: info.id
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
                    setSolution(obj.data);
                }
                else {
                    Ext.Msg.alert('Error', obj.info);
                }
            },
        
            failure: function(response, opts) {
                Ext.Msg.alert('Error', 'Error');
            },

            scope: this
        });

        function setSolution(data) {
            
            mod.set('solutionId', info.id);

            store.setRoot({
                text: info.name,
                iconCls: 'x-fas fa-globe'
            });            

            proxy.setExtraParam('solutionid', info.id);

            me.fireEvent('solutionopened', data);
        }
    },

    onCloseSolution() {
        const mod = this.getViewModel(),
            store = this.getStore('solution'),
            proxy = store.getProxy(),
            me = this;

        Ext.Msg.show({
            title: 'Close',
            message: 'The solution will close. Continue?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    close();
                }
            }
        });

        function close() {
            mod.set('activeDefinitionForm', 0);
            mod.set('solutionId', null);
            mod.set('nodeType', null);
            mod.set('nodeId', null);
            mod.set('dataOnClipboard', null);

            store.setRoot({
                text: 'Solution',
                iconCls: 'x-fas fa-globe',
                children: []
            });            

            proxy.setExtraParam('solutionid', 0);

            me.fireEvent('solutionclosed');
        }
    },

    onSolutonNodeSelected(tree, record) {
        const mod = this.getViewModel(),
            node = record.get('id'),
            forms = {
                R: 1,
                M: 2,
                O: 3,
                C: 4,
                m: 5,
                n: 6,
                o: 7,
                s: 0
            },
            events = {
                m: 'loadmodule',
                n: 'loadmenu',
                o: 'loadoption',
                s: 'loadsuboption'
            };
            
        var nodeId, nodeType, activeIdx, event;

        if( node == 'root' ) {
            nodeType = 'R';
            nodeId = nodeType; //El id es el mismo que el tipo
        }
        else if( node == 'M' || node == 'O' || node == 'C' ) {
            nodeType = node;
            nodeId = nodeType; //El id es el mismo que el tipo
        }
        else {
            nodeType = node.substr(0,1),
            nodeId = parseInt(node.substr(2));
            event = events[nodeType];

            this.fireEvent(event, nodeId);
        }

        activeIdx = forms.hasOwnProperty(nodeType) ? forms[nodeType] : 0 ;

        mod.set('nodeId', nodeId);
        mod.set('nodeType', nodeType);
        mod.set('activeDefinitionForm', activeIdx );
    },


        
    onSolutionNameChanged(name) {
        const store = this.getStore('solution');

        store.setRoot({
            text: name,
            iconCls: 'x-fas fa-globe'
        }); 
    },

    onModuleDataChanged(info) {
        const tree = this.lookupReference('solutiontree'),
            node = tree.getSelection()[0];

        node.set('text', info.name);
        node.set('iconCls', info.icon);
    },

    onMenuDataChanged(info) {
        const tree = this.lookupReference('solutiontree'),
            node = tree.getSelection()[0];

        node.set('text', info.name);
    },

    onOptionDataChanged(info) {
        const tree = this.lookupReference('solutiontree'),
            node = tree.getSelection()[0];

        node.set('text', info.name);
    },


    // Menu Operativo
    newElement() {
        const mod = this.getViewModel(),
            solutionId = mod.get('solutionId'),
            nodeType = mod.get('nodeType'),
            nodeId = mod.get('nodeId'),
            win = Ext.widget('newelement');

        var form;

        if( nodeType == 'M') {
            form = Ext.widget('newmodule');
            win.setEvent('addmodule');
            win.setTitle('New module');
        }
        else {
            console.log('Opcion no identificada! | Solucion id:', solutionId, ' | Tipo:', nodeType, ' | Id:', nodeId);
            return;
        }

        win.add(form);
        win.show();
        
    },

    onAddModule(values) {
        const mod = this.getViewModel(),
            solutionId = mod.get('solutionId'),
            nodeId = mod.get('nodeId'),
            store = mod.getStore('solution'),
            record = store.getNodeById(nodeId);

        if( record ) {

            Ext.Ajax.request({
                url: Session.getScriptsPath('module', 'addmod'),
            
                params: {
                    'IhQYw45L6i': Session.getId(),
                    sid: solutionId,
                    key: values.key,
                    type: values.type,
                    name: values.name,
                    description: values.description
                },
            
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
            
                    if(obj.error === 0) {
                        record.expand();
                        addModule(obj.data);
                    }
                    else {
                        Ext.Msg.alert('Error', obj.info);
                    }
                },
            
                failure: function(response, opts) {
                    Ext.Msg.alert('Error', 'Error');
                },

                scope: this
            });
        }
        else {
            throw new Error('Unable to find the node');
        }

        function addModule(data) {
            var node = record.appendChild(data);
        }
        
    }

});
