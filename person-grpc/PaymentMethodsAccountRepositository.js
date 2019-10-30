module.exports = class AddPaymentMethodsAccountRepository {
    constructor(props) {
        this.props = new props.Soap()
        this.signature = {
            url: process.env.AUTOMATIC_DEBIT,
            name: 'AddPaymentMethodsAccountRepository'
        }

    }
    async getAccountPaymentMethods({ linha, bankCode, bankName, agency, account }) {
        const payload = {
            _xml: `<typ:AutoPayRequest xmlns:typ="http://telefonica.br/CustomerManagement/BillingAccountManagement/BillingAccountConfigurationManagement/BillingAccountConfiguration/v1/types">
            <typ:BankAccount>
                <typ:Bank>
                    <typ:bankCustomer xmlns:v11="http://telefonica.br/CommonBusiness/BaseTypesABE/BankCustomer/v1">
                        <v11:bankCode>${bankCode}</v11:bankCode>
                        <v11:bankName>${bankName}</v11:bankName>
                        <v11:branchCode>${agency}</v11:branchCode>
                        <v11:nameCurrentAccount>${account}</v11:nameCurrentAccount>
                        <v11:numberCurrentAccount>${account}</v11:numberCurrentAccount>
                    </typ:bankCustomer>
                </typ:Bank>
            </typ:BankAccount>
            <typ:network xmlns:v12="http://telefonica.br/Resource/ResourceABE/LogicalResourceABE/Network/v1">
                <v12:networkNumber>${linha}</v12:networkNumber>
            </typ:network>
        </typ:AutoPayRequest>`,
        };
        try {
            const response = await this.soap.request({
                ...this.signature,
                operation: 'autoPay',
                payload,
            })
        } catch (error) {
            this.logger.log(`Erro na consulta Debito Automatico`, 'AddPaymentMethodsAccountRepository', { data: error });
            throw error
        }
    }
}
