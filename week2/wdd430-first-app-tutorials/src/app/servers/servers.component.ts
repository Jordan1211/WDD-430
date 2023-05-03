import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  // other selector options to use within element or as custom attribute
  // selector: '[app-servers]',
  // selector: `app-servers`,

  templateUrl: './servers.component.html',
  // alternative inline approach option
  // template: '<app-server></app-server><app-server></app-server>'
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created'
  serverName = 'Test Server';
  username = '';
  allowUsernameReset = false;
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onUpdateUsername(event: any) {
    this.username = (<HTMLInputElement>event.target).value;
    this.allowUsernameReset = true;
  }

  onResetUsername() {
    this.username = '';
  }

}
