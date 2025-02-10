import { DisciplineDto } from "./discipline-dto";
import { TeacherDisciplineClassroomDto } from "./teacher-dto";

export interface FullClassroomDto {
    id?: number;
    name: string;
    collegeId?: number;
    classroomDailySchedule: ClassroomDailyScheduleDto;
    teacherDisciplineClassrooms: TeacherDisciplineClassroomDto[];
}

export interface ClassroomDto {
  id?: number;
  name: string;
  collegeId?: number;
}

  export interface ClassroomDailyScheduleDto {
    id?: number;
    mondayClasses: number;
    tuesdayClasses: number;
    wednesdayClasses: number;
    thursdayClasses: number;
    fridayClasses: number;
    saturdayClasses: number;
    sundayClasses: number;
  }
  
