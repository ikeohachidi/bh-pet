export default interface Product {
	uuid: string;
	categoryUUID: string;
	title: string;
	price: string;
	description: string;
	metadata: unknown;
}