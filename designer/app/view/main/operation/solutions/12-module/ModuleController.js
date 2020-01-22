Ext.define('App.view.main.operation.solutions.12-module.ModuleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-module',

    listen: {
        controller: {
            '*': {
                solutionclosed: 'onSolutionClosed',
                loadmodule: 'onLoadModuleInfo'
            }
        }
    },

    onLoadModuleInfo(id) {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            type = this.lookupReference('type'),
            apiFolder = this.lookupReference('apiFolder'),
            contentFolder = this.lookupReference('contentFolder'),
            loginScript = this.lookupReference('loginScript'),
            unlockScript = this.lookupReference('unlockScript'),
            changeScript = this.lookupReference('changeScript'),
            notes = this.lookupReference('notes');

        Ext.Ajax.request({
            url: Session.getScriptsPath('module', 'getmod'),

            params: {
                IhQYw45L6i: Session.getId(),
                moduleid: id
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
                    setModuleData(obj.data);
                }
                else {
                    if( obj.success ) {
                        Ext.Msg.alert('Error', 'Error');
                    }
                    else {
                        Ext.Msg.alert('Error', 'Error');
                    }
                }
            },
        
            failure: function(response, opts) {
                Ext.Msg.alert('Error', 'Error');
            },

            scope: this
        });

        function setModuleData(data) {

            mod.set('moduleId', id);

            mod.set('mod_key', data.key);
            mod.set('mod_name', data.name);
            mod.set('mod_description', data.description);
            mod.set('mod_type', data.type);
            mod.set('mod_apiFolder', data.apiFolder); 
            mod.set('mod_contentFolder', data.contentFolder);
            mod.set('mod_loginScript', data.loginScript);
            mod.set('mod_unlockScript', data.unlockScript);
            mod.set('mod_changeScript', data.changeScript);
            mod.set('mod_notes', data.notes);

            key.setValue(data.key);
            name.setValue(data.name);
            description.setValue(data.description);
            type.setValue({type:data.type});
            apiFolder.setValue(data.apiFolder);
            contentFolder.setValue(data.contentFolder);
            loginScript.setValue(data.loginScript);
            unlockScript.setValue(data.unlockScript);
            changeScript.setValue(data.changeScript);
            notes.setValue(data.notes);
        }
    },

    onSolutionClosed() {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            type = this.lookupReference('type'),
            apiFolder = this.lookupReference('apiFolder'),
            contentFolder = this.lookupReference('contentFolder'),
            loginScript = this.lookupReference('loginScript'),
            unlockScript = this.lookupReference('unlockScript'),
            changeScript = this.lookupReference('changeScript'),
            notes = this.lookupReference('notes');

        mod.set('moduleId', null);
        mod.set('mod_key', null);
        mod.set('mod_name', null);
        mod.set('mod_description', null);
        mod.set('mod_type', null);
        mod.set('mod_apiFolder', null); 
        mod.set('mod_contentFolder', null);
        mod.set('mod_loginScript', null);
        mod.set('mod_unlockScript', null);
        mod.set('mod_changeScript', null);
        mod.set('mod_notes', null);
    
        key.reset();
        name.reset();
        description.reset();
        type.reset(); 
        apiFolder.reset();
        contentFolder.reset();
        loginScript.reset();
        unlockScript.reset();
        changeScript.reset();
        notes.reset();
    },

    onEdit() {
        const mod = this.getViewModel();

        mod.set('editing', true);
    },

    onCancel() {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            type = this.lookupReference('type'),
            apiFolder = this.lookupReference('apiFolder'),
            contentFolder = this.lookupReference('contentFolder'),
            loginScript = this.lookupReference('loginScript'),
            unlockScript = this.lookupReference('unlockScript'),
            changeScript = this.lookupReference('changeScript'),
            notes = this.lookupReference('notes');
            
        key.setValue(mod.get('mod_key'));
        name.setValue(mod.get('mod_name'));
        description.setValue(mod.get('mod_description'));
        type.setValue({type:mod.get('mod_type')});
        apiFolder.setValue(mod.get('mod_apiFolder'));
        contentFolder.setValue(mod.get('mod_contentFolder'));
        loginScript.setValue(mod.get('mod_loginScript'));
        unlockScript.setValue(mod.get('mod_unlockScript'));
        changeScript.setValue(mod.get('mod_changeScript'));
        notes.setValue(mod.get('mod_notes'));

        mod.set('editing', false);
    },

    onSave() {
        const mod = this.getViewModel(),
            me = this,
            key = this.lookupReference('key').getValue(),
            name = this.lookupReference('name').getValue(),
            description = this.lookupReference('description').getValue(),
            type = this.lookupReference('type').getValue(),
            apiFolder = this.lookupReference('apiFolder').getValue(),
            contentFolder = this.lookupReference('contentFolder').getValue(),
            loginScript = this.lookupReference('loginScript').getValue(),
            unlockScript = this.lookupReference('unlockScript').getValue(),
            changeScript = this.lookupReference('changeScript').getValue(),
            notes = this.lookupReference('notes').getValue();
        
        Ext.Ajax.request({
            url: Session.getScriptsPath('module', 'setmod'),

            params: {
                IhQYw45L6i: Session.getId(),
                modeuleid: mod.get('moduleId'),
                ke: key,
                na: name,
                de: description,
                ty: type,
                af: apiFolder,
                cf: contentFolder,
                ls: loginScript,
                us: unlockScript,
                cs: changeScript,
                no: notes                
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
                    setData(obj.data);
                }
                else {
                    if( obj.success ) {
                        Ext.Msg.alert('Error', 'Error');
                    }
                    else {
                        Ext.Msg.alert('Error', 'Error');
                    }
                }
            },
        
            failure: function(response, opts) {
                Ext.Msg.alert('Error', 'Error');
            },
        
            scope: this
        });

        mod.set('editing', false);

        function setData(data) {
            const info = {
                name: name,
                icon: data.iconCls
            };

            mod.set('mod_key', key);
            mod.set('mod_name', name);
            mod.set('mod_description', description);
            mod.set('mod_type', type);
            mod.set('mod_apiFolder', apiFolder);
            mod.set('mod_contentFolder', contentFolder);
            mod.set('mod_loginScript', loginScript);
            mod.set('mod_unlockScript', unlockScript);
            mod.set('mod_changeScript', changeScript);
            mod.set('mod_notes', notes);

            me.fireEvent('moduledatachanged', info);
        }
    }
});
