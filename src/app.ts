import http from "http"
import express, { Application, NextFunction, Request, Response } from "express"
import { Server } from "socket.io"
import { UserRoutes } from "./routes/user.routes";
import { connect } from "./infra/database";
import fs from 'fs'
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.middleware";
import { RoomsRoutes } from "./routes/rooms.routes";
import { MessageRoutes } from "./routes/message.routes";

class App{
    private app: Application;
    private http: http.Server;
    private io: Server;
    private useRoutes = new UserRoutes();
    private roomsRoutes = new RoomsRoutes();
    private messageRoutes = new MessageRoutes();

    constructor(){
                
        this.app = express()
        this.http =  new http.Server(this.app);
        this.middlewaresInitalize()
        this.io = new Server(this.http)
        this.initializeRoutes()
        this.interceptionError()
        this.initializeHtml()
    }
    listen(){
        this.http.listen(3333, async ()=> {
            try {
                dotenv.config();
                await connect();
               console.log('Conectado ao banco de dados') 
            } catch (error) {
                console.log('🚀 ~ file: app.ts:37 ~ App this.http.listen ~ error', error);
                
            }
        });
    }

    listenSocket(){
        this.io.on('connection', (userSocket) => {
            console.log('a user connected')
            userSocket.on('join_room', (room_id) => {
                //console.log(room_id)
                userSocket.join(room_id);
            });

            userSocket.on('message', (data) => {
                console.log('🚀 ~ file: app.ts:31 ~ App ~ usserSocket ~ data', data);
                userSocket.to(data.room_id).emit('room_message', data.message)
            });
        });
    }

    private initializeHtml(){
        this.app.get('/index', (req,  res) => {
            //console.log('HTML, is render');
            res.sendFile(__dirname + '/index.html');
        })
    }

    private initializeRoutes(){
        this.app.use('/users', this.useRoutes.router)
        this.app.use('/rooms', this.roomsRoutes.router)
        this.app.use('/message', this.messageRoutes.router)
    }

    private middlewaresInitalize(){
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: true}));
      fs.accessSync('.env', fs.constants.F_OK)  
    }

    private interceptionError(){
        this.app.use(errorMiddleware)
    }
    // private interceptionError(){
    //     this.app.use((err: Error, resquest: Request, response: Response, next: NextFunction )=> {
    //         // throw new Error
    //         if(err instanceof Error){
    //             return response.status(400).json({
    //                 message: err.message,
    //             });
    //         }
    //         return response.status(500).json({
    //             message: 'Internal Server Error.'
    //         })
    //     })
    // }
}

export{App}