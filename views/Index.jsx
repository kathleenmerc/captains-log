const React = require('react')

class Index extends React.Component {
    render() {
        const { logs } = this.props
        return(
            <div>
                <header>
                    <h1>Index Page</h1>
                    <nav> 
                        <a href="/logs/new">Add a New Log</a> 
                    </nav>
                </header>
                <body>
                    <ul>
                        {logs.map((log, i) => {
                            return (
                                <li key= {i}>
                                    <a href={`/logs/${log._id}`}>{log.title}</a>
                                </li>
                            )
                        })}
                    </ul>
                </body>
            </div>
        )
    }
}

module.exports = Index