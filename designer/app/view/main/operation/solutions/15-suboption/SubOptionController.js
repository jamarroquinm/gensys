Ext.define('App.view.main.operation.solutions.15-suboption.SubOptionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-suboption',

    listen: {
        controller: {
            '*': {
                solutionclosed: 'onSolutionClosed',
                loadsuboption: 'onLoadSubOptionInfo'
            }
        }
    },

    onLoadSubOptionInfo: function(id) {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            type = this.lookupReference('type'),
            xtype = this.lookupReference('xtype'),
            titleform = this.lookupReference('titleform'),
            table = this.lookupReference('table'),
            related = this.lookupReference('related'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');

        Ext.Ajax.request({
            url: Session.getScriptsPath('suboption', 'getsub'),
        
            params: {
                IhQYw45L6i: Session.getId(),
                suboptionid: id
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

            mod.set('suboptionId', id);

            mod.set('sub_key', data.key);
            mod.set('sub_name', data.name);
            mod.set('sub_description', data.description);
            mod.set('sub_type', data.xtype);
            mod.set('sub_xtype', data.xtype);
            mod.set('sub_titleform', data.titleform);
            mod.set('sub_table', data.table);
            mod.set('sub_related', data.related);
            mod.set('sub_icon', data.icon);
            mod.set('sub_tip', data.tip);
            mod.set('sub_notes', data.notes);

            key.setValue(data.key);
            name.setValue(data.name);
            description.setValue(data.description);
            type.setValue(data.type);
            xtype.setValue(data.xtype);
            titleform.setValue(data.titleform);
            table.setValue(data.table);
            related.setValue(data.related);
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
            type = this.lookupReference('type'),
            xtype = this.lookupReference('xtype'),
            titleform = this.lookupReference('titleform'),
            table = this.lookupReference('table'),
            related = this.lookupReference('related'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');

        mod.set('sub_key', null);
        mod.set('sub_name', null);
        mod.set('sub_description', null);
        mod.set('sub_type', null);
        mod.set('sub_xtype', null);
        mod.set('sub_titleform', null);
        mod.set('sub_table', null);
        mod.set('sub_related', null);
        mod.set('sub_icon', null);
        mod.set('sub_tip', null);
        mod.set('sub_notes', null);
            
        key.reset();
        name.reset();
        description.reset();
        type.reset();
        xtype.reset();
        titleform.reset();
        table.reset();
        related.reset();
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
            type = this.lookupReference('type'),
            xtype = this.lookupReference('xtype'),
            titleform = this.lookupReference('titleform'),
            table = this.lookupReference('table'),
            related = this.lookupReference('related'),
            icon = this.lookupReference('icon'),
            tip = this.lookupReference('tip'),
            notes = this.lookupReference('notes');
        
        key.setValue(mod.get('sub_key'));
        name.setValue(mod.get('sub_name'));
        description.setValue(mod.get('sub_description'));
        type.setValue(mod.get('sub_type'));
        xtype.setValue(mod.get('sub_xtype'));
        titleform.setValue(mod.get('sub_titleform'));
        table.setValue(mod.get('sub_table'));
        related.setValue(mod.get('sub_related'));
        icon.setValue(mod.get('sub_icon'));
        tip.setValue(mod.get('sub_tip'));
        notes.setValue(mod.get('sub_notes'));
            
        mod.set('editing', false);
    },

    onSave: function() {
        const mod = this.getViewModel(),
            me = this,
            view = this.getView(),
            form = view.down('form'),
            key = this.lookupReference('key').getValue(),
            name = this.lookupReference('name').getValue(),
            type = this.lookupReference('type').getValue(),
            xtype = this.lookupReference('xtype').getValue(),
            titleform = this.lookupReference('titleform').getValue(),
            table = this.lookupReference('table').getValue(),
            related = this.lookupReference('related').getValue(),
            description = this.lookupReference('description').getValue(),
            icon = this.lookupReference('icon').getValue(),
            tip = this.lookupReference('tip').getValue(),
            notes = this.lookupReference('notes').getValue();
        
        if( form.isValid() ) {

            Ext.Ajax.request({
                url: Session.getScriptsPath('suboption', 'setsub'),

                params: {
                    IhQYw45L6i: Session.getId(),
                    suboptionid: mod.get('suboptionId'),
                    ke: key,
                    na: name,
                    ty: type,
                    xt: xtype,
                    tf: titleform,
                    tb: table,
                    rl: related,
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
        }

        function setData(data) {
            const info = {
                name: name
            };

            mod.set('sub_key', key);
            mod.set('sub_name', name);
            mod.set('sub_description', description);
            mod.set('sub_type', type);
            mod.set('sub_xtype', xtype);
            mod.set('sub_titleform', titleform);
            mod.set('sub_table', table);
            mod.set('sub_related', related);
            mod.set('sub_icon', icon);
            mod.set('sub_tip', tip);
            mod.set('sub_notes', notes);
            
            me.fireEvent('optiondatachanged', info);
        }
    },

    onChangeType(cbo, val) {
        const xtype = this.lookupReference('xtype'),
            titleform = this.lookupReference('titleform'),
            table = this.lookupReference('table'),
            related = this.lookupReference('related');

        if( val != 'x') {
            xtype.reset();

            if( val == 'd') {
                related.reset();
            }
        }
        else {
            titleform.reset();
            table.reset();
            related.reset();
        }
    }
});
