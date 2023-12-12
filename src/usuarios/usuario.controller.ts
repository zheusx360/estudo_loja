import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = userData.email;
    usuarioEntity.nome = userData.name;
    usuarioEntity.senha = userData.password;
    usuarioEntity.id = uuid();

    this.usuarioService.saveUser(usuarioEntity);
    return {
      message: `Usuário ${userData.name} criado com sucesso`,
      id: usuarioEntity.id,
    };
  }

  @Get()
  async ListUsers() {
    return this.usuarioService.getUser();
  }
}
