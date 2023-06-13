import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
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
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  getMessages(): Message[] {
    this.http
      .get<Message[]>(
        'https://wdd430-cms-522ba-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          // success method
          this.messages = messages.sort((a, b) => a.id.localeCompare(b.id));
          this.maxMessageId = this.getMaxId();
          this.messageListChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    return this.messages.slice(); // or an initial value if documents haven't been fetched yet
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    this.http
      .put('https://wdd430-cms-522ba-default-rtdb.firebaseio.com/messages.json', messages,
        {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
      )
      .subscribe((response) => {
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id)
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

}
