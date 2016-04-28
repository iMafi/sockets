var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(data) {
    console.log('New message:');
    console.log(data.text);
});