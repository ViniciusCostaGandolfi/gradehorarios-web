import { Component } from '@angular/core';
import { treeMonthFree } from '../../../../../core/mocks/thee-month-free';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';


@Component({
  selector: 'app-home-pricing',
  templateUrl: './home-pricing.component.html',
  styleUrl: './home-pricing.component.scss'
})
export class HomePricingComponent {
    public gradeHorariosServices = gradeHorariosServices
    public treeMonthFree = treeMonthFree
    public creditDetails = [
      { text: 'Cada crédito equivale a 1 rodada para criar horários.' },
      { text: 'Sem limites: compre quantos créditos forem necessários.' },
      { text: 'Validade ilimitada: seus créditos não expiram.' },
      { text: 'Ideal para escolas pequenas e grandes.' },
      { text: 'Ganhe 1 crédito grátis ao criar sua conta.' },
      { text: 'Experimente sem custos com problemas menores.' }
    ];
    
}
