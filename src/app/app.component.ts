import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('inputForm') inputs !: ElementRef;
  @ViewChild('signupForm') em !: ElementRef;
  @ViewChild('lab') lab !: ElementRef;
  @ViewChild('terminar') ter !: ElementRef;

  ngAfterViewInit() {
    console.log(this.ter);
  }

  title = 'catra-computer';

  arrayComandos = []
  memoria = []
  entradas = []
  eacumulador = []
  acumulador:any
  i = 0

  reinicia(){
    console.log('Reinicia')
    window.location.reload()
  }

  calcular(form: NgForm){
    this.arrayComandos.push(form.value.dato)
    if (+form.value.dato.slice(0,2) == 10){
      this.em.control.disable()
      this.inputs.control.enable()
      this.ter.nativeElement.disabled = true
    }
    form.setValue({dato:''})
  }

  inputsF(){
    this.entradas.push(this.inputs.value.in1)
    console.log(this.entradas)
    this.em.control.enable()
    this.inputs.control.disable()
    this.ter.nativeElement.disabled = false
    this.inputs.setValue({in1:''})
  }
  
  emular(){
    this.em.control.disable()
    for (let j = 0; j<=10; j++){
      this.memoria[j] = j
    }
    console.log(this.arrayComandos)
    let contador = 0
    let contadorIn = 0
    let comando
    while (this.i<= this.arrayComandos.length) {
      comando = this.arrayComandos[this.i]
      contador = contador + 1
      if (comando == ""){
        alert('Comando inválido en la linea '+contador)
      }else{
        if (comando.length != 5){
          alert('Comando inválido en la linea '+contador)
        }else{
          switch(comando.slice(0,2)){
            case '10':
              contadorIn = contadorIn
              if (this.verificar(comando)){
                this.lee(comando.slice(2,5),contadorIn)
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '11':
              console.log('Escribe')
              if (this.verificar(comando)){
                this.escribe(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '20':
              console.log('Carga')
              if (this.verificar(comando)){
                this.carga(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '21':
              console.log('Almacena')
              if (this.verificar(comando)){
                this.almacena(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '30':
              console.log('Suma')
              if (this.verificar(comando)){
                this.suma(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '31':
              console.log('Resta')
              if (this.verificar(comando)){
                this.resta(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '32':
              console.log('Divide')
              if (this.verificar(comando)){
                this.divide(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '33':
              console.log('Multiplica')
              if (this.verificar(comando)){
                this.multiplica(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '40':
              console.log('Bifurca')
              if (this.verificar(comando)){
                this.bifurca(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '41':
              console.log('BifurcaNeg')
              if (this.verificar(comando)){
                this.bifurcaNeg(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '42':
              console.log('BifurcaCero')
              if (this.verificar(comando)){
                this.bifurcaCero(comando.slice(2,5))
              }else{
                alert('Comando inválido en la linea '+contador)
              }
              break;
            case '43':
              console.log('Alto')
              break;
            default:
              alert('Comando inválido en la línea '+contador)
          }
        }
      }
      this.i = this.i + 1
    }
    console.log(contador)
  }

  verificar(comando){
    if ((comando.slice(2,5) == '001') || (comando.slice(2,5) == '002') || (comando.slice(2,5) == '003') || (comando.slice(2,5) == '004') || (comando.slice(2,5) == '005') || (comando.slice(2,5) == '006') || (comando.slice(2,5) == '007') || (comando.slice(2,5) == '008') || (comando.slice(2,5) == '009') || (comando.slice(2,5) == '010')){
      return true
    }else{
      return false
    }
  }

  lee(comando, contador){
    this.memoria[+comando] = this.entradas[contador]
    this.eacumulador.push(this.acumulador)
  }

  escribe(comando){
    this.lab.nativeElement.textContent = (this.lab.nativeElement.textContent + this.memoria[+comando]+', ')
    this.eacumulador.push(this.acumulador)
  }

  carga(comando){
    this.acumulador = this.memoria[+comando]
    this.eacumulador.push(this.acumulador)
  }

  almacena(comando){
    this.memoria[+comando] = this.acumulador
    this.eacumulador.push(this.acumulador)
  }

  suma(comando){
    this.acumulador = (this.acumulador + this.memoria[+comando])
    this.eacumulador.push(this.acumulador)
  }

  resta(comando){
    this.acumulador = (this.acumulador - this.memoria[+comando])
    this.eacumulador.push(this.acumulador)
  }

  divide(comando){
    this.acumulador = (this.acumulador/this.memoria[+comando])
    this.eacumulador.push(this.acumulador)
  }

  multiplica(comando){
    this.acumulador = (this.acumulador * this.memoria[+comando])
    this.eacumulador.push(this.acumulador)
  }

  bifurca(comando){
    if(this.acumulador > 0){
      this.i = +comando
    }
  }

  bifurcaNeg(comando){
    if(this.acumulador<0){
      this.i = +comando
    }
  }

  bifurcaCero(comando){
    if(this.acumulador=0){
      this.i = +comando
    }
  }

}
