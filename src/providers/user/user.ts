import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {

  usuario_id = "";
 
  constructor() { }

  setUserId(valor){
    this.usuario_id = valor;
  }

  getUserId(){
    return this.usuario_id;
  }


}
