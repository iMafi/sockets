var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(data) {
    console.log('New message:');
    console.log(data.text);
    console.log(data.timestamp);

    var timestamp = moment.utc(data.timestamp).local().format('h:mm a');
    console.log(timestamp);

    $('.messages').append('<p><strong>' + timestamp + ':</strong> ' + data.text + '</p>');
});

var $form = jQuery('#messageForm');
$form.on('submit', function(e) {
    e.preventDefault();

    var $input = $form.find('input[name=message]');
    socket.emit('message', {
        text: $input.val()
    });

    $input.val('');
});