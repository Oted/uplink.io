var rtmpServer = require('node-rtmpapi').rtmpServer();

rtmpServer.createServer(function(rtmpSession) {
   rtmpSession.msg.loop(null, {
      "amf0cmd": function(chunk) {
         var msg = chunk.chunk.msg;
         switch (msg.cmd) {
             case  "connect" :
                 console.log('CONNECTIONNN :D ');
                chunk.sendSetChunkSize(4096);
                chunk.sendSetWindowSize(10000000);
                chunk.sendSetPeerBw(10000000,1);
                chunk.sendAmf0EncCmdMsg({
                   cmd: "_result",
                   transId: msg.transId,
                   cmdObj: {
                      fmsVer: "FMS/3,5,5,2004",
                      capabilities: 31,
                      mode: 1
                   },
                   info: {
                      level: "status",
                      code: "NetConnection.Connect.Success",
                      description: "Connection succeeded.",
                      clientId: 1337,
                      objectEncoding: 0
                   }
                });
                chunk.sendUserControlMsg(0,1);
                break;
             case  "FCPublish":
                console.log('FCPUBLISH'); 
                break;
             case "createStream":
                console.log('CREATESTREAM'); 
                break;
             case  "publish":
                console.log('PUBLISH'); 
                break;
             case "releaseStream":
                console.log('RELEASE'); 
                break;
            default:
         }
      },
      "audio": function(chunk) {
        console.log('Got audio chunk : ' + chunk); 
      },
      "video": function(chunk) {
        console.log('Got video chunk : ' + chunk); 
      }
   });
}).listen(8000);
