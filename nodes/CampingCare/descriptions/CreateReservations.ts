import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export const createReservationsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['resourceCreateReservations'] } },
		options: [
			{
				name: 'Using Price Calculation with ID and Hash',
				value: 'createReservation1',
				description: 'Create a reservation using a price calculation ID and hash',
				action: 'Create reservation using price calculation ID and hash',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/reservations',
					},
				},
			},
			{
				name: 'Using Price Calculation with Start and End Date',
				value: 'createReservation2',
				description: 'Create a reservation with automatic price calculation for given dates',
				action: 'Create reservation using start and end date',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '=/reservations',
					},
				},
			},
			{
				name: 'Forcing a Reservation with Own Data',
				value: 'createReservation3',
				description: 'Force a reservation with custom data, bypassing price calculations',
				action: 'Force reservation with custom data',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '=/reservations',
					},
				},
			},
		],
		default: 'createReservation1',
	},
	{
		displayName: 'Sub Operation',
		name: 'subOperation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		options: [
			{
				name: 'Calculate Price',
				value: 'calculatePrice',
				description:
					'Calculate accommodation price based on arrival, departure, and number of persons',
				action: 'Calculate accommodation price',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/price_calculation',
						qs: {
							arrival: '={{ $parameter["arrival"] }}',
							departure: '={{ $parameter["departure"] }}',
							accommodation_id: '={{ $parameter["accommodation_id"] }}',
							persons: '={{ $parameter["persons"] }}',
						},
					},
				},
			},
			{
				name: 'Create Reservation',
				value: 'createReservations1',
				description: 'Create a new reservation using a price calculation',
				action: 'Create a reservation',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/reservations',
						body: {
							accommodation_id: '={{ $parameter["accommodation_id"] }}',
							calculation_id: '={{ $parameter["calculation_id"] }}',
							calculation_draft_id: '={{ $parameter["calculation_draft_id"] }}',
							contact_id: '={{ $parameter["contact_id"] || undefined }}',
							co_travelers:
								'={{ $parameter["co_travelers"].traveler?.map(traveler => Object.fromEntries(traveler.field.field.map(f => [f.key, f.value]))) || [] }}',
						},
					},
				},
			},
		],
		default: 'calculatePrice',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1'],
			},
		},
	},
	{
		displayName: 'Sub-Operation',
		name: 'subOperation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		options: [
			{
				name: 'Create Reservation',
				value: 'createReservations3',
				description: 'Create a new reservation with forced rows',
				action: 'Create a reservation',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/reservations',
						body: {
							arrival: '={{ $parameter["arrival"] }}',
							departure: '={{ $parameter["departure"] }}',
							accommodation_id: '={{ $parameter["accommodation_id"] }}',
							persons: '={{ $parameter["persons"] || 1 }}',
							contact_id: '={{ $parameter["contact_id"] || undefined }}',
							force: true,
							forced_rows:
								'={{ $parameter["forced_rows"].row?.map(r => ({type: r.type,description: r.description,amount: Number(r.amount),total: Number(r.total),data: ""})) || [] }}',
							co_travelers:
								'={{ $parameter["co_travelers"].traveler?.map(traveler => Object.fromEntries(traveler.field.field.map(f => [f.key, f.value]))) || [] }}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation3'],
			},
		},
		default: 'createReservations3',
	},

	// === Create Reservation 1 CP ===
	{
		displayName: 'Arrival Date',
		name: 'arrival',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Arrival date for the booking (format: YYYY-MM-DD)',
		placeholder: 'YYYY-MM-DD',
		default: '',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1', 'createReservation3'],
				subOperation: ['calculatePrice', 'createReservations3'],
			},
		},
	},
	{
		displayName: 'Departure Date',
		name: 'departure',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		placeholder: 'YYYY-MM-DD',
		description: 'Departure date for the booking (format: YYYY-MM-DD)',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1', 'createReservation3'],
				subOperation: ['calculatePrice', 'createReservations3'],
			},
		},
	},
	{
		displayName: 'Accommodation Name or ID',
		name: 'accommodation_id',
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
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1', 'createReservation3'],
				subOperation: ['calculatePrice', 'createReservations3'],
			},
		},
	},
	{
		displayName: 'Number of Persons',
		name: 'persons',
		type: 'number' as NodePropertyTypes,
		default: 1,
		required: true,
		description: 'Number of persons staying in the accommodation',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1', 'createReservation3'],
				subOperation: ['calculatePrice', 'createReservations3'],
			},
		},
	},

	// === Create Reservation 1 CR ===
	{
		displayName: 'Accommodation Name or ID',
		name: 'accommodation_id',
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
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1'],
				subOperation: ['createReservations1'],
			},
		},
	},
	{
		displayName: 'Calculation ID',
		name: 'calculation_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		placeholder: 'e.g. 98765',
		description: 'The calculation ID returned from the Price Calculation API',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1'],
				subOperation: ['createReservations1'],
			},
		},
	},
	{
		displayName: 'Calculation Draft ID',
		name: 'calculation_draft_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		placeholder: 'e.g. 123456',
		description: 'The draft ID returned from the Price Calculation API',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1'],
				subOperation: ['createReservations1'],
			},
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'The ID of the contact to find associated with the reservation',
		placeholder: 'e.g. 123456',
		default: '',
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1', 'createReservation3'],
				subOperation: ['createReservations1', 'createReservations3'],
			},
		},
	},
	{
		displayName: 'Forced Rows',
		name: 'forced_rows',
		type: 'fixedCollection' as NodePropertyTypes,
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add forced row',
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
				resource: ['resourceCreateReservations'],
				operation: ['createReservation3'],
				subOperation: ['createReservations3'],
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
						placeholder: 'Pitch description',
						description: 'Description of the row',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number' as NodePropertyTypes,
						default: 1,
						description: 'Quantity',
					},
					{
						displayName: 'Total',
						name: 'total',
						type: 'number' as NodePropertyTypes,
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
		type: 'fixedCollection' as NodePropertyTypes,
		typeOptions: {
			multipleValues: true,
		},
		description: 'Add one or more co-travelers with their dynamic fields',
		placeholder: 'Add Co-Traveler',
		default: { traveler: [] },
		displayOptions: {
			show: {
				resource: ['resourceCreateReservations'],
				operation: ['createReservation1', 'createReservation3'],
				subOperation: ['createReservations1', 'createReservations3'],
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
	},
];
