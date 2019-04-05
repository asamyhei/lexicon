import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';
import {startWith} from 'rxjs/internal/operators/startWith';
import {LexiconService} from '../services/lexicon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Apagogie', 'Soliloque', 'Topinambour' , 'z' , 'ba'];
  filteredOptions: Observable<string[]>;

  constructor(private lexiconService: LexiconService) {
    this.lexiconService.getLexicon().subscribe(data => console.log(data), err => console.log(err));
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value).slice(0, 5))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().includes(filterValue)).sort((a, b) => a.localeCompare(b));
  }

}
