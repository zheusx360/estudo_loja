import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { UpdateProductDTO } from './dto/updateProduct';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CreateProductDTO) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;

    const produtoCadastrado = this.produtoRepository.salva(produto);
    return produtoCadastrado;
  }

  @Get()
  async listaTodos() {
    return this.produtoRepository.listaTodos();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: UpdateProductDTO,
  ) {
    const produtoAlterado = await this.produtoRepository.atualiza(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
