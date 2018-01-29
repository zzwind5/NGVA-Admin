const WebSocket = require('ws').Server;
const http = require('http');

const server = http.createServer($app);
const wss = new WebSocket.Server({server});

const waCache = new Map();

wss.broadcast = function(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}

wss.on('connection', function(ws, req) {
	let ipAddr = req.connection.remoteAddress;
	ws.clientIpAddr = ipAddr;
	waCache.set(ipAddr, ws);

	ws.send('Hello');

	ws.on('message', function incoming(message){
		console.log(`Receive message: ${message}`);
	});

	ws.on('close', function(close) {
		waCache.delete(this.clientIpAddr);
		console.log('WebSocket closed.');
        // try{
        // 	wss.broadcast(0,this.user.name);
        // }catch(e){
        // 	console.log('刷新页面了');
        // }
    });
});