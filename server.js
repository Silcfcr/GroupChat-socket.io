const express = require( 'express' );
const app = express();

app.use(express.static(__dirname + "/public"));
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

const server = app.listen(8888);

const io = require( 'socket.io' )( server );

// not endpoints but utilities of socket io
//io.on method to attend a new request from the client to the server. 

//connection: keywork I can choose. 
let usersDB = [];
let messagesDB = ["Hello"];

app.get( '/', function( request, response ){
    console.log(messagesDB);
    response.render( 'index', {messagesDB : messagesDB});
});

io.on( 'connection', function( socket ){
    //console.log( socket );
    console.log( "Someone just connected!" );
    // socket.on( 'greeting', function( data ){
    //     socket.emit( 'allMessages',  messagesDB );
    // });

    socket.on( 'sendMessage', function( data ){
        if (usersDB.indexOf(data.id === -1)) {
            usersDB.push(data.name);
        }

        messagesDB.push(data.message);
        console.log(usersDB);
        io.sockets.emit( 'sendAll', data ); 
    });
    
});