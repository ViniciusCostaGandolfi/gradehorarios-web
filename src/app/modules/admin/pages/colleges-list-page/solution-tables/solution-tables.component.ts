import { Component, Input, OnInit } from '@angular/core';
import { SolutionDto, SolutionClassroomWeekDay, SolutionTeacherWeekDay } from '../../../../../core/interfaces/solution-dto';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-solution-tables',
  templateUrl: './solution-tables.component.html',
  styleUrl: './solution-tables.component.scss'
})
export class SolutionTablesComponent implements OnInit {

  @Input()
  solution: SolutionDto | null = null;

  tableType = new FormControl<'classroom' | 'teacher'>('classroom');

  selectedClassroomId: number | null = null;

  selectedTeacherId: number | null = null;

  displayedColumns: string[] = ['classIndex', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  ngOnInit(): void {
      if (this.solution) {
        this.selectedClassroomId = this.solution.input.classrooms[0].id;
        this.selectedTeacherId = this.solution.input.teachers[0].id;
      }
  }

  getSelectedClassroomGrade() {
    if (!this.solution || !this.selectedClassroomId) {
      return [];
    }
    return this.solution.output.solutionClassrooms
      .filter(classroomSolution => classroomSolution.classroom.id === this.selectedClassroomId)
      .flatMap(classroomSolution => classroomSolution.grade);
  }

  getSelectedTeacherGrade() {
    if (!this.solution || !this.selectedTeacherId) {
      return [];
    }
    return this.solution.output.solutionTeachers
      .filter(teacherSolution => teacherSolution.teacher.id === this.selectedTeacherId)
      .flatMap(teacherSolution => teacherSolution.grade);
  }


  /** 📌 Exporta a grade das TURMAS para um arquivo Excel */
  exportClassroomsToExcel(): void {
    if (!this.solution) {
      return;
    }

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    this.solution.output.solutionClassrooms.forEach(classroomSolution => {
      const worksheet = XLSX.utils.json_to_sheet(this.formatClassroomGrade(classroomSolution));
      XLSX.utils.book_append_sheet(workbook, worksheet, classroomSolution.classroom.name);
    });

    XLSX.writeFile(workbook, `solutionClassrooms.xlsx`);
  }

  /** 📌 Exporta a grade dos PROFESSORES para um arquivo Excel */
  exportTeachersToExcel(): void {
    if (!this.solution) {
      return;
    }

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    this.solution.output.solutionTeachers.forEach(teacherSolution => {
      const worksheet = XLSX.utils.json_to_sheet(this.formatTeacherGrade(teacherSolution));
      XLSX.utils.book_append_sheet(workbook, worksheet, teacherSolution.teacher.name);
    });

    XLSX.writeFile(workbook, `solutionTeachers.xlsx`);
  }

  /** 📌 Formata os dados da turma para exportação */
  private formatClassroomGrade(classroomSolution: SolutionClassroomWeekDay): any[] {
    return classroomSolution.grade.map(entry => ({
      Aula: entry.classIndex,
      Segunda: entry.mondayTeacher?.name || '-',
      Terça: entry.tuesdayTeacher?.name || '-',
      Quarta: entry.wednesdayTeacher?.name || '-',
      Quinta: entry.thursdayTeacher?.name || '-',
      Sexta: entry.fridayTeacher?.name || '-',
      Sábado: entry.saturdayTeacher?.name || '-',
      Domingo: entry.sundayTeacher?.name || '-'
    }));
  }

  /** 📌 Formata os dados do professor para exportação */
  private formatTeacherGrade(teacherSolution: SolutionTeacherWeekDay): any[] {
    return teacherSolution.grade.map(entry => ({
      Aula: entry.classIndex,
      Segunda: entry.mondayClassroom?.name || '-',
      Terça: entry.tuesdayClassroom?.name || '-',
      Quarta: entry.wednesdayClassroom?.name || '-',
      Quinta: entry.thursdayClassroom?.name || '-',
      Sexta: entry.fridayClassroom?.name || '-',
      Sábado: entry.saturdayClassroom?.name || '-',
      Domingo: entry.sundayClassroom?.name || '-'
    }));
  }

}
