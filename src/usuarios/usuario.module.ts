import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailValidatorUnique } from './validation/validate-email-unique.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [EmailValidatorUnique, UsuarioService],
})
export class UsuarioModule {}
