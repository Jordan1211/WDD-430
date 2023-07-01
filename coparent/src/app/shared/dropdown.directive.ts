import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
@Directive({
  selector: '[cpaDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const linkElement = this.elRef.nativeElement;
    const isLinkClicked = linkElement.contains(event.target);
  
    if (isLinkClicked) {
      event.preventDefault();
    }
  
    this.isOpen = isLinkClicked ? !this.isOpen : false;
  }
  
  constructor(private elRef: ElementRef) {}
}

