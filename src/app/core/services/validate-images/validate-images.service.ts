import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateImagesService {

  constructor() { }

  hasValid(files: File[]): boolean {
    for (let file of files) {
      if (file.type !== 'image/png') {
        alert('Apenas imagens .png são aceitas.');
        return false;
      }
      if (file.size > 20 * 1024 * 1024) {
        alert('O tamanho da imagem não pode exceder 20MB.');
        return false;
      }
    }
    return true;
  }

  toBase64(files: File[]): Observable<string[]> {
    return from(files).pipe(
      mergeMap(file => this.readFileAsBase64(file)),
      toArray()
    );
  }

  private readFileAsBase64(file: File): Observable<string> {
    return new Observable<string>(observer => {
      const reader = new FileReader();
      reader.onload = e => {
        observer.next(e.target!.result as string);
        observer.complete();
      };
      reader.onerror = error => observer.error(error);
      reader.readAsDataURL(file);
    });
  }
}
