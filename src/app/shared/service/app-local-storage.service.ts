import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLocalStorageService {

  get(key) {
    return localStorage.getItem(key);
  }

  put(key, value) {
    localStorage.setItem(key, value);
  }

  remove(key){
    localStorage.removeItem(key);
  }
}
