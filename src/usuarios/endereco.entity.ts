import { UsuarioEntity } from 'src/usuarios/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('enderecos')
export class EnderecoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tipo_endereco', length: 100, nullable: false })
  tipo_endereco: string;

  @Column({ name: 'cep', length: 15, nullable: false })
  cep: string;

  @Column({ name: 'rua', length: 255, nullable: false })
  rua: string;

  @Column({ name: 'numero', length: 10, nullable: null })
  numero: string;

  @Column({ name: 'complemento', length: 100 })
  complemento: string;

  @Column({ name: 'cidade', length: 70, nullable: null })
  cidade: string;

  @Column({ name: 'estado', length: 70, nullable: null })
  estado: string;

  @ManyToOne(() => UsuarioEntity, (usuarioEntity) => usuarioEntity.endereco, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  usuario: UsuarioEntity;
}
