import http from "http"
import express, { Application, NextFunction, Request, Response } from "express"
import { Server } from "socket.io"
import { UserRoutes } from "./routes/user.routes";
import { connect } from "./infra/database";
import fs from 'fs'
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.middleware";

class App{
    private app: Application;
    private http: http.Server;
    private io: Server;
    private useRoutes = new UserRoutes

    constructor(){
                
        this.app = express()
        this.http =  new http.Server(this.app);
        this.middlewaresInitalize()
        this.io = new Server
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
                console.log('🚀 ~ file: app.ts:26 ~ App this.http.listen ~ error', error);
                
            }
        });
    }

    listenSocket(){
        this.io.on('connection', (useSocket) => {
            console.log('a user connected')
        })
    }

    private initializeHtml(){
        this.app.get('/index', (req,  res) => {
            console.log('HTML, is render');
            res.sendFile(__dirname + '/index.html');
        })
    }

    private initializeRoutes(){
        this.app.use('/users', this.useRoutes.router)
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