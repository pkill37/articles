db.articles.aggregate([
    {
        "$project": {
            "_id": 1,
            "title": 1,
            "text": 1,
            "author": 1,
            "image": 1,
            "comments": 1,
            "length": { "$size": "$comments" }
        }
    },
    { "$sort": { "length": -1 } },
    { "$limit": 5 }
]).pretty()
