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
                    Title: {log.title} < br />
                    Entry: {log.entry} < br />
                    Status update: {log.shipIsBroken ? "Ship requires maintenance" : "Ship is running smoothly, no maintenance required"}

                    <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                        <input type="submit" value="Delete" />
                    </form>
                </body>
            </div>

        )
    }
}


module.exports = Show