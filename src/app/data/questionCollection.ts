import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

@Injectable()
export class QuestionCollection {
  constructor(private http: HttpClient) {}
  get(language: string): Observable<IQuestion[]> {
    let content =  this.http.get<IQuestion[]>('assets/mybody-en.json');
    if ('ur' == language) {
      content = this.http.get<IQuestion[]>('assets/mybody-ur.json');
    }
    return content;
  }
}
