import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css'],
})
export class AlertComponent {
  @Input() public message: string;
  @Output() public close = new EventEmitter<void>();

  public onClose() {
    this.close.emit();
  }
}
