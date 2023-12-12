import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ProductModule } from './produto/produto.module';

@Module({
  imports: [
    UsuarioModule,
    ProductModule,
    // TypeOrmModule.forRootAsync({
    //   useClass: PostgresConfigService,
    //   inject: [PostgresConfigService],
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
