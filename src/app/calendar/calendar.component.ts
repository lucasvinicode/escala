import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  dataAtual: Date = new Date();
  diasCalendario: Date[] = [];
  diasDaSemana: string[] = [];
  itens: string[] = [];
  
  ngOnInit() {
    this.openDialog();
  }

  constructor(
    public dialog: MatDialog
  ){}

  construirCalendario() {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiaDaSemana = 0; // domingo
    const ultimoDiaDaSemana = 6; // sábado

    // Vai subtraindo -1 até chegarmos no primeiro dia da semana
    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    // Vai somando +1 até chegarmos no último dia da semana
    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
      
    this.diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    this.itens = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
      
    this.diasCalendario = [];
    }
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.diasCalendario.push(new Date(data.getTime()));
    }
  }

  openDialog(): void {
    this.diasDaSemana = []
    this.diasCalendario = []
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      height: '300px',
      position: {
        top: '50px', // Define a distância do topo em pixels
        left: '35%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.date)
      this.dataAtual = new Date(result.date);
      this.dataAtual.setMonth(this.dataAtual.getMonth());
      this.diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
      this.diasCalendario = [];
      this.construirCalendario()
      this.sanitizeNames(result.names)
      console.log(this.diasCalendario)
    });
  } 

  countDaysOfLastMonth() {
    return this.diasCalendario.filter(x => this.dataAtual.getMonth()-1 === x.getMonth()).length
  }

  sanitizeNames(str: string){
    this.itens = str.split(',');
  }

  styles = [
    "rgb(150, 187, 239)",
    "rgb(171, 111, 119)",
    "rgb(186, 40, 25)",
    "rgb(119, 102, 144)",
    "rgb(86, 143, 116)",
    "rgb(40, 64, 92)",
    "rgb(123, 203, 142)",
    "rgb(135, 83, 122)"
  ]

  month(){
    switch (this.dataAtual.getMonth()) {
      case 0:
        return  'Janeiro'
      case 1:
        return  'Fevereiro'
      case 2:
        return  'Março'
      case 3:
        return  'Abril'
      case 4:
        return  'Maio'
      case 5:
        return  'Junho'
      case 6:
        return  'Julho'
      case 7:
        return  'Agosto'
      case 8:
        return  'Setembro'
      case 9:
        return  'Outubro'
      case 10:
        return  'Novembro'
      case 11:
        return 'Dezembro'
    }

    return ''
  }

  downloadPdf(){
    var doc = new jsPDF('l')
    var elementHTML = document.querySelector("#printTable") as HTMLElement;
    console.log(elementHTML)
    let fileName = this.month() + '-' + this.dataAtual.getFullYear()
    doc.html(elementHTML, {
      callback: function(docPDF) {
        docPDF.save(fileName);
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650
    });
  }

}
