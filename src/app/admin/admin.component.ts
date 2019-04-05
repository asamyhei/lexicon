import {Component, OnInit} from '@angular/core';
import {Lexicon, LexiconService} from '../services/lexicon.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 4;
  pageSize: number;
  entries: Lexicon[] = [];

  constructor(private lexiconService: LexiconService) {

  }

  ngOnInit() {
    this.getLexicon();
  }

  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum);
  }

  getLexicon() {
    this.lexiconService.getLexicon().subscribe(
      (data: any) => {
        this.entries = data.data.sort((a, b) => a.name.localeCompare(b.name));
      }, err => console.log(err));
  }

  deleteEntry(entry: Lexicon): void {
    this.lexiconService.deleteLexicon(entry).subscribe(value => console.log(value), error => console.log(error));
    this.entries = this.entries.filter((l: Lexicon) => l.name !== name);
    console.log(this.entries);
  }

}
