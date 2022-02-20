import Category from "./Category";

export default interface Product {
	uuid: string;
	category_uuid: string;
	title: string;
	price: number;
	description: string;
	metadata: {
		brand: string;
		image: string;
	};
	created_at: string;
	updated_at: string;
	deleted_at: string;
	category: Category;
}

export interface CartItem {
	productUUID: string;
	amount: number;
}