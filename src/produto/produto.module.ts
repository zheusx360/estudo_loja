import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
  imports: [UsuarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProductModule {}
