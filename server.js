var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); 

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

    socket.on('joinRoom' , function (req) {
    	clientInfo[socket.id] = req; // socket gives specific id  
    	socket.join(req.room);
    	socket.broadcast.to(req.room).emit('message', {
    		name : 'System',
    		text : req.name + ' has joined..!!!',
    		timestamp : moment().valueOf()
    	});
    });



	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
		//socket.broadcast.emit('message',message);
		message.timestamp = moment().valueOf();
		//io.emit('message',message);
		//this is for send msg to specific room member
		io.to(clientInfo[socket.id].room).emit('message',message);
	});

	socket.emit('message', {
		name : 'System',
		text : ' Welcome to the chat application..!!',
		timestamp : moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log("server started");
});