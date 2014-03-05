var url = require('url');

module.exports = {
    beforeSend: function(req, res, next) {
    	if(!req.prerender.documentHTML) {
    		return next();
    	}
        // href
        var matches = req.prerender.documentHTML.toString().match(/href=["']\/[a-zA-Z0-9.\-_\/]+["']/gi);
        for (var i = 0; matches && i < matches.length; i++) {
            u = matches[i].match(/\/[a-zA-Z0-9.\-_\/]+/gi)
            res = url.resolve(req.prerender.url, u[0]);
            req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], 'href="' + res + '"');
        }

        //src
        var matches = req.prerender.documentHTML.toString().match(/src=["']\/[a-zA-Z0-9.\-_\/]+["']/gi);
        for (var i = 0; matches && i < matches.length; i++) {
            u = matches[i].match(/\/[a-zA-Z0-9.\-_\/]+/gi)
            res = url.resolve(req.prerender.url, u[0]);
            req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], 'src="' + res + '"');
        }
        next();
    }
};
