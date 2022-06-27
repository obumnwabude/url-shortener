import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Link } from './link';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private _links: Link[] = [];

  get links(): Link[] {
    return this._links;
  }

  constructor(private snackBar: MatSnackBar) {}

  createLink(link: Link): void {
    this._links.push(link);
    this.snackBar.open('Link successfully created');
  }
}
