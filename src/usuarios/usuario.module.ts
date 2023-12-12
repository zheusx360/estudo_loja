import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { EmailValidatorUnique } from './validation/validate-email-unique.validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailValidatorUnique],
})
export class UsuarioModule {}
