import Product from "./Product";
import User from "./User";

export enum OrderStatus {
	OPEN = 'open',
	PENDING = 'pending',
	PAID = 'paid',
	SHIPPED = 'shipped',
	CANCELLED = 'cancelled'
}

export default interface Order {
	uuid: string;
	status: OrderStatus | string;
	amount: number;
	created_at: string;
	delivery_fee: number;
	shipped_at: string;
	updated_at: string;
	user: User;
	products: Product[];
}