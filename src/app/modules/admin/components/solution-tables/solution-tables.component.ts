import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SolutionDto, SolutionClassroomWeekDay, SolutionTeacherWeekDay } from '../../../../core/interfaces/solution-dto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { dayTranslations } from '../../../../core/interfaces/teacher-dto';


@Component({
  selector: 'app-solution-tables',
  templateUrl: './solution-tables.component.html',
  styleUrl: './solution-tables.component.scss'
})
export class SolutionTablesComponent {

  @Input()
  solution: SolutionDto | null = null;

  displayedColumns: string[] = ['classIndex', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  dayTranslations = dayTranslations

  @ViewChild('pdfClassrooms', { static: false }) pdfClassrooms!: ElementRef;

  @ViewChild('pdfTeachers', { static: false }) pdfTeachers!: ElementRef;



  async exportClassroomsToPDF(): Promise<void> {
    if (!this.solution) return;
  
    const content = this.pdfClassrooms.nativeElement;
    console.log('Exportando PDF...');
  
    const canvas = await html2canvas(content, { scale: 2 });
    const imageData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
    const imgWidth = 280;
    const pageHeight = 210; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    let position = 10;
    pdf.addImage(imageData, 'PNG', 10, position, imgWidth, imgHeight);
  
    while (position + imgHeight > pageHeight) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imageData, 'PNG', 10, position, imgWidth, imgHeight);
    }
  
    pdf.save('turmas.pdf');
  }
  
  
  async exportTeachersToPDF(): Promise<void> {
    if (!this.solution) return;
  
    const content = this.pdfTeachers.nativeElement;
    console.log('Exportando PDF...');
  
    const canvas = await html2canvas(content, { scale: 2 });
    const imageData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
    const imgWidth = 280;
    const pageHeight = 210; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    let position = 10;
    pdf.addImage(imageData, 'PNG', 10, position, imgWidth, imgHeight);
  
    while (position + imgHeight > pageHeight) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imageData, 'PNG', 10, position, imgWidth, imgHeight);
    }
  
    pdf.save('professores.pdf');
  }
  

}
