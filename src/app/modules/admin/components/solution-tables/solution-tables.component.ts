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

  isLoading = false

  @ViewChild('pdfClassrooms', { static: false }) pdfClassrooms!: ElementRef;

  @ViewChild('pdfTeachers', { static: false }) pdfTeachers!: ElementRef;


  async exportClassroomsToPDF(): Promise<void> {
    if (!this.solution) return;
  
    this.isLoading = true;
    const content = this.pdfClassrooms.nativeElement;
    const sections = content.querySelectorAll('#table-content');
  
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
    for (let i = 0; i < sections.length; i++) {
      const sectionElement = sections[i] as HTMLElement;
      const titleElement = sectionElement.querySelector('h2') as HTMLElement;
      const tableElement = sectionElement.querySelector('table') as HTMLElement;
  
      if (!tableElement || !titleElement) continue;
  
      const titleContainer = document.createElement('div');
      titleContainer.style.display = 'flex';
      titleContainer.style.justifyContent = 'center';
      titleContainer.style.alignItems = 'center';
      titleContainer.style.padding = '10px';
      titleContainer.style.backgroundColor = 'white';
      titleContainer.style.width = '100%';
      titleContainer.style.fontSize = '20px';
      titleContainer.style.fontWeight = 'bold';
      titleContainer.textContent = titleElement.textContent || '';
  
      document.body.appendChild(titleContainer);
  
      const titleCanvas = await html2canvas(titleContainer, { scale: 3 });
      const tableCanvas = await html2canvas(tableElement, { scale: 2 });
  
      document.body.removeChild(titleContainer);
  
      const titleImage = titleCanvas.toDataURL('image/png');
      const tableImage = tableCanvas.toDataURL('image/png');
  
      if (i > 0) {
        pdf.addPage();
      }
  
      const imgWidth = 280;
      const titleHeight = 25;
      const tableHeight = (tableCanvas.height * imgWidth) / tableCanvas.width;
  
      pdf.addImage(titleImage, 'PNG', 10, 10, imgWidth - 20, titleHeight);
      pdf.addImage(tableImage, 'PNG', 10, 40, imgWidth, tableHeight);
    }
  
    this.isLoading = false;
    pdf.save('turmas.pdf');
  }
  
  
  async exportTeachersToPDF(): Promise<void> {
    if (!this.solution) return;
  
    this.isLoading = true;
    const content = this.pdfTeachers.nativeElement;
    const sections = content.querySelectorAll('#table-content');
  
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
    for (let i = 0; i < sections.length; i++) {
      const sectionElement = sections[i] as HTMLElement;
      const titleElement = sectionElement.querySelector('h2') as HTMLElement;
      const tableElement = sectionElement.querySelector('table') as HTMLElement;
  
      if (!tableElement || !titleElement) continue;
  
      const titleContainer = document.createElement('div');
      titleContainer.style.display = 'flex';
      titleContainer.style.justifyContent = 'center';
      titleContainer.style.alignItems = 'center';
      titleContainer.style.padding = '10px';
      titleContainer.style.backgroundColor = 'white';
      titleContainer.style.width = '100%';
      titleContainer.style.fontSize = '20px';
      titleContainer.style.fontWeight = 'bold';
      titleContainer.textContent = titleElement.textContent || '';
  
      document.body.appendChild(titleContainer);
  
      const titleCanvas = await html2canvas(titleContainer, { scale: 3 });
      const tableCanvas = await html2canvas(tableElement, { scale: 2 });
  
      document.body.removeChild(titleContainer);
  
      const titleImage = titleCanvas.toDataURL('image/png');
      const tableImage = tableCanvas.toDataURL('image/png');
  
      if (i > 0) {
        pdf.addPage();
      }
  
      const imgWidth = 280;
      const titleHeight = 25;
      const tableHeight = (tableCanvas.height * imgWidth) / tableCanvas.width;
  
      pdf.addImage(titleImage, 'PNG', 10, 10, imgWidth - 20, titleHeight);
      pdf.addImage(tableImage, 'PNG', 10, 40, imgWidth, tableHeight);
    }
  
    this.isLoading = false;
    pdf.save('professores.pdf');
  }
  
  
}
