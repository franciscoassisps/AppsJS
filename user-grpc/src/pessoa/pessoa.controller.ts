import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { grpcClientOptions } from '../options/grpc-client.options';
import { PessoaById } from './interfaces/pessoaById.interfaces';
import { Pessoa } from './interfaces/pessoa.interface';
import { addressClientOptions } from 'src/options/address-client.options';
import { AddressService } from './interfaces/address-service.interface';

@Controller()
export class PessoaController implements OnModuleInit {
  @Client(addressClientOptions)
  private readonly client: ClientGrpc;

  private addressService: AddressService;

  onModuleInit() {
    this.addressService = this.client.getService<AddressService>('AddressService');
  }

  @Get(':cpf')
  execute(@Param('cpf') cpf) {
    return this.findOne({ cpf });
  }
  async findOne(data: PessoaById){
    const items: any[] = [
      { cpf: '1', name: 'John', idAddress: 1, idContact: 1 },
      { cpf: '2', name: 'Paulo', idAddress: 2, idContact: 2 },
    ];
    const result = items.find(({ cpf }) => cpf === data.cpf);
console.log ('Pessoa Controller - Find One');
    const address = await this.addressService.findOne({ id: result.idAddress });
    console.log ('Pessoa Controller - Address', address);
    result.idAddress = address;
    return result;
  }
}
