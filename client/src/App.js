import React from 'react'
const API_URL = 'http://localhost:3001'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: null,
            comment: '',
        }
    }

    async componentDidMount() {
        let response = await fetch(`${API_URL}/articles`)
        let articles = (await response.json()).data
        this.setState({ articles: articles })
        console.log(articles)
    }

    handleComment(e) {
        this.setState({ comment: e.target.value })
    }

    async addComment(e, id) {
        console.log(`Commenting ${this.state.comment} on article ${id}`)

        try {
            const config = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: this.state.comment })
            }

            const response = await fetch(`${API_URL}/articles/${id}/comments`, config)
            const json = await response.json()

            // Make a copy of articles
            let articles = JSON.parse(JSON.stringify(this.state.articles))

            // Mutate copy
            articles.forEach((article, index, arr) => {
                if(article._id === id) arr[index] = json.data
            })

            // Set articles to mutated copy
            this.setState({ articles: articles })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.articles != null && (
                    <div>
                        {this.state.articles.map((article, index) => (
                            <div key={index}>
                                <img alt={article.title} src={`${API_URL}/images/${article.image}`} />
                                <h2>{article.title}</h2>
                                <p>{article.text}</p>
                                <input onChange={(e) => this.handleComment(e)} type="text" placeholder="Lorem ipsum..." />
                                <button onClick={(e) => this.addComment(e, article._id)}>Comment</button>
                                <ul>
                                    {article.comments.map((comment, index) => (
                                        <li key={index}>{comment.createdAt}: {comment.text}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default App
