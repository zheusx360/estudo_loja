import { BadRequestException, Injectable } from '@nestjs/common';
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

  private getById(id: string) {
    const user = this.usuarios.find((user) => user.id === id);

    if (!user) {
      throw new BadRequestException('Id informado não existe', {
        cause: new Error(),
      });
    }

    return user;
  }

  async updateUser(id: string, userData: Partial<UsuarioEntity>) {
    const getUser = this.getById(id);

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      getUser[key] = value;
    });

    return getUser;
  }

  async deleteUser(id: string) {
    const getUser = this.getById(id);

    this.usuarios = this.usuarios.filter((user) => user.id !== id);

    return getUser;
  }
}
