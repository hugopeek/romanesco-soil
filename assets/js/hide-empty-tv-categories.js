// This script overrides the moveTV function in MODX, so empty categories won't
// be displayed after their contents were moved through form customizations.
//
// Many thanks to ishryal for sharing this fix on the forums
// https://forums.modx.com/thread/?thread=79951&page=2

MODx.moveTV = function(tvs,tab) {
    if (!Ext.isArray(tvs)) { tvs = [tvs]; }
    var tvp = Ext.getCmp('modx-panel-resource-tv');
    if (!tvp) { return; }

    for (var i=0;i<tvs.length;i++) {
        var tr = Ext.get(tvs[i]+'-tr');

        if (!tr) { return; }
        var pn = tr.parent().id;
        var fp = Ext.getCmp(tab);
        if (!fp) { return; }
        fp.add({
            html: ''
            ,width: '100%'
            ,id: 'tv-tr-out-'+tvs[i]
            ,cls: 'modx-tv-out'
        });
        fp.doLayout();

        var o = Ext.get('tv-tr-out-'+tvs[i]);
        o.replaceWith(tr);
        if (Ext.query('#' + pn  + ' .modx-tv').length == 0) {
            Ext.get(pn).remove();
        }
    }
};