Ext.define('App.view.main.operation.solutions.OpenSolutionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-operation-solutions-opensolution',

    init() {
        const mod = this.getViewModel(),
            store = mod.getStore('allsolutions');

        store.load({
            params: {
                'IhQYw45L6i': Session.getId()
            }
        })
    },

    onSolutonDblClick(grid, record) {
        const info = {
            id: record.get('id'),
            name: record.get('name')
        };

        this.solutionSelected(info);
    },

    onSolutionOpen() {
        const solutionsGrid = this.lookupReference('solutions'),
            solution = solutionsGrid.getSelection()[0],
            info = {
                id: solution.get('id'),
                name: solution.get('name')
            };

        this.solutionSelected(info);
    },

    solutionSelected(info) {
        const win = this.getView();
                
        this.fireEvent('solutionselected', info);
        win.close();
    }

});
