import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myForExample]'
})
//Diretiva imitando o ngFor, porem feita por nós
export class ForDirective implements OnInit {

  //Captura o que tem depois da String "em" passada como parametro
  @Input('myForExampleEm') numbers: number[];

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
  }

  ngOnInit(): void {

    for (let contador of this.numbers) {
      //Altera a estrutura da pagina colocando mais elementos
      //Deixa o valor implicito da variavel "contador" la na tag escolhida 
      this.container.createEmbeddedView(this.template, { $implicit: contador });
    }
  }

}
