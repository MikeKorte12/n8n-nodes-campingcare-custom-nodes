import type { INodeType, INodeTypeDescription, ILoadOptionsFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

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
					{
						name: 'Reservations API',
						value: 'reservations',
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
									meta: '={{ $parameter["extraFields"]?.field?.filter(f => f.value !== "" && f.value !== undefined)?.map(f => ({ key: f.key, value: f.value })) || [] }}',
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create Reservation',
						value: 'createReservations',
						description:
							'Create a new reservation with optional forced rows or existing contact ID',
						action: 'Create a reservation',
						routing: {
							request: {
								method: 'POST',
								url: '/reservations',
								body: {
									accommodation_id: '={{ $parameter["accommodationId"] }}',
									arrival: '={{ $parameter["arrival"] }}',
									departure: '={{ $parameter["departure"] }}',
									persons: '={{ $parameter["persons"] || 1 }}',
									contact_id: '={{ $parameter["contactId"] || undefined }}',
									force: true,
									forced_rows:
										'={{ $parameter["forced_rows"].row?.map(r => ({type: r.type,description: r.description,amount: Number(r.amount),total: Number(r.total),data: ""})) || [] }}',
									co_travelers:
										'={{ $parameter["co_travelers"].row2?.map(traveler => ({first_name: traveler.first_name,last_name: traveler.last_name,gender: traveler.gender,birthday: traveler.birthday,country_origin: traveler.country_origin,})) || [] }}',
								},
							},
						},
					},
				],
				displayOptions: {
					show: {
						resource: ['reservations'],
					},
				},
				default: 'createReservations',
			},

			{
				displayName: 'Administration ID',
				name: 'administrationId',
				type: 'string',
				default: '',
				placeholder: 'e.g. 1234',
				description: 'The unique ID of the administration to retrieve',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration'],
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				placeholder: 'e.g. 1234567',
				description: 'The unique ID of the contact to retrieve',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact'],
					},
				},
			},

			{
				displayName: 'Count',
				name: 'count',
				type: 'boolean',
				default: false,
				description: 'Whether to return only the count',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations', 'contacts'],
						operation: ['getAdministrations', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Accommodations',
				name: 'get_accommodations',
				type: 'boolean',
				default: false,
				description: 'Whether to include accommodations in the response',
				noDataExpression: true,
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
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
					},
				},
			},
			{
				displayName: 'Get Invoice Payments',
				name: 'get_invoice_payments',
				type: 'boolean',
				default: false,
				description: 'Whether to include invoice payments in the response',
				noDataExpression: true,
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
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Media',
				name: 'get_media',
				type: 'boolean',
				default: false,
				description: 'Whether to include media files in the response',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
					},
				},
			},
			{
				displayName: 'Get Meta',
				name: 'get_meta',
				type: 'boolean',
				default: false,
				description: 'Whether to include meta information',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations', 'contacts'],
						operation: ['getAdministration', 'getAdministrations', 'getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Reservation Payment Terms',
				name: 'get_reservation_payment_terms',
				type: 'boolean',
				default: false,
				description: 'Whether to include reservation payment terms in the response',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get Reservations',
				name: 'get_reservations',
				type: 'boolean',
				default: false,
				description: 'Whether to include reservations in the response',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Get VAT Tables',
				name: 'get_vat_tables',
				type: 'boolean',
				default: false,
				description: 'Whether to include VAT tables in the response',
				noDataExpression: true,
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
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration', 'getAdministrations'],
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
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations', 'contacts'],
						operation: ['getAdministrations', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of records to skip',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations', 'contacts'],
						operation: ['getAdministrations', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'string',
				default: '',
				placeholder: 'asc or desc',
				description: 'Sorting order',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations', 'contacts'],
						operation: ['getAdministrations', 'getContacts'],
					},
				},
			},
			{
				displayName: 'Order By',
				name: 'order_by',
				type: 'string',
				default: '',
				placeholder: 'Order by "ID" or "name"',
				description: 'Field to order results by',
				noDataExpression: true,
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
				placeholder: 'Search by "ID" or "name"',
				description: 'Search term to filter results',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['administrations', 'contacts'],
						operation: ['getAdministrations', 'getContacts'],
					},
				},
			},

			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				placeholder: 'John',
				description: 'Given name of the contact',
				noDataExpression: true,
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
				description: 'Family name or surname of the contact',
				noDataExpression: true,
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
				description: 'Gender or type of contact',
				noDataExpression: true,
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
				description: 'Date of birth in YYYY-MM-DD format',
				noDataExpression: true,
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
				placeholder: 'e.g. Passport',
				description: 'Type of identification document',
				noDataExpression: true,
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
				placeholder: 'e.g. A1234567',
				description: 'Number of the identification document',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Country of Origin Name or ID',
				name: 'country_origin',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getCountriesFromRules',
				},
				default: '',
				noDataExpression: true,
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
				description: 'Primary email address of the contact',
				noDataExpression: true,
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
				placeholder: 'e.g. +31 20 123 4567',
				description: 'Landline phone number (with country code if applicable)',
				noDataExpression: true,
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
				placeholder: 'e.g. +44 7700 900123',
				description: 'Mobile phone number (with country code)',
				noDataExpression: true,
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
				placeholder: 'e.g. Main Street',
				description: "Street name of the contact's address",
				noDataExpression: true,
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
				placeholder: 'e.g. 42A',
				description: 'House or building number',
				noDataExpression: true,
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
				placeholder: 'e.g. Amsterdam',
				description: 'City or town name',
				noDataExpression: true,
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
				placeholder: 'e.g. North Holland',
				description: 'State, province, or region',
				noDataExpression: true,
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
				placeholder: 'e.g. 1011AB',
				description: 'Postal or ZIP code',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Country Name or ID',
				name: 'country',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getCountriesFromRules',
				},
				default: '',
				noDataExpression: true,
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
				placeholder: 'e.g. Example Ltd.',
				description: 'Name of the company or organization',
				noDataExpression: true,
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
				placeholder: 'e.g. NL123456789B01',
				description: "Company's VAT or tax identification number",
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
			},
			{
				displayName: 'Extra Fields',
				name: 'extraFields',
				type: 'fixedCollection',
				placeholder: 'Enter a value',
				description: 'Custom extra fields linked to the contact',
				noDataExpression: true,
				typeOptions: {
					multipleValues: true,
				},
				default: {
					field: [],
				},
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['addContact'],
					},
				},
				options: [
					{
						displayName: 'Field',
						name: 'field',
						values: [
							{
								displayName: 'Extra Field Name or ID',
								name: 'key',
								type: 'options',
								description:
									'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
								noDataExpression: true,
								typeOptions: {
									loadOptionsMethod: 'getContactFields',
								},
								default: undefined,
							},
							{
								displayName: 'Extra Field Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: 'Enter a value',
								description: 'Value to assign to this extra field',
								noDataExpression: true,
							},
						],
					},
				],
			},
			{
				displayName: 'Accommodation Name or ID',
				name: 'accommodationId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getAccommodations',
				},
				default: '',
				required: true,
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
			},
			{
				displayName: 'Arrival Date',
				name: 'arrival',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Arrival date for the reservation',
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
			},
			{
				displayName: 'Departure Date',
				name: 'departure',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Departure date for the reservation',
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
			},
			{
				displayName: 'Persons',
				name: 'persons',
				type: 'number',
				default: 1,
				description: 'Number of persons in the reservation',
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				placeholder: 'e.g. 12345',
				description: 'Existing contact ID in Camping.care (optional)',
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
			},
			{
				displayName: 'Forced Rows',
				name: 'forced_rows',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add forced row',
				default: {},
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
				options: [
					{
						name: 'row',
						displayName: 'Row',
						values: [
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Product Price', value: 'product_price' },
									{ name: 'Product Guest', value: 'product_guest' },
									{ name: 'Product ID', value: 'product_id' },
								],
								default: 'product_price',
								description: 'Type of the forced row',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								placeholder: 'Pitch description',
								description: 'Description of the row',
							},
							{
								displayName: 'Amount',
								name: 'amount',
								type: 'number',
								default: 1,
								description: 'Quantity',
							},
							{
								displayName: 'Total',
								name: 'total',
								type: 'number',
								default: 0,
								description: 'Total price for this row',
							},
						],
					},
				],
			},
			{
				displayName: 'Co-Travelers',
				name: 'co_travelers',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add co-traveler',
				default: {},
				displayOptions: {
					show: {
						resource: ['reservations'],
						operation: ['createReservations'],
					},
				},
				options: [
					{
						name: 'row2',
						displayName: 'Row2',
						values: [
							{
								displayName: 'Birthday',
								name: 'birthday',
								type: 'string',
								default: '',
								placeholder: 'YYYY-MM-DD',
								description: 'Birthday of the traveler',
							},
							{
								displayName: 'Country of Origin Name or ID',
								name: 'country_origin',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getCountriesFromRules',
								},
								default: '',
								description:
									'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
							},
							{
								displayName: 'First Name',
								name: 'first_name',
								type: 'string',
								default: '',
								placeholder: 'First Name',
								description: 'First Name of the traveler',
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
								description: 'Gender of the traveler',
							},
							{
								displayName: 'Last Name',
								name: 'last_name',
								type: 'string',
								default: '',
								placeholder: 'Last Name',
								description: 'Last Name of the traveler',
							},
						],
					},
				],
			},
		],
	};
	methods = {
		loadOptions: {
			async getContactFields(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('campingCareApi');

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://api.camping.care/v21/fields',
					qs: {
						type: 'contact',
						status: 'active',
						read_only: 'true',
					},
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${credentials.apiKey}`,
					},
				});

				const excludeFields = [
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
				];

				return response
					.filter((field: any) => !excludeFields.includes(field.key))
					.map((field: any) => ({
						name: field.name,
						value: field.key,
					}));
			},

			getCountriesFromRules: async function (this: ILoadOptionsFunctions) {
				try {
					const credentials = await this.getCredentials('campingCareApi');

					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: 'https://api.camping.care/v21/fields',
						qs: { type: 'contact', status: 'active' },
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${credentials.apiKey}`,
						},
					});

					const postcodeField = response.find((field: any) =>
						field.rules?.some((r: any) => r.type === 'regex_country'),
					);

					if (!postcodeField) {
						return [];
					}

					const rule = postcodeField.rules.find((r: any) => r.type === 'regex_country');

					if (!rule?.countries?.length) {
						return [];
					}

					const countries = rule.countries.map((c: any) => ({
						name: c.country_name,
						value: c.country,
					}));

					return countries.sort((a: any, b: any) => a.name.localeCompare(b.name));
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load country list',
					});
				}
			},
			async getAccommodations(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('campingCareApi');

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://api.camping.care/v21/accommodations',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${credentials.apiKey}`,
					},
				});

				return response
					.filter((a: any) => a.status === 'active')
					.map((a: any) => ({
						name: a.name || `Accommodation ${a.id}`,
						value: a.id,
					}));
			},
		},
	};
}
