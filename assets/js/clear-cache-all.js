var topics = {
    overviews: "/getcache/cache/partition/refresh/overviews/",
    clients: "/getcache/cache/partition/refresh/clients/",
    gallery: "/getcache/cache/partition/refresh/gallery/",
    portfolio: "/getcache/cache/partition/refresh/portfolio/",
    publication: "/getcache/cache/partition/refresh/publication/",
    team: "/getcache/cache/partition/refresh/team/",
    testimonials: "/getcache/cache/partition/refresh/testimonials/"
};

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
                // @todo: output some kind of response here
                this.console.fireEvent('complete');
            },scope:this}
        }
    });
}

return false;