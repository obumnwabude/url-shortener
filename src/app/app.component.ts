import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDrawer } from '@angular/material/sidenav';
import { firstValueFrom } from 'rxjs';
import { LinksEditorComponent } from './links-editor/links-editor.component';
import { LinksService } from './links.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  isLargeScreen = false;

  constructor(
    breakpoint: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    public linksService: LinksService
  ) {
    breakpoint
      .observe('(min-width: 768px)')
      .subscribe((b) => (this.isLargeScreen = b.matches));
  }

  openEditor() {
    if (this.isLargeScreen) {
      this.drawer.open();
    } else {
      const bsRef = this.bottomSheet.open(LinksEditorComponent, {
        disableClose: true
      });
      const closeSub = bsRef.instance.cancel.subscribe((_) => bsRef.dismiss());
      firstValueFrom(bsRef.afterDismissed()).then(() => closeSub.unsubscribe());
    }
  }
}
