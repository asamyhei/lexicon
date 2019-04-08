import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {startWith} from 'rxjs/internal/operators/startWith';
import {Lexicon, LexiconService} from '../services/lexicon.service';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();
  options: Lexicon[] = [];
  filteredOptions: Observable<Lexicon[]>;
  lexicon: Lexicon = null;

  constructor(private lexiconService: LexiconService) {
    this.lexiconService.getLexicon()
      .subscribe((data: any) => this.options = data.data, err => console.log(err));
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value).slice(0, 5))
      );
  }

  showDefinition($event: MatAutocompleteSelectedEvent) {
    this.lexicon = null;
    this.lexicon = this.options.find(l => l.name === $event.option.value);
  }

  private _filter(value: string): Lexicon[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().includes(filterValue));
  }
}
