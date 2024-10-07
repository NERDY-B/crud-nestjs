import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly name: string;

  readonly email: string;

  readonly password: string;
}
