import { Injectable } from '@nestjs/common';
import { UpdateProductDTO } from './dto/updateProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { ListProductDTO } from './dto/ListProduct';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}
  async criaProduto(dadosProduto: CreateProductDTO) {
    const produtoEntity = new ProdutoEntity();

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.usuarioId = dadosProduto.usuarioId;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.imagens = dadosProduto.imagens;

    return await this.produtoRepository.save(produtoEntity);
  }

  async listProduto() {
    const product = await this.produtoRepository.find();
    const productList = product.map(
      (prod) =>
        new ListProductDTO(
          prod.id,
          prod.usuarioId,
          prod.nome,
          prod.valor,
          prod.quantidadeDisponivel,
          prod.descricao,
          prod.categoria,
          prod.caracteristicas,
          prod.imagens,
        ),
    );
    return productList;
  }

  async updateProduto(id: string, produto: UpdateProductDTO) {
    await this.produtoRepository.update(id, produto);
  }

  async deleteProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
