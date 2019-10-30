import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa/pessoa.controller';
import { PessoaModule } from './pessoa/pessoa.module';
// import { AppService } from './app.service';

@Module({
  imports: [PessoaModule],
  controllers: [PessoaController],
  // providers: [AppService],
})
export class AppModule {}
