import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = userData.email;
    usuarioEntity.name = userData.name;
    usuarioEntity.password = userData.password;
    usuarioEntity.id = uuid();

    this.usuarioService.Create(usuarioEntity);
    return {
      message: `Usuário ${userData.name} criado com sucesso`,
      id: usuarioEntity.id,
    };
  }

  @Get('/get-all')
  async ListUsers() {
    const userList = await this.usuarioService.ListUser();

    return userList;
  }
  @Get('/get-by-id/:id')
  async GetById(@Param('id') id: string) {
    const userList = await this.usuarioService.GetById(id);

    return userList;
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    await this.usuarioService.Update(id, userData);

    return {
      user: userData.name,
      email: userData.email,
      message: `Usuário atualizado.`,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usuarioService.Delete(id);

    return {
      id: id,
      message: `Usuário removido com sucesso`,
    };
  }
}
