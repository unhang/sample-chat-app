import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://localhost:3000/';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public socket;
  public sender = `user_${Math.floor(Math.random() * 10)}`;
  public inputMessage;
  public messages: Array<{ sender: string; content: string }> = [];
  constructor() {}

  ngOnInit(): void {
    this.initSocketConnection();
  }

  initSocketConnection() {
    if (this.socket?.id) {
      return;
    }
    console.log('gọi');
    this.socket = io(SOCKET_ENDPOINT);
    console.log(this.socket);
    this.socket.on('chat', (data) => {
      console.log(data);
      this.messages.push(data);
    });
  }

  sendMessage() {
    this.socket.emit('chat', {
      sender: this.sender,
      content: this.inputMessage,
    });
    this.inputMessage = '';
  }
}
