// API Constants
export const API_BASE_URL = 'https://api.camping.care/v21';

export const API_ENDPOINTS = {
	FIELDS: '/fields',
	FIELDS_FORMS: '/fields/forms',
	ACCOMMODATIONS: '/accommodations',
	CONTACTS: '/contacts',
	RESERVATIONS: '/reservations',
	PRICE_CALCULATION: '/price_calculation',
	WEBHOOKS: '/webhooks',
	WEBHOOKS_EVENTS: '/webhooks/events',
} as const;

// Excluded contact fields for metadata
export const EXCLUDED_CONTACT_FIELDS = [
	'gender',
	'first_name',
	'last_name',
	'address',
	'address_number',
	'birthday',
	'city',
	'company',
	'country',
	'country_origin',
	'email',
	'id_nr',
	'phone',
	'zipcode',
	'phone_mobile',
	'vat_number',
	'state',
	'id_type',
	'created',
	'create_date',
] as const;
