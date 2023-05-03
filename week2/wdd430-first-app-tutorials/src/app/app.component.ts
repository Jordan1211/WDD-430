import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // commenting out to try inline below starting at row 8
  // styleUrls: ['./app.component.css']
  styles: [`
  h3 {
    color: green;
  }`]
})
export class AppComponent {
  title = 'WDD430 My First App';
  name = 'Jordan';
  showSecret = false;
  log = []

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }
}
