import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') private _isOpen = false;
  constructor() {}

  ngOnInit() {}

  @HostListener('click') mouseClick() {
    this._isOpen = !this._isOpen;
  }
}
