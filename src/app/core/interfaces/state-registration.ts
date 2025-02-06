import { AddressDto, AreaType, DependencyAdministrationType } from "./college";


export interface StateRegistrationDto {
  id: number;
  code: number;
  name: string;
  email: string;
  phone: string;
  address: AddressDto;
  localization: AreaType;
  dependencyAdministration: DependencyAdministrationType;
}
