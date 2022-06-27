import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Link } from '../link';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-links-editor',
  templateUrl: './links-editor.component.html',
  styleUrls: ['./links-editor.component.scss']
})
export class LinksEditorComponent {
  shortCtrl = new FormControl('', [
    Validators.pattern(/^(\w|\-)*$/),
    Validators.required
  ]);

  longCtrl = new FormControl('', [
    Validators.pattern(/^https:\/\//),
    Validators.required
  ]);

  linkForm = new FormGroup({ short: this.shortCtrl, long: this.longCtrl });

  @Output() cancel = new EventEmitter();

  constructor(
    private linksService: LinksService,
    private snackBar: MatSnackBar
  ) {}

  saveLink(event: SubmitEvent): void {
    if (this.linkForm.invalid) {
      this.snackBar.open('Please resolve all errors');
    } else {
      const link: Link = {
        id: Date.now(),
        short: this.linkForm.value.short!,
        long: this.linkForm.value.long!
      };
      this.linksService.createLink(link);
      (event.target as HTMLFormElement).reset();
      this.linkForm.reset();
      this.cancel.emit();
    }
  }
}
