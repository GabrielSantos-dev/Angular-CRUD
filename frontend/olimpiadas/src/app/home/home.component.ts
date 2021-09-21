import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { HomeModel } from './home.model';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  faGithub = faGithub
  faLinkedin = faLinkedin
  faYoutube = faYoutube

  formValue !: FormGroup;
  homeModelObj : HomeModel = new HomeModel();
  homeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nome : [''],
      idade : [''],
      genero : [''],
      peso : [''],
      altura : [''],
      nacionalidade : ['']
    })
    this.getAtletas();
  }
  clickAdicionarAtletas(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postHomeDetails(){
    this.homeModelObj.nome = this.formValue.value.nome;
    this.homeModelObj.idade = this.formValue.value.idade;
    this.homeModelObj.genero = this.formValue.value.genero;
    this.homeModelObj.peso = this.formValue.value.peso;
    this.homeModelObj.altura = this.formValue.value.altura;
    this.homeModelObj.nacionalidade = this.formValue.value.nacionalidade;

    this.api.postAtleta(this.homeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Atleta adicionado com sucesso")
      let ref = document.getElementById('cancelar')
      ref?.click();
      this.formValue.reset();
      this.getAtletas();
    },
    err=>{
    alert("Alguma coisa está errada");
    })

  }
  getAtletas(){
    this.api.getAtleta(this.homeModelObj).subscribe(res=>{
      this.homeData = res;
    })
  }
  deleteAtletas(row : any){
    this.api.deleteAtleta(row.id)
    .subscribe(res=>{
      alert("Atleta Deletado");
      this.getAtletas();
      
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.homeModelObj.id = row.id;
    this.formValue.controls['nome'].setValue(row.nome);
    this.formValue.controls['idade'].setValue(row.idade);
    this.formValue.controls['genero'].setValue(row.genero);
    this.formValue.controls['peso'].setValue(row.peso);
    this.formValue.controls['altura'].setValue(row.altura); 
    this.formValue.controls['nacionalidade'].setValue(row.nacionalidade); 
  }
  editarHomeDetails(){
    this.homeModelObj.nome = this.formValue.value.nome;
    this.homeModelObj.idade = this.formValue.value.idade;
    this.homeModelObj.genero = this.formValue.value.genero;
    this.homeModelObj.peso = this.formValue.value.peso;
    this.homeModelObj.altura = this.formValue.value.altura;
    this.homeModelObj.nacionalidade = this.formValue.value.nacionalidade;

    this.api.updateAtleta(this.homeModelObj,this.homeModelObj.id)
    .subscribe(res=>{
      alert("Atleta Atualizado com Sucesso!");
      let ref = document.getElementById('cancelar')
      ref?.click();
      this.formValue.reset();
      this.getAtletas();
    })
  }
}
