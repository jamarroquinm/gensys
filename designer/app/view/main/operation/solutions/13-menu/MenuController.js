Ext.define('App.view.main.operation.solutions.13-menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-menu-menu',

    listen: {
        controller: {
            '*': {
                solutionclosed: 'onSolutionClosed',
                loadmenu: 'onLoadMenuInfo'
            }
        }
    },

    onLoadMenuInfo: function(id) {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');

        Ext.Ajax.request({
            url: Session.getScriptsPath('menu', 'getmen'),
        
            params: {
                IhQYw45L6i: Session.getId(),
                menuid: id
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

        function setData(data) {

            mod.set('menuId', id);

            mod.set('men_key', data.key);
            mod.set('men_name', data.name);
            mod.set('men_description', data.description);
            mod.set('men_icon', data.icon);
            mod.set('men_tip', data.tip);
            mod.set('men_notes', data.notes);

            key.setValue(data.key);
            name.setValue(data.name);
            description.setValue(data.description);
            icon.setValue(data.icon);
            tip.setValue(data.tip);
            notes.setValue(data.notes);            
        }
    },

    onSolutionClosed: function() {
        const mod = this.getViewModel(),
        key = this.lookupReference('key'),
        name = this.lookupReference('name'),
        description = this.lookupReference('description'),
        icon = this.lookupReference('icon'),
        tip = this.lookupReference('tip'),
        notes = this.lookupReference('notes');

        mod.set('men_key', null);
        mod.set('men_name', null);
        mod.set('men_description', null);
        mod.set('men_icon', null);
        mod.set('men_tip', null);
        mod.set('men_notes', null);

        key.reset();
        name.reset();
        description.reset();
        icon.reset();
        tip.reset();
        notes.reset();

    },

    onEdit: function() {
        const mod = this.getViewModel();

        mod.set('editing', true);
    },

    onCancel: function() {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');
            
        key.setValue(mod.get('men_key'));
        name.setValue(mod.get('men_name'));
        description.setValue(mod.get('men_description'));
        icon.setValue(mod.get('men_icon'));
        tip.setValue(mod.get('men_tip'));
        notes.setValue(mod.get('men_notes'));
            
        mod.set('editing', false);
    },

    onSave: function() {
        const mod = this.getViewModel(),
            me = this,
            key = this.lookupReference('key').getValue(),
            name = this.lookupReference('name').getValue(),
            description = this.lookupReference('description').getValue(),
            icon = this.lookupReference('icon').getValue(),
            tip = this.lookupReference('tip').getValue(),
            notes = this.lookupReference('notes').getValue();
        
        Ext.Ajax.request({
            url: Session.getScriptsPath('menu', 'setmen'),
        
            params: {
                IhQYw45L6i: Session.getId(),
                menuid: mod.get('menuId'),
                ke: key,
                na: name,
                de: description,
                ic: icon,
                ti: tip,
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
                name: name
            };

            mod.set('men_key', key);
            mod.set('men_name', name);
            mod.set('men_description', description);
            mod.set('men_icon', icon);
            mod.set('men_tip', tip);
            mod.set('men_notes', notes);
            
            me.fireEvent('menudatachanged', info);
        }
    }
});
