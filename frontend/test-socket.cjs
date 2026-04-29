const io = require('socket.io-client');
const socket = io('http://localhost:7000', {transports: ['websocket']});

console.log('Connecting to server...');

socket.on('connect', () => { 
    console.log('Connected!'); 
    // Join a dummy room that we can trigger manually or just listen
    socket.emit('joinTrip', '69f1d0fe9676c006585df3e5'); 
    console.log('Joined room 69f1d0fe9676c006585df3e5'); 
});

socket.on('locationUpdate', (data) => { 
    console.log('RECEIVED DATA:', data._id); 
});

socket.on('connect_error', (err) => {
    console.log('Connection Error:', err.message);
});
