Ext.define('App.view.utilities.CrudWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.utilities-crudwindow',

    onSave(btn) {
        const win = this.getView(),
            form = win.down('form'),
            values = form.getValues(),
            event = win.getEvent();

        if( form.isValid() ) {
            this.fireEvent(event, values);
            win.close();        
        }
    }

});
