var net = require('net');
var port = 1081;
var ps1 = '\n\n>>> ';

net.createServer( function ( socket ) {
  socket.write( ps1 );
  socket.on( 'data', recv.bind( null, socket ) );
} ).listen( port );

function recv( socket, data ) {
  if ( data === 'quit' ) {
    socket.end( 'Bye!\n' );
    return;
  }

  // request( { uri: baseUrl + data }, function ( error, response, body ) {
  //   if ( body && body.length ) {
  //     $ = cheerio.load( body );
  //     socket.write( $( '#mw-content-text p' ).first().text() + '\n' );
  //   } else {
  //     socket.write( 'Error: ' + response.statusCode );
  //   }
  //   socket.write( ps1 );
  // } );
}