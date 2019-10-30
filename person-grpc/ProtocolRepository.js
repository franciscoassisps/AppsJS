module.exports = class StickCall {
    constructor(props){
        this.props = new props.Soap()
        this.signature = {
            url:process.env.PALITAGEM_ADDRESS,
            name: 'StickCall'
        }
    }
    async sticker() {
        const options: any = {
            method: 'PUT',
            data: {
                protocolo,
                palito,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${process.env.PALITAGEM_ADDRESS}/palitagem/v1/palitar`,
        };
        try {
            const palitagemResult = await axios(options);
            this.logger.verbose(`Finalizando a operacao palitar`, 'ChamadaPalitagem');
            this.logger.debug(`Finalizando a operacao palitar`, 'ChamadaPalitagem', { data: palitagemResult });
            return palitagemResult;
        } catch (error) {
            this.logger.verbose(`Erro na operacao palitar`, 'ChamadaPalitagem');
            this.logger.debug(`Erro na operacao palitar`, 'ChamadaPalitagem', { data: error });
            throw new GenericException('999', 'Erro na operação palitar.', 500);
        }
    }
}
