import {Server} from "socket.io"; //Imports the Server class from the socket.io package.
let io; //Declares a variable to store the socket server instance.
export const onlineUsers= new Map();    //Creates a Map to track online users. Key → userId Value → socket.id

export function initSocket(server){

    io = new Server(server,{cors:{origin: "*"}}); //Creates a new socket server. //Attaches it to the existing HTTP server. Enables CORS for all origins (*) so frontend can connect.
 
    io.on("connection", (socket)=>{   //Listen for Connections
        //on join
        socket.on("join", (userId)=>{    //lisreb when user join 
            onlineUsers.set(userId, socket.id);
        });

        //on disconnect
        socket.on("disconnect",()=>{  //listen when user disconnect
            for(const [key, value] of onlineUsers.entries()){   //Remove User From Map
                if(value===socket.id) onlineUsers.delete(key);
            }
        });
    });
}

export function getIO(){
    return io;
}