const React = require('React')

class New extends React.Component {
    render() {
        return (
            <div>
                <header>
                    New Page
                </header>
                <body>
                    <form action="/logs" method="POST">
                        Title: <input type="text" name="title" /> <br/>
                        Entry: <input type="textarea" name="entry" /> <br/>
                        shipIsBroken: <input type="checkbox" name="shipIsBroken" /> <br/>
                        <input type="submit" name="submit" value="Submit" />
                    </form>
                </body>
            </div>
        )
    }
}

module.exports = New