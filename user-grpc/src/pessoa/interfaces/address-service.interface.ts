export interface AddressService {
    findOne(data: { id: number }): Promise<any>;
}