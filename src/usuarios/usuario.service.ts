import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dto/ListUser.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listarUsuario() {
    const userData = await this.usuarioRepository.find();
    const userList = userData.map(
      (user) => new ListUserDTO(user.id, user.name),
    );

    return userList;
  }

  async emailVerify(email: string) {
    const emailExist = await this.usuarioRepository.countBy({ email });
    return !!emailExist;
  }

  async usuarioId(id: string) {
    const user = await this.usuarioRepository.findBy({ id });
    return user;
  }

  async criaUsuario(usuarioData: CreateUserDTO) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.email = usuarioData.email;
    usuarioEntity.name = usuarioData.name;
    usuarioEntity.password = usuarioData.password;
    usuarioEntity.endereco = usuarioData.endereco;

    return this.usuarioRepository.save(usuarioEntity);
  }

  async updateUsuario(id: string, usuarioEntity: UpdateUserDTO) {
    await this.usuarioRepository.update(id, usuarioEntity);
  }

  async deleteUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
