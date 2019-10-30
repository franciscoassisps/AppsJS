const soap = require('soap')

module.exports = class Soap {
    constructor(props) {
        this.soap = props.soap || soap
        this.logger = props.logger || console
    }

    async request(options = {}) {
        const { url, operation, payload, name } = options
        try {
            this.logger.log(`Executing ${name} : operation ${operation}`)
            const client = await this.soap.createClientAsync(url)
            const operationFunction = client[operation]
            if (!operationFunction) {
                throw new Error('Operation does not exists')
            }
            const response = await operationFunction(payload)
            this.logger.log(response.data)
            return response
        } catch (error) {
            this.logger.error(`${name}:${error.message}`, error.stack)
            throw error
        }
    }

}