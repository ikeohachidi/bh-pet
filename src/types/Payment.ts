export enum PaymentType {
	CARD = "credit_card",
	CASH = "cash_on_delivery",
	BANK = "bank_transfer"
}
export default interface Payment {
	uuid?: string;
	type: PaymentType;
	details?: PaymentConfig;
}

export class CardPayment {
	ccv = 0;
	number = 0;
	expire_date = '';
	holder_name = '';
}

export class CashPayment {
	first_name = '';
	last_name = '';
	address = '';
}

export class BankPayment {
	iban = '';
	name = '';
	swift = '';
}

export type PaymentConfig = CardPayment | CashPayment | BankPayment;

export class ShippingDetails {
	first_name = '';
	last_name = '';
	address1 = '';
	address2 = '';
	city = '';
	state = '';
	zip_code = '';
	country = '';
}