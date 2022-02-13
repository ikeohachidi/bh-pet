export enum OrderStatus {
	OPEN = 'open',
	PENDING = 'pending',
	PAID = 'paid',
	SHIPPED = 'shipped',
	CANCELLED = 'cancelled'
}

export interface Order {
	uuid: string;
	status: OrderStatus | string;
}