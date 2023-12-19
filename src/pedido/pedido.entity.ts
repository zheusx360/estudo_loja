import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';
import { UsuarioEntity } from '../usuarios/usuario.entity';
import { ItemPedidoEntity } from './itempedido.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', nullable: false })
  valorTotal: number;

  @Column({ name: 'status', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_At' })
  updateAt: string;
  @DeleteDateColumn({ name: 'delete_At' })
  deleteAt: string;

  @ManyToOne(() => UsuarioEntity, (usuarioEntity) => usuarioEntity.pedidos)
  usuario: UsuarioEntity;

  @OneToMany(
    () => ItemPedidoEntity,
    (itemPedidoEntity) => itemPedidoEntity.pedido,
    {
      cascade: true,
    },
  )
  itensPedido: ItemPedidoEntity[];
}
