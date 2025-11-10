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
	status?: string;
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

export interface Channel {
	id: string;
	name: string;
	icon?: string;
}

export interface Code {
	id: string;
	code: string;
	name?: string;
}

export interface WebhookEvent {
	event: string;
	name?: string;
	label?: string;
	value?: string;
}

export interface CoTravelerField {
	key: string;
	name: string;
	type?: string;
}

export interface WebhookResponse {
	id?: string;
	webhook_id?: string;
	secret_key?: string;
	data?: {
		id?: string;
	};
}
