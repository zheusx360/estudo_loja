import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailValidator } from '../validation/validate-email-unique.validator';

export class UpdateUserDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @EmailValidator({ message: 'Já existe usuário com esse email' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve conter o minimo de 6 caracteres' })
  @IsOptional()
  password: string;
}
