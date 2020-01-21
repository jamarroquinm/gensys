Ext.define('App.view.main.operation.solutions.3-operationdb.OperationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operation-solutions-operationdb-operation',

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
            operationalDbPrefix = this.lookupReference('operationalDbPrefix'),
            operationalDbNotes = this.lookupReference('operationalDbNotes');        

        mod.set('operationalDbPrefix', info.operationalDbPrefix);
        mod.set('operationalDbNotes', info.operationalDbNotes);

        operationalDbPrefix.setValue(info.operationalDbPrefix);
        operationalDbNotes.setValue(info.operationalDbNotes);
    },

    onSolutionClosed: function(info) {
        const mod = this.getViewModel(),
            operationalDbPrefix = this.lookupReference('operationalDbPrefix'),
            operationalDbNotes = this.lookupReference('operationalDbNotes'); 

        mod.set('operationalDbPrefix', null);
        mod.set('operationalDbNotes', null);
        
        operationalDbPrefix.reset();
        operationalDbNotes.reset();
    },

    onEdit: function() {
        const mod = this.getViewModel();

        mod.set('editing', true);
    },

    onCancel: function() {
        const mod = this.getViewModel(),
            operationalDbPrefix = this.lookupReference('operationalDbPrefix'),
            operationalDbNotes = this.lookupReference('operationalDbNotes');        

        operationalDbPrefix.setValue(mod.get('operationalDbPrefix'));
        operationalDbNotes.setValue(mod.get('operationalDbNotes'));

        mod.set('editing', false);
    },

    onSave: function() {
        const mod = this.getViewModel(),
            operationalDbPrefix = this.lookupReference('operationalDbPrefix').getValue(),
            operationalDbNotes = this.lookupReference('operationalDbNotes').getValue();

        Ext.Ajax.request({
            url: Session.getScriptsPath('solution', 'setodbnts'),

            params: {
                IhQYw45L6i: Session.getId(),
                solutionid: mod.get('solutionId'),
                pr: operationalDbPrefix,
                dn: operationalDbNotes
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
