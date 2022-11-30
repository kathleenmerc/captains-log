const React = require("react")

class Show extends React.Component {
    render() {
        const { log } = this.props
        return (
            <div>
                <header>
                    <h1>Show Page</h1>
                </header>
                <body>
                    <p>Title: {log.title}</p>
                    <p>Entry: {log.entry}</p>
                    <p>Maintenance needed: {log.shipIsBroken ? "Ship requires maintenance" : "Ship is running smoothly, no maintenance required"}</p>
    
                    <a href={`/logs/${log._id}/edit`}><button>Edit</button></a>
                    <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                        <input type="submit" value="Delete" />
                    </form>
                </body>
            </div>

        )
    }
}


module.exports = Show