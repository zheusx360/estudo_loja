import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EmailValidator } from '../validation/validate-email-unique.validator';
import { Type } from 'class-transformer';
import { UsuarioEntity } from '../usuario.entity';

// export class EnderecoDTO {
//   id: string;

//   @IsUUID(undefined, { message: 'ID de usuário inválido' })
//   userId: string;

//   @IsString()
//   @IsNotEmpty()
//   tipoEndereco: string;

//   @IsString()
//   @IsNotEmpty()
//   cep: string;

//   @IsString()
//   @IsNotEmpty()
//   rua: string;

//   @IsString()
//   @IsNotEmpty()
//   numero: string;

//   @IsString()
//   @IsNotEmpty()
//   complemento: string;

//   @IsString()
//   @IsNotEmpty()
//   cidade: string;

//   @IsString()
//   @IsNotEmpty()
//   estado: string;

//   usuario: UsuarioEntity;
// }

export class EnderecoDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Tipo Endereço não pode ser vazio' })
  tipo_endereco: string;
  @IsString()
  @IsNotEmpty({ message: 'Cep não pode ser vazio' })
  cep: string;
  @IsString()
  @IsNotEmpty({ message: 'Rua não pode ser vazio' })
  rua: string;
  @IsString()
  @IsNotEmpty({ message: 'Número não pode ser vazio' })
  numero: string;
  @IsString()
  @IsNotEmpty({ message: 'Complemento não pode ser vazio' })
  complemento: string;
  @IsString()
  @IsNotEmpty({ message: 'Cidade não pode ser vazio' })
  cidade: string;
  @IsString()
  @IsNotEmpty({ message: 'Estado não pode ser vazio' })
  estado: string;

  usuario: UsuarioEntity;
}

export class CreateUserDTO {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @EmailValidator({ message: 'Já existe usuário com esse email' })
  email: string;

  @MinLength(6, { message: 'A senha deve conter o minimo de 6 caracteres' })
  password: string;

  @ValidateNested()
  @IsArray()
  @IsNotEmpty({ message: 'Endereço não pode ser vazio' })
  @ArrayMinSize(1)
  @Type(() => EnderecoDTO)
  endereco: EnderecoDTO[];
}
