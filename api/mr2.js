db.articles.mapReduce(
    function() {
        // Split text into words
        const words = this.text.split(/\.|,| /);

        // Count occurrences of words
        const counts = {};
        for(let word of words) {
            if (word) counts[word] = !!counts[word] ? counts[word] + 1 : 1;
        }

        emit(this.author, counts);
    },
    function(key, values) {
        // Keep counting occurrences of words for this author
        let rv = {};
        for (let key in values) {
            rv[key] = !!rv[key] ? rv[key] + 1 : 1;
        }

        return rv;
    },
    {
        out: 'mr1',
    }
);

db.mr1.find().pretty();
