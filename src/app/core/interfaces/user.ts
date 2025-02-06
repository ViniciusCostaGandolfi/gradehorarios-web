import { CollegeDto } from "./college"

export interface UserDto {
    email: string
    name: string
    document: string
    phone: string
    colleges: CollegeDto[]

}


export interface TokenUserDto {
    iss: string;
    user: UserDto;
    exp: number;
}