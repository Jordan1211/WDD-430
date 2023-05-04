import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() slectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.slectedFeatureEvent.emit(selectedEvent);
  }

}
