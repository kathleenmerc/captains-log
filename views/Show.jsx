const React = require("react")

class Show extends React.Component {
    render() {
        const {title, entry, shipIsBroken} = this.props.log
        return (
            <div>
                <header>
                    <h1>Show Page</h1>
                </header>
                <body>
                    Title: {title} < br/>
                    Entry: {entry} < br/>
                    Is the ship broken? {shipIsBroken ? "True" : "False"}
                </body>
            </div>

        )
    }
}


module.exports = Show