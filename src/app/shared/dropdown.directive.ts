import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') private isOpen = false;
  constructor() {}

  ngOnInit() {}

  @HostListener('click') mouseClick() {
    this.isOpen = !this.isOpen;
  }
}
