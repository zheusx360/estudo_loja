import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UsuarioService } from './usuario.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const novoUsuario = await this.usuarioService.criaUsuario(userData);

    return {
      message: `Usuário ${novoUsuario['name']} criado com sucesso`,
      id: novoUsuario['id'],
    };
  }

  @Get('/get-all')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('lista_de_usuarios')
  async ListUsers() {
    const userList = await this.usuarioService.listarUsuario();

    return userList;
  }
  @Get('/get-by-id/:id')
  async GetById(@Param('id') id: string) {
    const userList = await this.usuarioService.usuarioId(id);

    return userList;
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    await this.usuarioService.updateUsuario(id, userData);

    return {
      user: userData.name,
      email: userData.email,
      message: `Usuário atualizado.`,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    await this.usuarioService.deleteUsuario(id);

    return {
      id: id,
      message: `Usuário removido com sucesso`,
    };
  }
}
