import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export const priceCalculationDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['priceCalculation'] } },
		options: [
			{
				name: 'Price Calculation',
				value: 'calculatePrice',
				description:
					'Calculate accommodation price to get calculation ID and hash for creating a reservation',
				action: 'Calculate price',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/price_calculation',
						qs: {
							accommodation_id: '={{ $parameter["accommodation_id"] || undefined }}',
							arrival: '={{ $parameter["arrival"] || undefined }}',
							departure: '={{ $parameter["departure"] || undefined }}',
							persons: '={{ $parameter["persons"] || undefined }}',
							age_tables: '={{ $parameter["age_tables"] || undefined }}',
							birth_tables: '={{ $parameter["birth_tables"] || undefined }}',
							get_guests_price: '={{ $parameter["get_guests_price"] || undefined }}',
							get_taxes_price: '={{ $parameter["get_taxes_price"] || undefined }}',
							get_discounts_price: '={{ $parameter["get_discounts_price"] || undefined }}',
							get_required_options_price:
								'={{ $parameter["get_required_options_price"] || undefined }}',
							get_options: '={{ $parameter["get_options"] || undefined }}',
							get_deposit: '={{ $parameter["get_deposit"] || undefined }}',
							channel_id: '={{ $parameter["channel_id"] || undefined }}',
							card_id: '={{ $parameter["card_id"] || undefined }}',
							translations: '={{ $parameter["translations"] || undefined }}',
							reservation_id: '={{ $parameter["reservation_id"] || undefined }}',
							search_alternative: '={{ $parameter["search_alternative"] || undefined }}',
							get_available_places: '={{ $parameter["get_available_places"] || undefined }}',
							place_id: '={{ $parameter["place_id"] || undefined }}',
							get_rows: '={{ $parameter["get_rows"] || undefined }}',
							code: '={{ $parameter["code"] || undefined }}',
							history_date: '={{ $parameter["history_date"] || undefined }}',
							timeslot_id: '={{ $parameter["timeslot_id"] || undefined }}',
							timezone: '={{ $parameter["timezone"] || undefined }}',
						},
					},
				},
			},
		],
		default: 'calculatePrice',
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
			'The accommodation ID can be found using the accommodations API. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Arrival Date',
		name: 'arrival',
		type: 'string' as NodePropertyTypes,
		required: true,
		description:
			'Arrival date and time for the booking (format: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS)',
		placeholder: '2025-01-01',
		default: '',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Departure Date',
		name: 'departure',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		placeholder: '2025-01-05',
		description:
			'Departure date and time for the booking (format: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS)',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Number of Persons',
		name: 'persons',
		type: 'number' as NodePropertyTypes,
		required: true,
		default: 2,
		placeholder: '2',
		typeOptions: {
			minValue: 1,
		},
		description:
			'Number of persons staying in the accommodation. The price calculation always will include 2 persons calculated using the default age table.',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Guests Price',
		name: 'get_guests_price',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include extra guest prices in the calculation',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Taxes Price',
		name: 'get_taxes_price',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include taxes in the calculation',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Discounts Price',
		name: 'get_discounts_price',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include discounts in the calculation',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Required Options Price',
		name: 'get_required_options_price',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include required options in the calculation',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Options',
		name: 'get_options',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description:
			'Whether to get available bookable options (baby chair, extra tent, dog, etc.). The option IDs which are coming from the price calculation result can be used in the add options method.',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Deposit',
		name: 'get_deposit',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include deposit information',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Translations',
		name: 'translations',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include translations in the response',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Search Alternative',
		name: 'search_alternative',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to search for alternative accommodations',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Available Places',
		name: 'get_available_places',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to get available places',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Get Rows',
		name: 'get_rows',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		description: 'Whether to include detailed row information',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Age Table IDs',
		name: 'age_tables',
		type: 'string' as NodePropertyTypes,
		default: [],
		placeholder: '14709',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Add one or more age table IDs',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Birthdates',
		name: 'birth_tables',
		type: 'string' as NodePropertyTypes,
		default: [],
		placeholder: '2005-11-11',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Add one or more birthdates (YYYY-MM-DD)',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Channel',
		name: 'channel_id',
		type: 'options' as NodePropertyTypes,
		default: '',
		description: 'Select a channel for the booking',
		typeOptions: { loadOptionsMethod: 'getChannels' },
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Card ID',
		name: 'card_id',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '4429',
		description: 'Card identifier',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Reservation ID',
		name: 'reservation_id',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '1234',
		description:
			'If a reservation ID is provided, the calculation is checked against this reservation',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Place ID',
		name: 'place_id',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '1234',
		description: 'Specific place identifier',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: 'DISCOUNT2025',
		description: 'Promotional or discount code',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'History Date',
		name: 'history_date',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '2025-01-01',
		description: 'Historical date for price calculation (format: YYYY-MM-DD)',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Timeslot ID',
		name: 'timeslot_id',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: '1234',
		description: 'Timeslot identifier',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
	{
		displayName: 'Timezone',
		name: 'timezone',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: 'Europe/Amsterdam',
		description: 'Timezone for the calculation',
		displayOptions: {
			show: {
				resource: ['priceCalculation'],
				operation: ['calculatePrice'],
			},
		},
	},
];
