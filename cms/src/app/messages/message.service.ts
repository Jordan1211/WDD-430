import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;  

  constructor(private http: HttpClient) { 
    this.maxMessageId = this.getMaxId();
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, msg: Message }>('http://localhost:3000/messages',
    message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.msg);
          this.sortAndSend();
        }
      );
  }

  getMessages() {
    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    return this.messages.slice();
  }

  getMessage(id) {
    return this.http.get<{ message: string, msg: Message}>('http://localhost:3000/messages/'+ id)
  }

  getMaxId(): number {

    let maxId = 0;
    this.messages.forEach(message => {
      if (parseInt(message.id) > maxId) {
        maxId = parseInt(message.id)
      } 
    });

    return maxId
  }

  sortAndSend() {
    this.messages.sort((a, b) => a.sender > b.sender ? 1 : b.sender > a.sender ? -1 : 0);
    this.messageListChangedEvent.next(this.messages.slice());
  }

}
