import { Injectable } from '@angular/core';
import { from,Observable } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateImagesService {

  hasValid(files: File[]): boolean {
    for (const file of files) {
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
        const result = e.target?.result;
        if (result) observer.next(result as string);
        observer.complete();
      };
      reader.onerror = error => { observer.error(error); };
      reader.readAsDataURL(file);
    });
  }
}
