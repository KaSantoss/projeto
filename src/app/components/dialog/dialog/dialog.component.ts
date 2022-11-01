import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() emitText: EventEmitter<any> = new EventEmitter();
  //@Output () emitText: EventEmitter<{ text:string}> = new EventEmitter();
  @Input() question: string | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: { question: this.question },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('the dialog was closed');
      this.emitText.emit(result);
    });
  }
}
