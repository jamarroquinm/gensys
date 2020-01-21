Ext.define('Gsys.desktop.crud.grid.ActiveColumn', {
    extend: 'Ext.grid.column.Template',
    alias: 'widget.activecolumn',

    xtype: 'templatecolumn',
    tpl: [
        '<tpl>',
        '    <tpl if = "active === 0">',
        '        <i class="fa fa-ban" aria-hidden="true"></i>',
        '    </tpl>',
        '</tpl>'
    ],
    width: 35,
    dataIndex: 'active',
    align: 'center',
    resizable: false
});