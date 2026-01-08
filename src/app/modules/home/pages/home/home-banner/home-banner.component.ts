import { Component } from '@angular/core';
import { mockLoginRegister } from '../../../../../core/mocks/default-routes';
import { gradeHorariosServices } from '../../../../../core/mocks/gradehorarios-services';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss'
})
export class HomeBannerComponent {
  public mockLoginRegister = mockLoginRegister
    public gradeHorariosServices = gradeHorariosServices
        public creditDetails = [
          { text: 'Cada crédito equivale a 1 rodada para criar horários.' },
          { text: 'Sem limites: compre quantos créditos forem necessários.' },
          { text: 'Validade ilimitada: seus créditos não expiram.' },
          { text: 'Ideal para escolas pequenas e grandes.' },
          { text: 'Ganhe 1 crédito grátis ao criar sua conta.' },
          { text: 'Experimente sem custos com problemas menores.' }
        ];
  
}
