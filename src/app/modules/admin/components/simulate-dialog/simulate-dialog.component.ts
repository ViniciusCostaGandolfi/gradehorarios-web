import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FullCollegeDto } from '../../../../core/interfaces/college';
import { TimetableSolverService } from '../../../../core/services/timetable-solver.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-simulate-dialog',
  templateUrl: './simulate-dialog.component.html',
  styleUrls: ['./simulate-dialog.component.scss']
})
export class SimulateDialogComponent implements OnInit {

  canSimule: boolean = false;
  countdown: number = 1;
  pix = '00020126510014br.gov.bcb.pix0111490142028300214Grade Horarios5204000053039865802BR5923VINICIUS COSTA GANDOLFI6007LIMEIRA62290525Ip7kOeR33jC1GpoGbC9rZU6FI63046ACA'

  constructor(
    private readonly dialogRef: MatDialogRef<SimulateDialogComponent>,
    private readonly snackbar: MatSnackBar,
    private readonly timetableSolverService: TimetableSolverService,
    @Inject(MAT_DIALOG_DATA) public data: { college: FullCollegeDto }
  ) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown === 0) {
        this.canSimule = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  onSubmit(): void {

    if (this.data.college) {
      this.timetableSolverService.resolve(this.data.college.id).subscribe({
        next: () => {
          this.snackbar.open('A escola foi simulada com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open(`Erro ao simular. ${error}`, 'Fechar', { duration: 3000 });
        }
      })
    }
    
  }

  copyPixCode(): void {
    navigator.clipboard.writeText(this.pix).then(() => {
      this.snackbar.open('Código Pix copiado para a área de transferência!', 'Fechar', { duration: 3000 });
    }).catch(err => {
      this.snackbar.open('Erro ao copiar o código Pix. Tente novamente.', 'Fechar', { duration: 3000 });
      console.error('Erro ao copiar Pix:', err);
    });
  }
  
}
