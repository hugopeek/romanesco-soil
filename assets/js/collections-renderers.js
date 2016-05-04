var imageRenderer = function(value, metaData, record, rowIndex, colIndex, store) {
    if (value != '' && value != null) {
        var baseUrl = MODx.config.default_site_url;
        if (value.indexOf('http://') === 0) {
            baseUrl = '';
        }
        return '<div class="imageRenderer"><img src="' + baseUrl + value + '" width="100"></div>';
    }
}
var imageRendererTestimonialCompany = function(value, metaData, record, rowIndex, colIndex, store) {
    //if (value != '' && value != null) {
    //    var baseUrl = MODx.config.default_site_url + "testimonials/companies/";
    //    if (value.indexOf('http://') === 0) {
    //        baseUrl = '';
    //    }
    //    return '<div class="imageRendererTestimonialCompany"><img src="' + baseUrl + value + '" width="100"></div>';
    //}
    if (value == null || value == undefined ) return '';
    if (!value.length) return '';
    var data = JSON.parse(value);
    var url = ImagePlus.generateThumbUrl({
        src: data.sourceImg.src,
        source: data.sourceImg.source,
        sw: data.crop.width,
        sh: data.crop.height,
        sx: data.crop.x,
        sy: data.crop.y
    })
    return '<div class="imageRendererTestimonialCompany"><img src="' + url + '" style="max-width:100%; height:auto;" /></div>';
}
var imageRendererTestimonialPerson = function(value, metaData, record, rowIndex, colIndex, store) {
    if (value != '' && value != null) {
        var baseUrl = MODx.config.default_site_url + "testimonials/persons/";
        if (value.indexOf('http://') === 0) {
            baseUrl = '';
        }
        return '<div class="imageRendererTestimonialPerson"><img src="' + baseUrl + value + '" width="100"></div>';
    }
}
var imageRendererTeam = function(value, metaData, record, rowIndex, colIndex, store) {
    if (value != '' && value != null) {
        var baseUrl = MODx.config.default_site_url + "team/";
        if (value.indexOf('http://') === 0) {
            baseUrl = '';
        }
        return '<div class="imageRendererTeam"><img src="' + baseUrl + value + '" width="100"></div>';
    }
}