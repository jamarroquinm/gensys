Ext.define('App.view.main.operation.solutions.11-modules.ModulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-modules',

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
            modulesNotes = this.lookupReference('modulesNotes');        

        mod.set('modulesNotes', info.modulesNotes);
        modulesNotes.setValue(info.modulesNotes);
    },

    onSolutionClosed: function(info) {
        const mod = this.getViewModel(),
            modulesNotes = this.lookupReference('modulesNotes'); 

        mod.set('modulesNotes', null);        
        modulesNotes.reset();
    },

    onEdit: function() {
        const mod = this.getViewModel();
        mod.set('editing', true);
    },

    onCancel: function() {
        const mod = this.getViewModel(),
            modulesNotes = this.lookupReference('modulesNotes');

        modulesNotes.setValue(mod.get('modulesNotes'));
        mod.set('editing', false);
    },

    onSave: function() {
        const mod = this.getViewModel(),
            me = this,
            modulesNotes = this.lookupReference('modulesNotes').getValue();

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'setmodnts'),
        
            params: {
                IhQYw45L6i: Session.getId(),
                solutionid: mod.get('solutionId'),
                mn: modulesNotes
            },
        
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
        
                if(obj.error === 0) {
        
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
