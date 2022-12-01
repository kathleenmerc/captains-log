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
                                <p>Maintenance needed: <input type="checkbox" name="shipIsBroken" defaultChecked /></p>
                                :
                                <p>Maintenance needed: <input type="checkbox" name="shipIsBroken" /></p>
                        }
                        <a href={'/logs'}><button>Back</button></a>
                        <input type="submit" name="submit" value="Confirm Changes" />
                    </form>
                </body>
            </div>
        )
    }
}

module.exports = Edit