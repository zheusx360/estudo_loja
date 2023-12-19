import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidatorUnique implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any): Promise<boolean> {
    const emailExist = await this.usuarioService.emailVerify(value);
    return !emailExist;
  }
}

export const EmailValidator = (validationOptions: ValidationOptions) => {
  return (objeto: object, properties: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: properties,
      options: validationOptions,
      constraints: [],
      validator: EmailValidatorUnique,
    });
  };
};
