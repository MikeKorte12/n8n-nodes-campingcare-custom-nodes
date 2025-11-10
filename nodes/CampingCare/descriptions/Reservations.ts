import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';
import { API_ENDPOINTS } from '../utils/constants';

export const reservationsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['reservations'] } },
		options: [
			{
			name: 'Get Reservations',
			value: 'getReservations',
			description: 'Get a list of reservations with various filtering options',
			action: 'Get reservations',
			routing: {
				request: {
					method: 'GET' as IHttpRequestMethods,
					url: API_ENDPOINTS.RESERVATIONS,
					qs: {
						count: '={{ $parameter["count"] || undefined }}',
							filter_root_meta: '={{ $parameter["filter_root_meta"] || undefined }}',
							get_contact: '={{ $parameter["get_contact"] || undefined }}',
							get_invoice_payment: '={{ $parameter["get_invoice_payment"] || undefined }}',
							get_invoice_payments: '={{ $parameter["get_invoice_payments"] || undefined }}',
							get_invoices: '={{ $parameter["get_invoices"] || undefined }}',
							get_meta: '={{ $parameter["get_meta"] || undefined }}',
							get_payment_terms: '={{ $parameter["get_payment_terms"] || undefined }}',
							get_rows: '={{ $parameter["get_rows"] || undefined }}',
							accommodation_id: '={{ $parameter["accommodation_id"] || undefined }}',
							admin_id: '={{ $parameter["admin_id"] || undefined }}',
							arrival: '={{ $parameter["arrival"] || undefined }}',
							arrival_operator: '={{ $parameter["arrival_operator"] || undefined }}',
							channel_id: '={{ $parameter["channel_id"] || undefined }}',
							contact_id: '={{ $parameter["contact_id"] || undefined }}',
							create_date: '={{ $parameter["create_date"] || undefined }}',
							create_date_operator: '={{ $parameter["create_date_operator"] || undefined }}',
							departure: '={{ $parameter["departure"] || undefined }}',
							departure_operator: '={{ $parameter["departure_operator"] || undefined }}',
							group_id: '={{ $parameter["group_id"] || undefined }}',
							last_modified: '={{ $parameter["last_modified"] || undefined }}',
							last_modified_operator: '={{ $parameter["last_modified_operator"] || undefined }}',
							limit: '={{ $parameter["limit"] || undefined }}',
							meta_key: '={{ $parameter["meta_key"] || undefined }}',
							meta_operator: '={{ $parameter["meta_operator"] || undefined }}',
							meta_value: '={{ $parameter["meta_value"] || undefined }}',
							offset: '={{ $parameter["offset"] || undefined }}',
							order: '={{ $parameter["order"] || undefined }}',
							order_by: '={{ $parameter["order_by"] || undefined }}',
							place_id: '={{ $parameter["place_id"] || undefined }}',
							status: '={{ $parameter["status"] || undefined }}',
							type: '={{ $parameter["type"] || undefined }}',
						},
					},
				},
			},
			{
				name: 'Get Reservation',
				value: 'getReservation',
				description: 'Get a single reservation by ID with optional additional data',
				action: 'Get reservation',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/reservations/{{$parameter["reservation_id"]}}',
						qs: {
							filter_root_meta: '={{ $parameter["filter_root_meta"] || undefined }}',
							get_booker: '={{ $parameter["get_booker"] || undefined }}',
							get_co_travelers: '={{ $parameter["get_co_travelers"] || undefined }}',
							get_contact: '={{ $parameter["get_contact"] || undefined }}',
							get_invoice_meta: '={{ $parameter["get_invoice_meta"] || undefined }}',
							get_invoice_payments: '={{ $parameter["get_invoice_payments"] || undefined }}',
							get_invoice_rowsfilter: '={{ $parameter["get_invoice_rowsfilter"] || undefined }}',
							get_invoices: '={{ $parameter["get_invoices"] || undefined }}',
							get_meta: '={{ $parameter["get_meta"] || undefined }}',
							get_payment_terms: '={{ $parameter["get_payment_terms"] || undefined }}',
							get_rows: '={{ $parameter["get_rows"] || undefined }}',
						},
					},
				},
			},
			{
				name: 'Create Reservation',
				value: 'createReservation',
				description: 'Create a reservation using different methods',
				action: 'Create reservation',
			},
		],
		default: 'getReservations',
	},

	// Create Reservation Method Selection
	{
		displayName: 'Creation Method',
		name: 'creationMethod',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
			},
		},
		options: [
			{
				name: 'Using Price Calculation with ID and Hash',
				value: 'withCalculation',
				description:
					'Using this method you should use the price calculation api first. In the price calculation api you can first add the options etc using the Add options method from the Price Calculation API.',
			},
			// {
			// 	name: 'Using Start and End Date',
			// 	value: 'withDates',
			// 	description:
			// 		'If you use this method the price calculation is integrated and used while creating the reservation directly',
			// },
			{
				name: 'Force with Own Data',
				value: 'forceWithData',
				description:
					'It is possible to force your own reservation. This means it does not rely on any camping.care calculation.',
			},
		],
		default: 'withCalculation',
	},

	// Reservation ID for Get Reservation
	{
		displayName: 'Reservation ID',
		name: 'reservation_id',
		required: true,
		type: 'string' as NodePropertyTypes,
		description: 'The unique ID of the reservation you want to retrieve',
		placeholder: '1234567',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservation'] },
		},
	},

	// === GET RESERVATIONS PARAMETERS ===
	{
		displayName: 'Count',
		name: 'count',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to return only the total count of reservations instead of full details',
		default: false,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Filter Root Meta',
		name: 'filter_root_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include only reservations with root meta information',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Booker',
		name: 'get_booker',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include booker details of the reservation(s)',
		default: false,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Co Travelers',
		name: 'get_co_travelers',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include co-traveler details of the reservation(s)',
		default: false,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Contact',
		name: 'get_contact',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include contact details of the reservation(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Invoice Meta',
		name: 'get_invoice_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include invoice meta of the reservation(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Invoice Payment',
		name: 'get_invoice_payment',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include invoice payment of the reservation(s)',
		default: false,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Get Invoice Payments',
		name: 'get_invoice_payments',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include invoice payments of the reservation(s)',
		default: false,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Invoice Rowsfilter',
		name: 'get_invoice_rowsfilter',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include invoice rows filter of the reservation(s)',
		default: false,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Invoices',
		name: 'get_invoices',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include invoice data of the reservation(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Meta',
		name: 'get_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include meta data of the reservation(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Payment Terms',
		name: 'get_payment_terms',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include payment term data of the reservation(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Rows',
		name: 'get_rows',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include rows data of the reservation(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},

	// Filter Parameters for Get Reservations
	{
		displayName: 'Accommodation Name or ID',
		name: 'accommodation_id',
		type: 'options' as NodePropertyTypes,
		typeOptions: {
			loadOptionsMethod: 'getAccommodations',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Admin ID',
		name: 'admin_id',
		type: 'string' as NodePropertyTypes,
		description: '**OTA only:** Filter by administration ID',
		placeholder: '1234',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Arrival Date',
		name: 'arrival',
		type: 'string' as NodePropertyTypes,
		description:
			'Filter by arrival date. Can be a single date (YYYY-MM-DD) or an array [fromDate, endDate].',
		placeholder: '2025-05-15',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Arrival Operator',
		name: 'arrival_operator',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		description: 'Operator to use with arrival date',
		options: [
			{ name: '— None —', value: '' },
			{ name: '=', value: '=' },
			{ name: '>', value: '>' },
			{ name: '>=', value: '>=' },
			{ name: '<', value: '<' },
			{ name: '<=', value: '<=' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Channel',
		name: 'channel_id',
		type: 'options' as NodePropertyTypes,
		description: 'Select a channel',
		default: '',
		typeOptions: { loadOptionsMethod: 'getChannels' },
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by contact ID',
		placeholder: '123456',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Create Date',
		name: 'create_date',
		type: 'string' as NodePropertyTypes,
		description:
			'Filter by creation date. Can be a single date (YYYY-MM-DD) or an array [fromDate, endDate].',
		placeholder: '2025-01-01',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Create Date Operator',
		name: 'create_date_operator',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		description: 'Operator to use with create date',
		options: [
			{ name: '— None —', value: '' },
			{ name: '=', value: '=' },
			{ name: '>', value: '>' },
			{ name: '>=', value: '>=' },
			{ name: '<', value: '<' },
			{ name: '<=', value: '<=' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Departure Date',
		name: 'departure',
		type: 'string' as NodePropertyTypes,
		description:
			'Filter by departure date. Can be a single date (YYYY-MM-DD) or an array [fromDate, endDate].',
		placeholder: '2025-05-22',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Departure Operator',
		name: 'departure_operator',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		description: 'Operator to use with departure date',
		options: [
			{ name: '— None —', value: '' },
			{ name: '=', value: '=' },
			{ name: '>', value: '>' },
			{ name: '>=', value: '>=' },
			{ name: '<', value: '<' },
			{ name: '<=', value: '<=' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Group ID',
		name: 'group_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by group ID',
		placeholder: '789',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Last Modified',
		name: 'last_modified',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by last modified date',
		placeholder: '2025-01-01',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Last Modified Operator',
		name: 'last_modified_operator',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		description: 'Operator to use with last modified date',
		options: [
			{ name: '— None —', value: '' },
			{ name: '=', value: '=' },
			{ name: '>', value: '>' },
			{ name: '>=', value: '>=' },
			{ name: '<', value: '<' },
			{ name: '<=', value: '<=' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number' as NodePropertyTypes,
		description: 'Limit for pagination (Default 10, Max 30)',
		placeholder: '10',
		typeOptions: { maxValue: 30 },
		default: 10,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Meta Key',
		name: 'meta_key',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by a specific meta key',
		placeholder: 'custom_field',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Meta Operator',
		name: 'meta_operator',
		type: 'string' as NodePropertyTypes,
		description: 'Operator to use with meta key (e.g., =, >, <)',
		placeholder: '=',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Meta Value',
		name: 'meta_value',
		type: 'string' as NodePropertyTypes,
		description: 'Value to match for the specified meta key',
		placeholder: 'value',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		description: 'Offset for pagination',
		placeholder: '0',
		typeOptions: { minValue: 0 },
		default: 0,
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'options' as NodePropertyTypes,
		description: 'Sort order: ASC or DESC',
		options: [
			{ name: '— None —', value: '' },
			{ name: 'ASC', value: 'asc' },
			{ name: 'DESC', value: 'desc' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Order By',
		name: 'order_by',
		type: 'options' as NodePropertyTypes,
		description: 'Sort by field: id, last_modified, arrival, departure',
		options: [
			{ name: '— None —', value: '' },
			{ name: 'ID', value: 'id' },
			{ name: 'Last Modified', value: 'last_modified' },
			{ name: 'Arrival', value: 'arrival' },
			{ name: 'Departure', value: 'departure' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Place ID',
		name: 'place_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by place ID',
		placeholder: '456',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options' as NodePropertyTypes,
		description: 'Filter by status: pending, option, confirmed, checkedin, checkedout, deleted',
		options: [
			{ name: '— None —', value: '' },
			{ name: 'Pending', value: 'pending' },
			{ name: 'Option', value: 'option' },
			{ name: 'Confirmed', value: 'confirmed' },
			{ name: 'Checkedin', value: 'checkedin' },
			{ name: 'Checkedout', value: 'checkedout' },
			{ name: 'Deleted', value: 'deleted' },
		],
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string' as NodePropertyTypes,
		description: 'Type of reservation (e.g., group)',
		placeholder: 'group',
		default: '',
		displayOptions: {
			show: { resource: ['reservations'], operation: ['getReservations'] },
		},
	},

	// === CREATE RESERVATION PARAMETERS ===

	// Common parameters for all creation methods
	{
		displayName: 'Accommodation Name or ID',
		name: 'create_accommodation_id',
		type: 'options' as NodePropertyTypes,
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getAccommodations',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
			},
		},
		routing: {
			request: {
				method: 'POST' as IHttpRequestMethods,
				url: API_ENDPOINTS.RESERVATIONS,
				body: {
					accommodation_id: '={{ $parameter["create_accommodation_id"] }}',
				},
			},
		},
	},

	// Method 1: Using Price Calculation with ID and Hash
	{
		displayName: 'Calculation ID',
		name: 'calculation_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		placeholder: '98765',
		description: 'The calculation ID returned from the Price Calculation API',
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
				creationMethod: ['withCalculation'],
			},
		},
		routing: {
			request: {
				body: {
					calculation_id: '={{ $parameter["calculation_id"] }}',
				},
			},
		},
	},
	{
		displayName: 'Calculation Draft ID',
		name: 'calculation_draft_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		placeholder: '123456',
		description: 'The draft ID returned from the Price Calculation API',
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
				creationMethod: ['withCalculation'],
			},
		},
		routing: {
			request: {
				body: {
					calculation_draft_id: '={{ $parameter["calculation_draft_id"] }}',
				},
			},
		},
	},

	// Method 2: Using Start and End Date
	{
		displayName: 'Arrival Date',
		name: 'create_arrival',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Arrival date for the booking (format: YYYY-MM-DD)',
		placeholder: '2025-05-15',
		default: '',
		typeOptions: {
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '^\\d{4}-\\d{2}-\\d{2}$',
						errorMessage: 'Date must be in YYYY-MM-DD format',
					},
				},
			],
		},
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
				creationMethod: ['withDates', 'forceWithData'],
			},
		},
		routing: {
			request: {
				body: {
					arrival: '={{ $parameter["create_arrival"] }}',
				},
			},
		},
	},
	{
		displayName: 'Departure Date',
		name: 'create_departure',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		placeholder: '2025-05-22',
		description: 'Departure date for the booking (format: YYYY-MM-DD)',
		typeOptions: {
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '^\\d{4}-\\d{2}-\\d{2}$',
						errorMessage: 'Date must be in YYYY-MM-DD format',
					},
				},
			],
		},
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
				creationMethod: ['withDates', 'forceWithData'],
			},
		},
		routing: {
			request: {
				body: {
					departure: '={{ $parameter["create_departure"] }}',
				},
			},
		},
	},
	{
		displayName: 'Number of Persons',
		name: 'create_persons',
		type: 'number' as NodePropertyTypes,
		default: 1,
		required: true,
		placeholder: '2',
		description: 'Number of persons staying in the accommodation',
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
				creationMethod: ['withDates', 'forceWithData'],
			},
		},
		routing: {
			request: {
				body: {
					persons: '={{ $parameter["create_persons"] }}',
				},
			},
		},
	},

	// Method 3: Force with Own Data
	{
		displayName: 'Forced Rows',
		name: 'forced_rows',
		type: 'fixedCollection' as NodePropertyTypes,
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Row',
		default: {
			row: [
				{
					type: 'product_price',
					description: 'Description',
					amount: 1,
					total: 0,
				},
			],
		},
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
				creationMethod: ['forceWithData'],
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
						type: 'options' as NodePropertyTypes,
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
						type: 'string' as NodePropertyTypes,
						default: 'Description',
						placeholder: 'Accommodation rental',
						description: 'Description of the row',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number' as NodePropertyTypes,
						default: 1,
						placeholder: '1',
						description: 'Quantity',
					},
					{
						displayName: 'Total',
						name: 'total',
						type: 'number' as NodePropertyTypes,
						default: 0,
						placeholder: '100.00',
						description: 'Total price for this row',
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					force: true,
					forced_rows:
						'={{ $parameter["forced_rows"].row?.map(r => ({type: r.type,description: r.description,amount: Number(r.amount),total: Number(r.total),data: ""})) || [] }}',
				},
			},
		},
	},

	// Common optional parameters for Create Reservation
	{
		displayName: 'Contact ID',
		name: 'create_contact_id',
		type: 'string' as NodePropertyTypes,
		description: 'The ID of the contact associated with the reservation (optional)',
		placeholder: '123456',
		default: '',
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
			},
		},
		routing: {
			request: {
				body: {
					contact_id: '={{ $parameter["create_contact_id"] || undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Co-Travelers',
		name: 'co_travelers',
		type: 'fixedCollection' as NodePropertyTypes,
		typeOptions: {
			multipleValues: true,
		},
		description: 'Add one or more co-travelers with their dynamic fields',
		placeholder: 'Add Traveler',
		default: { traveler: [] },
		displayOptions: {
			show: {
				resource: ['reservations'],
				operation: ['createReservation'],
			},
		},
		options: [
			{
				name: 'traveler',
				displayName: 'Traveler',
				values: [
					{
						displayName: 'Fields',
						name: 'field',
						type: 'fixedCollection' as NodePropertyTypes,
						typeOptions: {
							multipleValues: true,
						},
						default: {},
						options: [
							{
								name: 'field',
								displayName: 'Field',
								values: [
									{
										displayName: 'Key',
										name: 'key',
										type: 'options' as NodePropertyTypes,
										typeOptions: {
											loadOptionsMethod: 'getCoTravelerFields',
										},
										default: '',
										description: 'Field key from the API',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string' as NodePropertyTypes,
										default: '',
										description: 'Value for this field',
									},
								],
							},
						],
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					co_travelers:
						'={{ $parameter["co_travelers"].traveler?.map(traveler => Object.fromEntries(traveler.field.field.map(f => [f.key, f.value]))) || [] }}',
				},
			},
		},
	},
];
