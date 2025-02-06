import { ClassroomDto } from "./classroom-dto";
import { DisciplineDto } from "./discipline-dto";
import { SolutionDto } from "./solution-dto";
import { TeacherDto } from "./teacher-dto";

export interface CollegeDto {
  id?: number;
  code: number;
  name: string;
}

export interface FullCollegeDto {
  id: number;
  code: number;
  name: string;
  disciplines: DisciplineDto[];
  teachers: TeacherDto[];
  classrooms: ClassroomDto[];
  solutions: SolutionDto[];
}

export interface AddressDto {
  id?: number;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  streetName: string;
  streetNumber: string;
  formattedAddress?: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
}

export enum AreaType {
  RURAL = "RURAL",
  URBAN = "URBAN",
  UNKNOWN = "UNKNOWN",
}

export enum DependencyAdministrationType {
  FEDERAL = "FEDERAL",
  STATE = "STATE",
  MUNICIPAL = "MUNICIPAL",
  PRIVATE = "PRIVATE",
}



