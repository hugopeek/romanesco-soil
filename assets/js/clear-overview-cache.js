var topics = {
    overviews: "/getcache/cache/partition/refresh/overviews/",
    testimonials: "/getcache/cache/partition/refresh/testimonials/",
    team: "/getcache/cache/partition/refresh/team/"
};

//this.console = MODx.load({
//    xtype: 'modx-console'
//    ,register: 'mgr'
//    ,topic: topics
//    ,show_filename: 0
//});

if (this.console == null || this.console == undefined) {
    this.console = MODx.load({
        xtype: 'modx-console'
        ,register: 'mgr'
        ,topic: topics
        ,show_filename: 0
        ,listeners: {
            'shutdown': {fn:function() {
                window.location.reload();
            },scope:this}
        }
    });
} else {
    this.console.setRegister('mgr', topics);
}

this.console.show(Ext.getBody());

for (var partition in topics) {
    MODx.Ajax.request({
        url: MODx.config.assets_url+'components/getcache/connector.php'
        ,params: { action: 'cache/partition/refresh', partitions: partition, register: 'mgr' , topic: topics[partition] }
        ,listeners: {
            'success':{fn:function() {
                // @todo: insert some kind of response here
                this.console.fireEvent('complete');
            },scope:this}
        }
    });
}

return false;