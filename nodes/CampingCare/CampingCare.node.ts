import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class CampingCare implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Camping Care',
		icon: 'file:campingcare.svg',
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

			// =================================
			// ADMINISTRATIONS
			// =================================
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

			// PARAMETERS: GET ADMINISTRATION
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
						operation: ['getAdministration'],
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
						operation: ['getAdministration'],
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
						operation: ['getAdministration'],
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
						operation: ['getAdministration'],
					},
				},
			},

			// PARAMETERS: GET ADMINISTRATIONS
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
				displayName: 'Get Meta',
				name: 'get_meta',
				type: 'boolean',
				default: false,
				description: 'Whether to include meta information in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
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
						operation: ['getAdministrations'],
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
						operation: ['getAdministrations'],
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
						operation: ['getAdministrations'],
					},
				},
			},
			{
				displayName: 'Get Accommodations',
				name: 'get_accommodations',
				type: 'boolean',
				default: false,
				description: 'Whether to include accommodation details in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministrations'],
					},
				},
			},

			// =================================
			// CONTACTS
			// =================================
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
									get_reservation_payment_terms: '={{ $parameter["get_reservation_payment_terms"] || undefined }}',
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
									get_reservation_payment_terms: '={{ $parameter["get_reservation_payment_terms"] || undefined }}',
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
								body: '={{ $json }}',
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

			// PARAMETERS: GET CONTACT
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
						operation: ['getContact'],
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
						operation: ['getContact'],
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
						resource: ['contacts'],
						operation: ['getContact'],
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
						operation: ['getContact'],
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
						operation: ['getContact'],
					},
				},
			},

			// PARAMETERS: GET CONTACTS
			{
				displayName: 'Get Meta',
				name: 'get_meta',
				type: 'boolean',
				default: false,
				description: 'Whether to include meta information in the response',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContacts'],
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
						operation: ['getContacts'],
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
						operation: ['getContacts'],
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
						operation: ['getContacts'],
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
						operation: ['getContacts'],
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
				description:
					'Order results by a specific field (e.g. name, created_at)',
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
		],
	};
}
