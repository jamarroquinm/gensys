Ext.define('Gsys.data.model.Dictionary',{
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.String',
		'Ext.data.field.Integer'
	],

	fields: [
		{name: 'id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'name', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'active', type: 'int', defaultValue: 1}
	]

});