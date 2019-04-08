import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface Lexicon {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LexiconService {

  constructor(private http: HttpClient) {
  }

  getLexicon() {
    return this.http.get(environment.api);
  }

  postLexicon(lexicon: Lexicon) {
    return this.http.post(environment.api, lexicon);
  }

  putLexicon(lexicon: Lexicon) {
    return this.http.put(environment.api, lexicon);
  }

  deleteLexicon(lexicon: Lexicon) {
    return this.http.delete(`${environment.api}/${lexicon.name}`);
  }

}
