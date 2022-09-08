import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  @Input() employee : any | null = null;
  @Output() confirm = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  agree() {
    this.confirm.emit(true);
    this.employee = null;
    }
  disagree() {
    this.employee = null;
    this.confirm.emit(false);
  }

}
