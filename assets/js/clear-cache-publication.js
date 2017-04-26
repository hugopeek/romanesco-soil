var topic = {
    overviews: "/getcache/cache/partition/refresh/publication/"
};

this.console = MODx.load({
    xtype: 'modx-console'
    ,register: 'mgr'
    ,topic: topic
    ,show_filename: 0
});

this.console.show(Ext.getBody());

MODx.Ajax.request({
    url: MODx.config.assets_url+'components/getcache/connector.php'
    ,params: { action: 'cache/partition/refresh', partitions: 'publication', register: 'mgr' , topic: topic }
    ,listeners: {
        'success':{fn:function() {
            this.console.fireEvent('complete');
        },scope:this}
    }
});

return false;