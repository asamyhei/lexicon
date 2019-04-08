import {Component, Input, OnInit} from '@angular/core';
import {Lexicon, LexiconService} from '../services/lexicon.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private lexiconService: LexiconService, private modalService: NgbModal) {

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
    this.lexiconService.deleteLexicon(entry).subscribe(value => {
      console.log(value);
      this.entries = this.entries.filter((l: Lexicon) => l.name !== entry.name);
    }, error => console.log(error));
  }

  editEntry(entry: Lexicon): void {
    const modalRef = this.modalService.open(ModalUpdateEntryComponent);
    (modalRef.componentInstance as ModalUpdateEntryComponent).data = entry;

    modalRef.result.then((value) => {
      console.log(value);
      this.lexiconService.putLexicon(value).subscribe(
        (data) => {
          console.log(`Edition de ${(data as Lexicon).name}`);
          this.getLexicon();
        }, error => {
          console.log(error);
        }
      );

    }).catch(reason => console.log(reason));
  }

  addEntry(): void {
    const modalRef = this.modalService.open(ModalAddEntryComponent);
    // (modalRef.componentInstance as ModalUpdateEntryComponent).data = entry;

    modalRef.result.then((value) => {
      console.log(value);
      this.lexiconService.postLexicon(value).subscribe(
        (data) => {
          console.log(`Ajout de ${(data as Lexicon).name}`);
          this.getLexicon();
        }, error => {
          console.log(error);
        }
      );

    }).catch(reason => console.log(reason));
  }
}


@Component({
  selector: 'app-ngbd-modal-update',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Edition du mot {{data.name}}</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <textarea class="form-control" [(ngModel)]="data.description"></textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss()">Annuler</button>
      <button type="button" class="btn btn-danger" (click)="modal.close(data)">Ok</button>
    </div>
  `,
})
export class ModalUpdateEntryComponent {

  @Input() public data: Lexicon;

  constructor(public modal: NgbActiveModal) {
  }

}

@Component({
  selector: 'app-ngbd-modal-add',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Ajout d'un mot</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <input class="form-control my-1" type="text"  placeholder="Mot" [(ngModel)]="data.name">
      <textarea class="form-control my-1" [(ngModel)]="data.description" placeholder="Description"></textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss()">Annuler</button>
      <button type="button" class="btn btn-danger" (click)="modal.close(data)">Ok</button>
    </div>
  `,
})
export class ModalAddEntryComponent {

  public data: Lexicon = {name: '', description: ''};

  constructor(public modal: NgbActiveModal) {
  }

}

