import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-confirm-container',
  templateUrl: './confirm-container.component.html',
  styleUrls: ['./confirm-container.component.scss']
})
export class ConfirmContainerComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Output() confirmation = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  onConfirm() {
    this.confirmation.emit(true);
  }

  onCancel() {
    this.confirmation.emit(false);
  }

}
