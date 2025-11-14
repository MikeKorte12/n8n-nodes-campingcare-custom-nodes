export const API_BASE_URL = 'https://api.camping.care/v21';

export const API_ENDPOINTS = {
	ADMINISTRATIONS: '/administrations',
	FIELDS: '/fields',
	FIELDS_FORMS: '/fields/forms',
	ACCOMMODATIONS: '/accommodations',
	CHANNELS: '/channels',
	CODES: '/codes',
	CONTACTS: '/contacts',
	RESERVATIONS: '/reservations',
	PRICE_CALCULATION: '/price_calculation',
	TIMEZONES: '/timezones',
	WEBHOOKS: '/webhooks',
	WEBHOOKS_EVENTS: '/webhooks/events',
	INVOICES: '/invoices',
	PAYMENTS: '/payments',
} as const;

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

export const RESOURCES = {
	ACCOMMODATIONS: 'accommodations',
	ADMINISTRATIONS: 'administrations',
	CONTACTS: 'contacts',
	PRICE_CALCULATION: 'priceCalculation',
	RESERVATIONS: 'reservations',
	TIMEZONES: 'timezones',
} as const;

export const OPERATIONS = {
	GET_ACCOMMODATION: 'getAccommodation',
	GET_ACCOMMODATIONS: 'getAccommodations',
	ADD_ACCOMMODATION: 'addAccommodation',

	GET_ADMINISTRATION: 'getAdministration',
	GET_ADMINISTRATIONS: 'getAdministrations',
	AGE_TABLES: 'ageTables',

	GET_CONTACT: 'getContact',
	GET_CONTACTS: 'getContacts',
	ADD_CONTACT: 'addContact',

	CALCULATE_PRICE: 'calculatePrice',

	GET_RESERVATION: 'getReservation',
	GET_RESERVATIONS: 'getReservations',
	CREATE_RESERVATION: 'createReservation',

	GET_TIMEZONES: 'getTimezones',
} as const;
