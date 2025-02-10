import { Preference } from "./preference";

export interface TeacherDto {
  id: number;
  name: string;
  preferDoubleClass: Preference;
  preferFirstClass: Preference;
  preferLastClass: Preference;
  collegeId?: number;
}

export interface FullTeacherDto {
    id?: number;
    name: string;
    preferDoubleClass: Preference;
    preferFirstClass: Preference;
    preferLastClass: Preference;
    collegeId?: number;
    teacherAvailability: TeacherAvailabilityDto;
}

export const dayTranslations: Record<string, string> = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo'
};

  
export interface TeacherAvailabilityDto {
  id?: number;
  monday: Preference;
  tuesday: Preference;
  wednesday: Preference;
  thursday: Preference;
  friday: Preference;
  saturday: Preference;
  sunday: Preference;
}

export interface TeacherDisciplineClassroomDto {
  id?: number;
  classroomId: number;
  teacherId: number;
  disciplineId: number;
  totalClasses: number;
}