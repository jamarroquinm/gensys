Ext.define('App.view.main.operation.solutions.30-centraldb.CentralController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-centraldb-central',

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
            centralDbName = this.lookupReference('centralDbName'),
            centralDbNotes = this.lookupReference('centralDbNotes');        

        mod.set('centralDbName', info.centralDbName);
        mod.set('centralDbNotes', info.centralDbNotes);

        centralDbName.setValue(info.centralDbName);
        centralDbNotes.setValue(info.centralDbNotes);
    },

    onSolutionClosed: function(info) {
        const mod = this.getViewModel(),
            centralDbName = this.lookupReference('centralDbName'),
            centralDbNotes = this.lookupReference('centralDbNotes'); 

        mod.set('centralDbName', null);
        mod.set('centralDbNotes', null);
        
        centralDbName.reset();
        centralDbNotes.reset();
    },

    onEdit: function() {
        const mod = this.getViewModel();

        mod.set('editing', true);
    },

    onCancel: function() {
        const mod = this.getViewModel(),
            centralDbName = this.lookupReference('centralDbName'),
            centralDbNotes = this.lookupReference('centralDbNotes');        

        centralDbName.setValue(mod.get('centralDbName'));
        centralDbNotes.setValue(mod.get('centralDbNotes'));

        mod.set('editing', false);
    },

    onSave: function() {
        const mod = this.getViewModel(),
            centralDbName = this.lookupReference('centralDbName').getValue(),
            centralDbNotes = this.lookupReference('centralDbNotes').getValue();

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'setcdbnts'),

            params: {
                IhQYw45L6i: Session.getId(),
                solutionid: mod.get('solutionId'),
                pr: centralDbName,
                dn: centralDbNotes
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
