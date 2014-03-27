module.exports = {
    beforeSend: function(req, res, next) {
    	if(!req.prerender.documentHTML) {
    		return next();
    	}
        // remove userlike window content
        var matches = req.prerender.documentHTML.toString().match(/<div><div id\="userlike">(?:[\S\s]*?)<\/div>(?:[\S\s]*?)<div class\="poweredBy"(?:[\S\s]*?)<\/div><\/div><\/div>/gi);
        for (var i = 0; matches && i < matches.length; i++) {
            req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], '');
        }

        // remove userlike button
        var matches = req.prerender.documentHTML.toString().match(/<div><a(?:.*?)id\="userlikeTab"(?:.*?)>(?:[\S\s]*?)<\/a><\/div>/gi);
        for (var i = 0; matches && i < matches.length; i++) {
            req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], '');
        }
        next();
    }
};
