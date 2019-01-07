db.articles.mapReduce(
    function() {
        // Group articles by length
        // Must emit the ID and not the article object itself,
        // otherwise we hit the maximum BSON document size (16MB)
        emit(this.comments.length, { articles: [this._id] })
    },
    function(key, values) {
        // Concatenate articles together in the right "bucket"
        let rv = { articles: [] }
        for (let value of values) {
            rv.articles = rv.articles.concat(value.articles)
        }

        return rv
    },
    {
        finalize: function(key, rv) { return rv.articles },
        out: { inline: 1 }
    }
);
