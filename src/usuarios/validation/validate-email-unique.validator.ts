import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidatorUnique implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any, {}): Promise<boolean> {
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
