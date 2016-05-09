var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

$('.room-title').text(room);

socket.on('connect', function() {
    console.log('Connected to socket.io server!');

    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(data) {

    var timestamp = moment.utc(data.timestamp).local().format('h:mm a');
    var message = '<p><strong>' + data.name + ' ' + timestamp + ':</strong></p> ';
    message += '<p>' + data.text + '</p>';

    $('.messages').append(message);
});

var $form = jQuery('#messageForm');
$form.on('submit', function(e) {
    e.preventDefault();

    var $input = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: $input.val()
    });

    $input.val('');
});