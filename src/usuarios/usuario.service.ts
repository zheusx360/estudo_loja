import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dto/ListUser.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async ListUser() {
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

  async GetById(id: string) {
    const user = await this.usuarioRepository.findBy({ id });
    return user;
  }

  async Create(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async Update(id: string, usuarioEntity: UpdateUserDTO) {
    await this.usuarioRepository.update(id, usuarioEntity);
  }

  async Delete(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
