import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UpdateProductDTO } from './dto/updateProduct';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CreateProductDTO) {
    const produtoCadastrado =
      await this.produtoService.criaProduto(dadosProduto);

    return {
      message: `Produto ${dadosProduto.nome} criado com sucesso`,
      id: produtoCadastrado.id,
    };
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('lista_de_produtos')
  @Get()
  async listaTodos() {
    return this.produtoService.listProduto();
  }
  @UseInterceptors(CacheInterceptor)
  @CacheKey('produto_por_id')
  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listById(@Param('id') id: string) {
    const produto = await this.produtoService.listById(id);

    return produto;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: UpdateProductDTO,
  ) {
    const produtoAlterado = await this.produtoService.updateProduto(
      id,
      dadosProduto,
    );

    console.log('Produto', produtoAlterado);

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deleteProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
