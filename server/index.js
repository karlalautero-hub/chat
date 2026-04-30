const express = require ('express');
const { createServer } = require ("node:http");
const { Server } = require ("socket.io");
const cors = require ("cors");

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.emit("message", "Karla: Welcome to the chat!");

    socket.on("message", (msg) => {
        // io.emit("message", msg); // Enviar a todos los clientes, incluido uno mismo
        // socket.emit("message", msg); // Enviar solo al cliente que envió el mensaje
        // socket.broadcast.emit("message", msg); // Enviar a todos los clientes excepto al que envió el mensaje
        socket.emit("confirmation", "mensaje enviado");

        socket.broadcast.emit("message", "enviaron esto: " + msg);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
