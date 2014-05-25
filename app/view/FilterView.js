Ext.define('mvkapp.view.FilterView', {
    extend: 'Ext.form.Panel',
    xtype: 'filterview',

    requires: [
        'Ext.field.Select'
    ],
    
    config: {        
        items: [
            {
            xtype: 'fieldset',
            title: 'SettingsView',
            items: [
                {
                    name: 'tags',
                    xtype: 'textfield',
                    label: 'Tags'
                },
                {
                    name: 'style',
                    xtype: 'selectfield',
                    label: 'Style'
                },
                {
                    xtype: 'button',
                    text: 'Submit',
                    ui: 'confirm'
                }
            ]
            }
        ]        
    }
});