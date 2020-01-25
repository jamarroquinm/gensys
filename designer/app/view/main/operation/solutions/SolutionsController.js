Ext.define('App.view.main.operation.solutions.SolutionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-solutions',

    dataForms: { 
        R: 1,
        M: 2,
        m: 3,
        n: 4,
        o: 5,
        s: 6,
        O: 7,
        C: 8
    },

    loadingEvents: {
        m: 'loadmodule',
        n: 'loadmenu',
        o: 'loadoption',
        s: 'loadsuboption'
    },


    listen: {
        controller: {
            '*': {
                solutionselected: 'onSolutionSelected',
                solutionnamechanged: 'onSolutionNameChanged',
                addsolution: 'onAddSolution',

                moduledatachanged: 'onModuleDataChanged',
                menudatachanged: 'onMenuDataChanged',
                optiondatachanged: 'onOptionDataChanged',

                addmodule: 'onAddModule',
                addmenu: 'onAddMenu',
                addoption: 'onAddOption',
                addSuboption: 'onAddSubOption'
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
            mod.set('nodeId', null);
            mod.set('nodeType', null);
            mod.set('internalId', null);
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
            idNode = record.get('id');
            
        var nodeId, nodeType, internalId, activeIdx, event;

        if( idNode == 'root' ) {
            nodeType = 'R';
            nodeId = nodeType; //El id es el mismo que el tipo
            internalId = 0;
        }
        else if( idNode == 'M' || idNode == 'O' || idNode == 'C' ) {
            nodeType = idNode;
            nodeId = idNode; //El id es el mismo que el tipo
            internalId = 0;
        }
        else {
            nodeId = idNode;
            nodeType = idNode.substr(0,1),
            internalId = record.get('internalId')
            event = this.loadingEvents[nodeType];

            this.fireEvent(event, internalId);
        }

        activeIdx = this.dataForms.hasOwnProperty(nodeType) ? this.dataForms[nodeType] : 0 ;

        mod.set('nodeId', nodeId);
        mod.set('nodeType', nodeType);
        mod.set('internalId', internalId);
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
        else if( nodeType == 'm') {
            form = Ext.widget('newmenu');
            win.setEvent('addmenu');
            win.setTitle('New menu');
        }
        else if( nodeType == 'n') {
            form = Ext.widget('newoption');
            win.setEvent('addoption');
            win.setTitle('New menu option');
        }
        else if( nodeType == 'o') {
            form = Ext.widget('newsuboption');
            win.setEvent('addsuboption');
            win.setTitle('New option suboption');
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
                        record.appendChild(obj.data);
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
    },

    onAddMenu(values) {
        this.addElement(values, 'menu', 'addmen');
    },

    onAddOption(values) {
        this.addElement(values, 'option', 'addopt');
    },

    onAddSubOption(values) {
        this.addElement(values, 'suboption', 'addsub');
    },

    addElement(values, script, operation) {
        const mod = this.getViewModel(),
            nodeId = mod.get('nodeId'),
            internalId = mod.get('internalId'),
            store = mod.getStore('solution'),
            record = store.getNodeById(nodeId);

        if( record ) {

            Ext.Ajax.request({
                url: Session.getScriptsPath(script, operation),
            
                params: {
                    'IhQYw45L6i': Session.getId(),
                    iid: internalId,
                    key: values.key,
                    name: values.name,
                    description: values.description
                },
            
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
            
                    if(obj.error === 0) {
                        record.expand();
                        record.appendChild(obj.data);
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
    },


    moveDown() {
        const mod = this.getViewModel(),
            store = this.getStore('solution'),
            nodeType = mod.get('nodeType'),
            nodeId = mod.get('nodeId'),
            record = store.getNodeById(nodeId),
            parent = record.parentNode;

        if( !record.isLast() ) {
            const next = record.nextSibling;
            this.moveElement(nodeType, parent, next, record); 
        }
    },

    moveUp() {
        const mod = this.getViewModel(),
            store = this.getStore('solution'),
            nodeType = mod.get('nodeType'),
            nodeId = mod.get('nodeId'),
            record = store.getNodeById(nodeId),
            parent = record.parentNode;

        if( !record.isFirst() ) {
            const prev = record.previousSibling;
            this.moveElement(nodeType, parent, record, prev);     
        }
    },

    moveElement(type, parent, first, second) {
        const firstId = first.get('internalId'),
            secondId = second.get('internalId');

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'swap'),
        
            params: {
                'IhQYw45L6i': Session.getId(),
                type: type,
                fid: firstId,
                sid: secondId
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
                    parent.insertBefore(first, second);
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
});
