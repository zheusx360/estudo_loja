import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidatorUnique implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  // email-eh-unico.validator.ts

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste =
        await this.usuarioService.buscaPorEmail(value);

      return !usuarioComEmailExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }

      throw erro;
    }
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
