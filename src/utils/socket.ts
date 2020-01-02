import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';
import { Message } from './socketTypes';

export default class Socket {
  public static readonly PORT: number = 5002;

  private app: express.Application = express();

  private server: Server = createServer();

  private io: SocketIO.Server = socketIo();

  private port: string | number = 0;

  private messageBox: Message[] = [];

  private rooms: string[] = [];

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || Socket.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private sendMessage = (): void => {
    if (this.messageBox && this.rooms.length > 1) {
      this.messageBox.map((message, i) => {
        this.io.to(message.to).emit('message', message);
        this.messageBox = this.messageBox.splice(i + 1, 1);
        return this.messageBox;
      });
    }
  };

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      if (
        socket.handshake.headers.origin === 'https://ide-nl3.betty.services'
      ) {
        socket.join('development');
        const existingroom = this.rooms.find(room => room === 'development');
        if (!existingroom) this.rooms.push('development');
        console.log('Development environment connected');
      } else {
        socket.join('runtime');
        const existingroom = this.rooms.find(room => room === 'runtime');
        if (!existingroom) this.rooms.push('runtime');
        console.log('Runtime environment connected');
      }
      socket.on('message', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.messageBox.push(m);
        setTimeout(() => {
          this.sendMessage();
        }, 1);
      });
      setTimeout(() => {
        this.sendMessage();
      }, 1);
    });
  }

  public getInstance(): express.Application {
    return this.app;
  }
}
