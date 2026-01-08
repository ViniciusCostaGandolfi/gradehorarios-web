
export type RoleUser = 'ROLE_USER' | 'ROLE_ADMIN';



export interface UserBaseDto {
    name: string;
    email: string;
    role: RoleUser;
}

export interface UserDto extends UserBaseDto {
    id: number;
}