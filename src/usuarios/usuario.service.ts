import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios: UsuarioEntity[] = [];

  async saveUser(user: UsuarioEntity) {
    await this.usuarios.push(user);
  }

  async getUser() {
    return await this.usuarios;
  }

  async emailVerify(email: string) {
    const userExist = this.usuarios.find((e) => e.email === email);
    return !!userExist;
  }
}
