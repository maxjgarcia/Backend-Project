import port from "./configs/server.config.js"
import app from "./server.js"
import { Server } from 'socket.io'

app.get("/", (req, res) => {
    res.render('index.handlebars', { title: 'Challenge05: WebsocketsHandlebars', style: 'index.css' })
});

app.get('*', (req, res) => {
    res.status(404).render('404.handlebars', { error: 'Not a valid page', title: '404 Not Found', style: 'index.css' })
})

const httpServer = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
httpServer.on('error', (err) => console.log(`Server Error: ${err}`))

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(socket.id);
})

export { io }