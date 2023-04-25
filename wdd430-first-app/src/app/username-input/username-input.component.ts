import { Component } from '@angular/core';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.css']
})
export class UsernameInputComponent {
  username = '';

  onUpdateUsername(event: any) {
    this.username = (<HTMLInputElement>event.target).value;
  }

}
