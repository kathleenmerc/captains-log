const React = require('react')

class Edit extends React.Component {
    render() {
        const { log } = this.props
        return (
            <div>
                <header>
                    Edit Page
                </header>
                <body>
                    <form action={`/logs/${log._id}?_method=PUT`} method="POST">
                        <p>Title: <input type="text" name="title" value={log.title} /></p>
                        <p>Entry: <input type="textarea" name="entry" value={log.entry} /></p>

                        {
                            log.shipIsBroken ?
                                <p>Maintenance needed: <input type="checkbox" name="shipIsBroken" value={log.shipIsBroken} /></p>
                                :
                                <p>Maintenance needed: <input type="checkbox" name="shipIsBroken" /></p>
                        }
                        <input type="submit" name="submit" value="Edit Log" />
                    </form>
                </body>
            </div>
        )
    }
}

module.exports = Edit