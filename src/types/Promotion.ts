export default interface Promotion {
	uuid: string;
	title: string;
	content: string;
	metadata: {
		image: string;
		valid_to: string;
		valid_from: string;
	},
	created_at: string;
	updated_at: string;
}