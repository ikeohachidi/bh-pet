import Product from "./Product";
import User from "./User";

export enum OrderStatus {
	OPEN = 'open',
	PENDING = 'pending payment',
	PAID = 'paid',
	SHIPPED = 'shipped',
	CANCELLED = 'canceled'
}

export default interface Order {
	uuid: string;
	order_status: {
		created_at: string;
		title: OrderStatus;
		updated_at: string;
		uuid: string;
	}[];
	amount: number;
	created_at: string;
	delivery_fee: number;
	shipped_at: string;
	updated_at: string;
	user: User;
	products: Product[];
}