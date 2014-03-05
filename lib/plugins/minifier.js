var minify = require('html-minifier').minify;

module.exports = {
    beforeSend: function(req, res, next) {
    	if(!req.prerender.documentHTML) {
    		return next();
    	}

        var input = req.prerender.documentHTML.toString()
        req.prerender.documentHTML = minify(input, {
                                                    removeComments: true,
                                                    removeCommentsFromCDATA: true,
                                                    collapseWhitespace: true,
                                                    collapseBooleanAttributes: true,
                                                    removeAttributeQuotes: true,
                                                    removeEmptyAttributes: true
                                                   });

        next();
    }
};
