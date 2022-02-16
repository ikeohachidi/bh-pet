import Category from "./Category";

export default interface Product {
	uuid: string;
	category_uuid: string;
	title: string;
	price: string;
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