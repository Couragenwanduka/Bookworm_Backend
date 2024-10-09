import { Server } from "socket.io";
import { googleApi } from "../helper/geninApi";

export const setUpServer = (server:any) => {
    const io =  new Server(server,{
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
        },
      });

    io.on('connection', (socket:any) => {
        console.log('a user connected');
        socket.on('chat message', async(message:string) => {
            if(message){
                const data = await googleApi(message);
                // console.log(data, 'data')
                socket.emit('chat message', data);
            }else{
                socket.emit('chat message', 'No message sent');
            }
        })
    });

    return io;
}