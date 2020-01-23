Ext.define('App.view.main.operation.solutions.14-option.OptionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-option',

    listen: {
        controller: {
            '*': {
                solutionclosed: 'onSolutionClosed',
                loadoption: 'onLoadOptionInfo'
            }
        }
    },

    onLoadOptionInfo(id) {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            type = this.lookupReference('type'),
            xtype = this.lookupReference('xtype'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');

        Ext.Ajax.request({
            url: Session.getScriptsPath('option', 'getopt'),
        
            params: {
                IhQYw45L6i: Session.getId(),
                optionid: id
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

            mod.set('optionId', id);

            mod.set('opt_key', data.key);
            mod.set('opt_name', data.name);
            mod.set('opt_description', data.description);
            mod.set('opt_xtype', data.xtype);
            mod.set('opt_type', data.type);
            mod.set('opt_icon', data.icon);
            mod.set('opt_tip', data.tip);
            mod.set('opt_notes', data.notes);

            key.setValue(data.key);
            name.setValue(data.name);
            description.setValue(data.description);
            xtype.setValue(data.xtype);
            type.setValue(data.type);
            icon.setValue(data.icon);
            tip.setValue(data.tip);
            notes.setValue(data.notes);
        }
    },

    onSolutionClosed() {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            xtype = this.lookupReference('xtype'),
            type = this.lookupReference('type'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');

        mod.set('opt_key', null);
        mod.set('opt_name', null);
        mod.set('opt_description', null);
        mod.set('opt_xtype', null);
        mod.set('opt_type', null);
        mod.set('opt_icon', null);
        mod.set('opt_tip', null);
        mod.set('opt_notes', null);
            
        key.reset();
        name.reset();
        description.reset();
        xtype.reset();
        type.reset();
        icon.reset();
        tip.reset();
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
            xtype = this.lookupReference('xtype'),
            type = this.lookupReference('type'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');
        
        key.setValue(mod.get('opt_key'));
        name.setValue(mod.get('opt_name'));
        description.setValue(mod.get('opt_description'));
        xtype.setValue(mod.get('opt_xtype'));
        type.setValue(mod.get('opt_type'));
        icon.setValue(mod.get('opt_icon'));
        tip.setValue(mod.get('opt_tip'));
        notes.setValue(mod.get('opt_notes'));
            
        mod.set('editing', false);
    },

    onSave() {
        const mod = this.getViewModel(),
            me = this,
            view = this.getView(),
            form = view.down('form'),
            key = this.lookupReference('key').getValue(),
            name = this.lookupReference('name').getValue(),
            description = this.lookupReference('description').getValue(),
            xtype = this.lookupReference('xtype').getValue(),
            type = this.lookupReference('type').getValue(),
            icon = this.lookupReference('icon').getValue(),
            tip = this.lookupReference('tip').getValue(),
            notes = this.lookupReference('notes').getValue();
        
        if( form.isValid() ) {
        
            Ext.Ajax.request({
                url: Session.getScriptsPath('option', 'setopt'),

                params: {
                    IhQYw45L6i: Session.getId(),
                    optionid: mod.get('optionId'),
                    ke: key,
                    na: name,
                    de: description,
                    xt: xtype,
                    ty: type,
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
                        Ext.Msg.alert('Error', 'Error');
                    }
                },
            
                failure: function(response, opts) {
                    Ext.Msg.alert('Error', 'Error');
                },
            
                scope: this
            });

            mod.set('editing', false);
        }

        function setData(data) {
            const info = {
                name: name
            };

            mod.set('opt_key', key);
            mod.set('opt_name', name);
            mod.set('opt_description', description);
            mod.set('opt_xtype', xtype);
            mod.set('opt_type', type);
            mod.set('opt_icon', icon);
            mod.set('opt_tip', tip);
            mod.set('opt_notes', notes);
            
            me.fireEvent('optiondatachanged', info);
        }
    },

    onChangeType(cbo, val) {
        const xtype = this.lookupReference('xtype');

        if( val != 'x') {
            xtype.reset();
        }
    }
});
