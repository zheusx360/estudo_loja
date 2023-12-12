class ListaCaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}

class ListImageProductDTO {
  url: string;
  descricao: string;
}

export class ListProductDTO {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  categoria: string;
  caracteristicas: ListaCaracteristicaProdutoDTO[];
  imagens: ListImageProductDTO[];
}
