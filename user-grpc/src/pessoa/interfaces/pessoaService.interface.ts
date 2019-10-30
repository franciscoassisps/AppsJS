import { Observable } from 'rxjs';

export interface PessoaService {
    findOne(data: { cpf: string }): Observable<any>;
  }
