import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Address } from './interfaces/address.interface';
import { AddressById } from './interfaces/address-by-id.interface';

@Controller()
export class AddressesController {

  @GrpcMethod('AddressService')
  findOne(data: AddressById): Address {
    const items: Address[] = [
      { id: 1, estado: 'SP', cidade: 'São Paulo' },
      { id: 2, estado: 'RJ', cidade: 'Rio de Janeiro' },
      { id: 3, estado: 'RS', cidade: 'Porto Alegre' },
    ];

    return items.find(obj => obj.id === data.id);

  }

}