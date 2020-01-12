import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from './servicios/apiservice.service';

// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nombre:string = "";
  correo:string = "";
  celular:string = "";
  descripcion:string = "";
  formularioContacto:FormGroup;
  title = 'landingPageFreshfoodMarket';
/**
 *
 */
constructor(private fb: FormBuilder, private apiService:ApiserviceService) {
  this.formularioContacto = this.fb.group({
    'nombre':['',[Validators.required]],
    'correo':['',[Validators.required,Validators.email]],
    'celular':['',[Validators.required]],
    'descripcion':['',[Validators.required]]
  })

}

  enviar(){
    this.apiService.enviarContacto(this.nombre,this.correo,this.celular,this.descripcion)
    .subscribe(res => {
      console.log({contacto:res})
    },error => {
      console.log({contactoError:error})
      alert("Ocurrio un error al enviar el contacto");
    })
  }
}
