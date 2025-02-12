import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SolutionDto, SolutionClassroomWeekDay, SolutionTeacherWeekDay, TimetableClassroomWeekDay } from '../../../../core/interfaces/solution-dto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { dayTranslations } from '../../../../core/interfaces/teacher-dto';
import * as XLSX from 'xlsx';


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

    
      const titleCanvas = await html2canvas(titleElement, { scale: 1 });
      const tableCanvas = await html2canvas(tableElement, { scale: 2 });
  
      const titleImage = titleCanvas.toDataURL('image/png');
      const tableImage = tableCanvas.toDataURL('image/png');
  
      if (i > 0) {
        pdf.addPage();
      }
  
      const imgWidth = 280;
      const titleHeight = 25;
      const tableHeight = (tableCanvas.height * imgWidth) / tableCanvas.width;
  
      pdf.addImage(titleImage, 'PNG', 10, 10, imgWidth, titleHeight);
      pdf.addImage(tableImage, 'PNG', 10, 40, imgWidth, tableHeight);
    }

    this.exportClassroomsToExcel()
    pdf.save(`turmas-${this.sanitizeFileName(this.solution.input.name)}.pdf`);
  
    this.isLoading = false;
  }
  exportClassroomsToExcel(): void {
    if (!this.solution) return;

    this.isLoading = true;
  
    const workbook = XLSX.utils.book_new();
  
    this.solution.output.solutionClassrooms.forEach(classroomSolution => {
      const data = classroomSolution.grade.map(timetable => ([
        timetable.classIndex,
        timetable.mondayTeacher?.name || '-',
        timetable.tuesdayTeacher?.name || '-',
        timetable.wednesdayTeacher?.name || '-',
        timetable.thursdayTeacher?.name || '-',
        timetable.fridayTeacher?.name || '-',
        timetable.saturdayTeacher?.name || '-',
        timetable.sundayTeacher?.name || '-'
      ]));
  
      const worksheet = XLSX.utils.aoa_to_sheet([
        [
          'Aula',
          this.dayTranslations['monday'],
          this.dayTranslations['tuesday'],
          this.dayTranslations['wednesday'],
          this.dayTranslations['thursday'],
          this.dayTranslations['friday'],
          this.dayTranslations['saturday'],
          this.dayTranslations['sunday']
        ],
        ...data
      ]);
  
      const wscols = Array(8).fill({ wch: 15 });
      worksheet['!cols'] = wscols;
  
      XLSX.utils.book_append_sheet(workbook, worksheet, classroomSolution.classroom.name);
    });
  
    XLSX.writeFile(workbook, `turmas-${this.sanitizeFileName(this.solution.input.name)}.xlsx`);

    this.isLoading = false;
  }
  
  exportTeachersToExcel(): void {
    if (!this.solution) return;
  
    this.isLoading = true;

    const workbook = XLSX.utils.book_new();
  
    this.solution.output.solutionTeachers.forEach(teacherSolution => {
      const data = teacherSolution.grade.map(timetable => ([
        timetable.classIndex,
        timetable.mondayClassroom?.name || '-',
        timetable.tuesdayClassroom?.name || '-',
        timetable.wednesdayClassroom?.name || '-',
        timetable.thursdayClassroom?.name || '-',
        timetable.fridayClassroom?.name || '-',
        timetable.saturdayClassroom?.name || '-',
        timetable.sundayClassroom?.name || '-'
      ]));
  
      const worksheet = XLSX.utils.aoa_to_sheet([
        [
          'Aula',
          this.dayTranslations['monday'],
          this.dayTranslations['tuesday'],
          this.dayTranslations['wednesday'],
          this.dayTranslations['thursday'],
          this.dayTranslations['friday'],
          this.dayTranslations['saturday'],
          this.dayTranslations['sunday']
        ],
        ...data
      ]);
  
      const wscols = Array(8).fill({ wch: 15 });
      worksheet['!cols'] = wscols;
  
      XLSX.utils.book_append_sheet(workbook, worksheet, teacherSolution.teacher.name);
    });
  
    XLSX.writeFile(workbook, `professores-${this.sanitizeFileName(this.solution.input.name)}.xlsx`);



    this.isLoading = false;
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
  
  
      const titleCanvas = await html2canvas(titleElement, { scale: 1 });
      const tableCanvas = await html2canvas(tableElement, { scale: 2 });
    
      const titleImage = titleCanvas.toDataURL('image/png');
      const tableImage = tableCanvas.toDataURL('image/png');
  
      if (i > 0) {
        pdf.addPage();
      }
  
      const imgWidth = 280;
      const titleHeight = 25;
      const tableHeight = (tableCanvas.height * imgWidth) / tableCanvas.width;
  
      pdf.addImage(titleImage, 'PNG', 10, 10, imgWidth, titleHeight);
      pdf.addImage(tableImage, 'PNG', 10, 40, imgWidth, tableHeight);
    }
  
    this.isLoading = false;
    pdf.save(`professores-${this.sanitizeFileName(this.solution.input.name)}.pdf`);
  }


  getDisplayedColumnsForClassroom(classroomSolution: SolutionClassroomWeekDay): string[] {
    const baseColumns = ['classIndex', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    const hasSaturdayClasses = classroomSolution.grade.some(timetable => timetable.saturdayTeacher);
    const hasSundayClasses = classroomSolution.grade.some(timetable => timetable.sundayTeacher);

    if (hasSaturdayClasses) baseColumns.push('saturday');
    if (hasSundayClasses) baseColumns.push('sunday');
    console.log(baseColumns)
    return baseColumns;
  }

  getDisplayedColumnsForTeacher(teacherSolution: SolutionTeacherWeekDay): string[] {
    const baseColumns = ['classIndex', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    const hasSaturdayClasses = teacherSolution.grade.some(timetable => timetable.saturdayClassroom);
    const hasSundayClasses = teacherSolution.grade.some(timetable => timetable.sundayClassroom);

    if (hasSaturdayClasses) baseColumns.push('saturday');
    if (hasSundayClasses) baseColumns.push('sunday');

    return baseColumns;
  }

  private sanitizeFileName(name: string): string {
    return name.replace(/[<>:"/\\|?*]+/g, '').replace(/\s+/g, '_');
  }

  
  
}
