import WebSocket, { WebSocketServer } from "ws";
import * as fs from 'fs';


var incr =0;
var nd=0;
var pop=process.env.PORT;

const wss = new WebSocketServer({ port: pop });
wss.on("connection", function connection(ws, req) {

  const ip = req.socket.remoteAddress;
  console.log(ip);

  ws.on("message", function message(message) {
    const data = JSON.parse(message);

    if (data.type === "message") {
      if (data.data==="D0000000000"){
        var ou = fs.readFile('history.json', function (err,dat){
          var json = JSON.parse(dat);
          json.his=[];
          fs.writeFileSync("history.json", JSON.stringify(json))
        });

      } else {

      fs.readFile('history.json', function (err,dat){
        var json = JSON.parse(dat);
        json.his.push(data.data);
        fs.writeFileSync("history.json", JSON.stringify(json))
      });


      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", data: data.data, ip: ip }));
        }
      });
    
    
    }
    } else if (data.type === "his"){

      incr++
      var ou = fs.readFileSync('history.json', 'utf8');
      var json = JSON.parse(ou);
      var dd=json.his[json.his.length-incr];

      if(incr > json.his.length){
        nd++;
        if (nd==1){
          wss.clients.forEach((client) => {
            if (client == ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "his", data:"No more data", ip: ip }));
            }
          })


        }



      }else {




        wss.clients.forEach((client) => {
          if (client == ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "his", data:dd, ip: ip }));
          }
        });


      }

      




    } else{ return false; }

  });
});











