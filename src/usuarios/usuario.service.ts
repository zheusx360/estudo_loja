import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateUsuario(id: string, novosDados: UpdateUserDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('Usuario não foi encontrado');
    }

    Object.assign(usuario, novosDados);

    return this.usuarioRepository.save(usuario);
  }

  async deleteUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }
}
