import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_At' })
  updateAt: string;
  @DeleteDateColumn({ name: 'delete_At' })
  deleteAt: string;
}
