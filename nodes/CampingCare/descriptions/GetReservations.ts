import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export const getReservationsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['resourceGetReservations'] } },
		options: [
			{
				name: 'Get Reservations',
				value: 'getReservations',
				description: 'Get all reservations with filters and extra data',
				action: 'Get reservations',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/reservations',
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
				description: 'Get details of a single reservation',
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
		],
		default: 'getReservations',
	},

	// Single reservation ID
	{
		displayName: 'Reservation ID',
		name: 'reservation_id',
		required: true,
		type: 'string' as NodePropertyTypes,
		description: 'The unique ID of the reservation you want to retrieve',
		placeholder: 'e.g. 1234567',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservation'] },
		},
	},

	// === Boolean parameters ===
	{
		displayName: 'Count',
		name: 'count',
		type: 'boolean' as NodePropertyTypes,
		description: 'When true, you will get a total count back of the reservations',
		default: false,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Filter Root Meta',
		name: 'filter_root_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include only reservations with root meta information',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Booker',
		name: 'get_booker',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include booker details of the reservations',
		default: false,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Co Travelers',
		name: 'get_co_travelers',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include co travelers details of the reservations',
		default: false,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Contact',
		name: 'get_contact',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include contact details of the reservations',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Invoice Meta',
		name: 'get_invoice_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include invoice meta of the reservations',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Invoice Payment',
		name: 'get_invoice_payment',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include invoice payment of the reservations',
		default: false,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Get Invoice Payments',
		name: 'get_invoice_payments',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include invoice payments of the reservations',
		default: false,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Invoice Rowsfilter',
		name: 'get_invoice_rowsfilter',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include invoice rowsfilter of the reservations',
		default: false,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservation'] },
		},
	},
	{
		displayName: 'Get Invoices',
		name: 'get_invoices',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include invoice data of the reservations',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Meta',
		name: 'get_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include meta data of the reservations',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Payment Terms',
		name: 'get_payment_terms',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include payment term data of the reservations',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},
	{
		displayName: 'Get Rows',
		name: 'get_rows',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include rows data of the reservations',
		default: false,
		displayOptions: {
			show: {
				resource: ['resourceGetReservations'],
				operation: ['getReservations', 'getReservation'],
			},
		},
	},

	// === Filter parameters ===
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Admin ID',
		name: 'admin_id',
		type: 'string' as NodePropertyTypes,
		description: '**OTA only:** Filter by administration ID',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Arrival Date',
		name: 'arrival',
		type: 'string' as NodePropertyTypes,
		description:
			'Filter by arrival date. Can be a single date (YYYY-MM-DD) or an array [fromDate, endDate].',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Channel ID',
		name: 'channel_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by channel ID',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by contact ID',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Create Date',
		name: 'create_date',
		type: 'string' as NodePropertyTypes,
		description:
			'Filter by creation date. Can be a single date (YYYY-MM-DD) or an array [fromDate, endDate].',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Departure Date',
		name: 'departure',
		type: 'string' as NodePropertyTypes,
		description:
			'Filter by departure date. Can be a single date (YYYY-MM-DD) or an array [fromDate, endDate].',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Group ID',
		name: 'group_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by group ID',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Last Modified',
		name: 'last_modified',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by last modified date',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number' as NodePropertyTypes,
		description: 'Limit for pagination (Default 10, Max 30)',
		typeOptions: { maxValue: 30 },
		default: 10,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Meta Key',
		name: 'meta_key',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by a specific meta key',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Meta Operator',
		name: 'meta_operator',
		type: 'string' as NodePropertyTypes,
		description: 'Operator to use with meta key (e.g., =, >, <)',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Meta Value',
		name: 'meta_value',
		type: 'string' as NodePropertyTypes,
		description: 'Value to match for the specified meta key',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		description: 'Offset for pagination',
		typeOptions: { minValue: 0 },
		default: 0,
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Place ID',
		name: 'place_id',
		type: 'string' as NodePropertyTypes,
		description: 'Filter by place ID',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
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
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string' as NodePropertyTypes,
		description: 'Type of reservation (e.g., group)',
		default: '',
		displayOptions: {
			show: { resource: ['resourceGetReservations'], operation: ['getReservations'] },
		},
	},
];
