Ext.define('App.view.main.operation.solutions.1-solution.SolutionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-solution-solution',

    listen: {
        controller: {
            '*': {
                solutionopened: 'onSolutionOpened',
                solutionclosed: 'onSolutionClosed'
            }
        }
    },


    onSolutionOpened: function(info) {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            multitenant = this.lookupReference('multitenant'),
            multilingual = this.lookupReference('multilingual'),
            solutionNotes = this.lookupReference('solutionNotes');        

        mod.set('key', info.key);
        mod.set('name', info.name);
        mod.set('description', info.description);
        mod.set('multitenant', info.multitenant); 
        mod.set('multilingual', info.multilingual);
        mod.set('solutionNotes', info.solutionNotes);

        key.setValue(info.key);
        name.setValue(info.name);
        description.setValue(info.description);
        solutionNotes.setValue(info.solutionNotes);
        multitenant.setValue(info.multitenant ? true : false); 
        multilingual.setValue(info.multilingual ? true : false);
    },

    onSolutionClosed: function(info) {
        const mod = this.getViewModel(),
            key = this.lookupReference('key'),
            name = this.lookupReference('name'),
            description = this.lookupReference('description'),
            multitenant = this.lookupReference('multitenant'),
            multilingual = this.lookupReference('multilingual'),
            solutionNotes = this.lookupReference('solutionNotes'); 

        mod.set('key', null);
        mod.set('name', null);
        mod.set('description', null);
        mod.set('multitenant', null); 
        mod.set('multilingual', null);
        mod.set('solutionNotes', null);
        
        key.reset();
        name.reset();
        description.reset();
        multitenant.reset(); 
        multilingual.reset();
        solutionNotes.reset();
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
            multitenant = this.lookupReference('multitenant'),
            multilingual = this.lookupReference('multilingual'),
            solutionNotes = this.lookupReference('solutionNotes');        

        key.setValue(mod.get('key'));
        name.setValue(mod.get('name'));
        description.setValue(mod.get('description'));
        solutionNotes.setValue(mod.get('solutionNotes'));
        multitenant.setValue(mod.get('multitenant') ? true : false ); 
        multilingual.setValue(mod.get('multilingual') ? true : false);

        mod.set('editing', false);
    },

    onSave: function() {
        const mod = this.getViewModel(),
            me = this,
            key = this.lookupReference('key').getValue(),
            name = this.lookupReference('name').getValue(),
            description = this.lookupReference('description').getValue(),
            multitenant = this.lookupReference('multitenant').getValue(),
            multilingual = this.lookupReference('multilingual').getValue(),
            solutionNotes = this.lookupReference('solutionNotes').getValue();

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'setsol'),

            params: {
                IhQYw45L6i: Session.getId(),
                solutionid: mod.get('solutionId'),
                ke: key,
                na: name,
                de: description,
                mt: multitenant,
                ml: multilingual,
                sn: solutionNotes
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
                    me.fireEvent('solutionnamechanged', name);
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
});
