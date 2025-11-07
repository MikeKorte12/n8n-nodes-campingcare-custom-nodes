export interface ContactField {
	key: string;
	name: string;
	type: string;
	rules?: Array<{
		type: string;
		countries?: Array<{
			country: string;
			country_name: string;
		}>;
	}>;
}

export interface Country {
	country: string;
	country_name: string;
}

export interface Accommodation {
	id: string;
	name: string;
	type?: string;
}

export interface Administration {
	id: string;
	name: string;
	admin_id?: string;
}

export interface ApiResponse<T> {
	data: T;
	meta?: {
		total?: number;
		limit?: number;
		offset?: number;
	};
}
