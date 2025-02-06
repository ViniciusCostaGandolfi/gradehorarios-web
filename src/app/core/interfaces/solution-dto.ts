import { ClassroomDailyScheduleDto, ClassroomDto, FullClassroomDto } from "./classroom-dto"
import { FullCollegeDto } from "./college";
import { TeacherDisciplineClassroomDto, TeacherDto } from "./teacher-dto";



export interface TimetableClassroomWeekDay {
  classIndex: number;
  mondayTeacher?: TeacherDto;
  tuesdayTeacher?: TeacherDto;
  wednesdayTeacher?: TeacherDto;
  thursdayTeacher?: TeacherDto;
  fridayTeacher?: TeacherDto;
  saturdayTeacher?: TeacherDto;
  sundayTeacher?: TeacherDto;
  classroomId: number;
}


export interface TimetableTeacherWeekDay {
  classIndex: number;
  mondayClassroom?: ClassroomDto;
  tuesdayClassroom?: ClassroomDto;
  wednesdayClassroom?: ClassroomDto;
  thursdayClassroom?: ClassroomDto;
  fridayClassroom?: ClassroomDto;
  saturdayClassroom?: ClassroomDto;
  sundayClassroom?: ClassroomDto;
  teacherId: number;
}


export interface SolutionClassroomWeekDay {
  classroom: ClassroomDto;
  grade: TimetableClassroomWeekDay[];
}


export interface SolutionTeacherWeekDay {
  teacher: TeacherDto;
  grade: TimetableTeacherWeekDay[];
}


export interface SolutionInputDto extends FullCollegeDto {
}


export interface SolutionOutputDto {
  solutionClassrooms: SolutionClassroomWeekDay[];
  solutionTeachers: SolutionTeacherWeekDay[];
}


export enum SolverStatus {
    SOLVED = 'SOLVED',
    OPTIMAL = 'OPTIMAL',
    FEASIBLE = 'FEASIBLE',
    INFEASIBLE = 'INFEASIBLE'
}
export interface SolutionDto {
  id: number;
  input: SolutionInputDto;
  output: SolutionOutputDto;
  status: SolverStatus;
  timeToSolve: number;
  createdAt: Date;
}
