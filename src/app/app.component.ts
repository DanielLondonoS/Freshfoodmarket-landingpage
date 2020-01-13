import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from './servicios/apiservice.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string;
  mensaje:string="";
  @ViewChild('content',{static:false}) private contect: TemplateRef<any>;
/**
 *
 */
constructor(private fb: FormBuilder, private apiService:ApiserviceService,private modalService: NgbModal) {
  this.formularioContacto = this.fb.group({
    'nombre':['',[Validators.required]],
    'correo':['',[Validators.required,Validators.email]],
    'celular':['',[Validators.required]],
    'descripcion':['',[Validators.required]]
  })

}

  enviar(){
    let datos = new Object();
    datos['nombre'] = this.nombre;
    datos['correo'] = this.correo;
    datos['descripcion'] = this.descripcion;
    datos['celular'] = this.celular.toString();
    

    this.apiService.enviarContactoPost(datos)
    .subscribe(res => {
      console.log({contacto:res})
      this.mensaje = "Su mensaje fue enviado con exito, en unos instantes nos estaremos comunicando con usted";
      this.open(this.contect);
      this.nombre = "";
      this.correo = "";
      this.celular = "";
      this.descripcion = "";
    },error => {
      this.apiService.enviarContacto(this.nombre,this.correo,this.celular.toString(),this.descripcion)
      .subscribe(res => {
        console.log({contacto:res})
        this.mensaje = "Su mensaje fue enviado con exito, en unos instantes nos estaremos comunicando con usted";
        this.open(this.contect);
      },error => {
        console.log({contactoError:error})
        //alert("Ocurrio un error al enviar el contacto");
        this.mensaje = "Ocurrio un error al enviar el contacto";
        this.open(this.contect);
      });
    })

    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
