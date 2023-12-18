import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_caracteristica')
export class ProdutoCaracteristicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', length: 100, nullable: false })
  nome: string;
  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produto: ProdutoEntity;
}
