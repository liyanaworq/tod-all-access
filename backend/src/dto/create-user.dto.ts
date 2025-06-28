export class CreateUserDto {
  name: string;
  email: string;
  password:string;
  role?: 'USER' | 'PIC' | 'FD' | 'ADMIN';
  companyId?: string;
}
