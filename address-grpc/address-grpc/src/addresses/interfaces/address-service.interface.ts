import { Observable } from 'rxjs';

export interface AddressService {
    findOne(data: { id: number }): Observable<any>;
}