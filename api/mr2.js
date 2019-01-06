db.articles.mapReduce(
    function() {
        // Split text into words
        const words = this.text.split(/\.|,| /)

        // Count occurrences of words
        const counts = {}
        for(let word of words) {
            if (word) counts[word] = !!counts[word] ? counts[word] + 1 : 1
        }

        emit(this.author, counts)
    },
    function(key, values) {
        // Keep counting occurrences of words for this author
        let rv = {}
        for (let key in values) {
            rv[key] = !!rv[key] ? rv[key] + 1 : 1
        }

        return rv
    },
    {
        // Sort by word occurrence and take top 10
        finalize: function(key, rv) {
            return Object.keys(rv).sort((a,b) => rv[b]-rv[a]).slice(0, 10)
        },
        out: 'mr2',
    }
)

db.mr2.find().pretty()
