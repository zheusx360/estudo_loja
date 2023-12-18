import { Injectable } from '@nestjs/common';
import { UpdateProductDTO } from './dto/updateProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { ListProductDTO } from './dto/ListProduct';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}
  async Create(produto: ProdutoEntity) {
    await this.produtoRepository.save(produto);
  }

  async List() {
    const product = await this.produtoRepository.find();
    const productList = product.map(
      (prod) =>
        new ListProductDTO(
          prod.id,
          prod.usuarioId,
          prod.nome,
          prod.valor,
          prod.quantidade,
          prod.descricao,
          prod.categoria,
          prod.caracteristicas,
          prod.imagens,
        ),
    );
    return productList;
  }

  async Update(id: string, produto: UpdateProductDTO) {
    await this.produtoRepository.update(id, produto);
  }

  async Delete(id: string) {
    await this.produtoRepository.delete(id);
  }
}
