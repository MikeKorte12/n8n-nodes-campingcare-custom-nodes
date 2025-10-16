import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class CampingCare implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Camping Care',
		icon: {
			light: 'file:campingcare.svg',
			dark: 'file:campingcaredark.svg',
		},
		name: 'campingCare',
		group: ['input'],
		version: 1,
		description: 'Node for interacting with the Camping Care API',
		defaults: {
			name: 'Camping Care',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'campingCareApi',
				required: true,
			},
		],
		usableAsTool: true,
		requestDefaults: {
			baseURL: 'https://api.camping.care/v21',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Administrations API',
						value: 'administrations',
					},
					{
						name: 'Contacts API',
						value: 'contacts',
					},
				],
				default: 'administrations',
				description: 'Select the resource to work with',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Administrations',
						value: 'getAdministrations',
						description: 'Retrieve a list of all administrations with optional filters',
						action: 'Get a list of administrations',
						routing: {
							request: {
								method: 'GET',
								url: '/administrations',
								qs: {
									search: '={{ $parameter["search"] || undefined }}',
									offset: '={{ $parameter["offset"] || undefined }}',
									limit: '={{ $parameter["limit"] || undefined }}',
									order: '={{ $parameter["order"] || undefined }}',
									count: '={{ $parameter["count"] || undefined }}',
									get_meta: '={{ $parameter["get_meta"] || undefined }}',
									get_age_tables: '={{ $parameter["get_age_tables"] || undefined }}',
									translations: '={{ $parameter["translations"] || undefined }}',
									get_media: '={{ $parameter["get_media"] || undefined }}',
									get_accommodations: '={{ $parameter["get_accommodations"] || undefined }}',
								},
							},
						},
					},
					{
						name: 'Get Administration',
						value: 'getAdministration',
						description: 'Retrieve details of a single administration by ID',
						action: 'Get a single administration',
						routing: {
							request: {
								method: 'GET',
								url: '=/administrations/{{$parameter["administrationId"]}}',
								qs: {
									get_meta: '={{ $parameter["get_meta"] || undefined }}',
									get_vat_tables: '={{ $parameter["get_vat_tables"] || undefined }}',
									get_age_tables: '={{ $parameter["get_age_tables"] || undefined }}',
									translations: '={{ $parameter["translations"] || undefined }}',
									get_media: '={{ $parameter["get_media"] || undefined }}',
								},
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['administrations'],
					},
				},
				default: 'getAdministrations',
			},

			{
				displayName: 'Administration ID',
				name: 'administrationId',
				type: 'string',
				default: '',
				placeholder: 'e.g. 1234',
				description: 'The unique ID of the administration to retrieve',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration'],
					},
				},
			},
			{
				displayName: 'Get Meta',
				name: 'get_meta',
				type: 'boolean',
				default: false,
				description: 'Whether to include meta information in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
					},
				},
			},
			{
				displayName: 'Get VAT Tables',
				name: 'get_vat_tables',
				type: 'boolean',
				default: false,
				description: 'Whether to include VAT tables in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration'],
					},
				},
			},
			{
				displayName: 'Get Age Tables',
				name: 'get_age_tables',
				type: 'boolean',
				default: false,
				description: 'Whether to include age tables in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
					},
				},
			},
			{
				displayName: 'Translations',
				name: 'translations',
				type: 'boolean',
				default: false,
				description: 'Whether to include translations in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
					},
				},
			},
			{
				displayName: 'Get Media',
				name: 'get_media',
				type: 'boolean',
				default: false,
				description: 'Whether to include media files in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
					},
				},
			},

			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				placeholder: 'Search by name',
				description: 'Search term to filter administrations',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: '',
				description: 'Number of records to skip (for pagination)',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'string',
				default: '',
				placeholder: 'e.g. desc or asc',
				description: 'Sorting order of the results',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
					},
				},
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'boolean',
				default: false,
				description: 'Whether to return only the count of administrations',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Contacts',
						value: 'getContacts',
						description: 'Retrieve a list of all contacts',
						action: 'Get a list of contacts',
						routing: {
							request: {
								method: 'GET',
								url: '/contacts',
								qs: {
									get_meta: '={{ $parameter["get_meta"] || undefined }}',
									get_reservations: '={{ $parameter["get_reservations"] || undefined }}',
									get_reservation_payment_terms:
										'={{ $parameter["get_reservation_payment_terms"] || undefined }}',
									get_invoices: '={{ $parameter["get_invoices"] || undefined }}',
									get_invoice_payments: '={{ $parameter["get_invoice_payments"] || undefined }}',
									offset: '={{ $parameter["offset"] || undefined }}',
									limit: '={{ $parameter["limit"] || undefined }}',
									count: '={{ $parameter["count"] || undefined }}',
									order: '={{ $parameter["order"] || undefined }}',
									order_by: '={{ $parameter["order_by"] || undefined }}',
									search: '={{ $parameter["search"] || undefined }}',
								},
							},
						},
					},
					{
						name: 'Get Contact',
						value: 'getContact',
						description: 'Retrieve details of a single contact by ID',
						action: 'Get a single contact',
						routing: {
							request: {
								method: 'GET',
								url: '=/contacts/{{$parameter["contactId"]}}',
								qs: {
									get_reservations: '={{ $parameter["get_reservations"] || undefined }}',
									get_invoices: '={{ $parameter["get_invoices"] || undefined }}',
									get_meta: '={{ $parameter["get_meta"] || undefined }}',
									get_reservation_payment_terms:
										'={{ $parameter["get_reservation_payment_terms"] || undefined }}',
									get_invoice_payments: '={{ $parameter["get_invoice_payments"] || undefined }}',
								},
							},
						},
					},
					{
						name: 'Add Contact',
						value: 'addContact',
						description: 'Add a new contact to the system',
						action: 'Add a new contact',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									first_name: '={{ $parameter["first_name"] || undefined }}',
									last_name: '={{ $parameter["last_name"] || undefined }}',
									gender: '={{ $parameter["gender"] || undefined }}',
									birthday: '={{ $parameter["birthday"] || undefined }}',
									id_type: '={{ $parameter["id_type"] || undefined }}',
									id_nr: '={{ $parameter["id_nr"] || undefined }}',
									country_origin: '={{ $parameter["country_origin"] || undefined }}',
									email: '={{ $parameter["email"] || undefined }}',
									phone: '={{ $parameter["phone"] || undefined }}',
									phone_mobile: '={{ $parameter["phone_mobile"] || undefined }}',
									address: '={{ $parameter["address"] || undefined }}',
									address_number: '={{ $parameter["address_number"] || undefined }}',
									city: '={{ $parameter["city"] || undefined }}',
									state: '={{ $parameter["state"] || undefined }}',
									zipcode: '={{ $parameter["zipcode"] || undefined }}',
									country: '={{ $parameter["country"] || undefined }}',
									company: '={{ $parameter["company"] || undefined }}',
									vat_number: '={{ $parameter["vat_number"] || undefined }}',
								},
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['contacts'],
					},
				},
				default: 'getContacts',
			},

			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				placeholder: 'e.g. 1234567',
				description: 'The unique ID of the contact to retrieve',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact'],
					},
				},
			},
			{
				displayName: 'Get Reservations',
				name: 'get_reservations',
				type: 'boolean',
				default: false,
				description: 'Whether to include reservations in the response',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Invoices',
				name: 'get_invoices',
				type: 'boolean',
				default: false,
				description: 'Whether to include invoices in the response',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Reservation Payment Terms',
				name: 'get_reservation_payment_terms',
				type: 'boolean',
				default: false,
				description: 'Whether to include reservation payment terms in the response',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Invoice Payments',
				name: 'get_invoice_payments',
				type: 'boolean',
				default: false,
				description: 'Whether to include invoice payments in the response',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},


			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: '',
				description: 'Number of records to skip (for pagination)',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
					},
				},
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'boolean',
				default: false,
				description: 'Whether to return only the count of contacts',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'string',
				default: '',
				placeholder: 'e.g. desc or asc',
				description: 'Sorting order of the results',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
					},
				},
			},
			{
				displayName: 'Order By',
				name: 'order_by',
				type: 'string',
				default: '',
				placeholder: 'Field to sort results by',
				description: 'Order results by a specific field (e.g. name, created_at)',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				placeholder: 'Search by email, name, etc.',
				description: 'Search term to filter contacts',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
					},
				},
			},

			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				placeholder: 'John',
				description: 'First name of the contact',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				placeholder: 'Doe',
				description: 'Last name of the contact',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'options',
				options: [
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Family', value: 'family' },
				],
				default: 'male',
				description: 'Gender of the contact',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Birthday',
				name: 'birthday',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Birthday of the contact',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'ID Type',
				name: 'id_type',
				type: 'string',
				default: '',
				placeholder: 'Passport',
				description: 'Type of identification',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'ID Number',
				name: 'id_nr',
				type: 'string',
				default: '',
				placeholder: 'A1234567',
				description: 'Identification number',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Country of Origin',
				name: 'country_origin',
				type: 'string',
				default: '',
				placeholder: 'Select country of origin',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'john.doe@example.com',
				description: 'Email address',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				placeholder: 'Enter your phone number',
				description: 'Phone number',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Mobile Phone',
				name: 'phone_mobile',
				type: 'string',
				default: '',
				placeholder: 'Enter your mobile number',
				description: 'Mobile phone number',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				placeholder: 'Main Street',
				description: 'Street address',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Address Number',
				name: 'address_number',
				type: 'string',
				default: '',
				placeholder: '123',
				description: 'Street number',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				placeholder: 'Enter city name',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				placeholder: 'Enter state or province',
				description: 'State/Province',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Zipcode',
				name: 'zipcode',
				type: 'string',
				default: '',
				placeholder: 'Enter postal code',
				description: 'Postal code',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				placeholder: 'Enter country name',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				placeholder: 'My Company B.V.',
				description: 'Company name',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'VAT Number',
				name: 'vat_number',
				type: 'string',
				default: '',
				placeholder: 'Enter VAT number',
				description: 'VAT identification number',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
		],
	};
}
