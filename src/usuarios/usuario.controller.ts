import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

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

    this.usuarioService.saveUser(usuarioEntity);
    return {
      message: `Usuário ${userData.name} criado com sucesso`,
      id: usuarioEntity.id,
    };
  }

  @Get('/get-all')
  async ListUsers() {
    const getUsers = await this.usuarioService.getUser();
    const userList = getUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );

    return userList;
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    console.log('log');
    const updatedUser = await this.usuarioService.updateUser(id, userData);
    console.log('log2');

    return {
      user: updatedUser['name'],
      email: updatedUser['email'],
      message: `Usuário ${updatedUser['name']} atualizado.`,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    const userRemoved = await this.usuarioService.deleteUser(id);

    return {
      id: id,
      user: userRemoved['name'],
      message: `Usuário ${userRemoved['name']} removido com sucesso`,
    };
  }
}
