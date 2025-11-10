import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export const accommodationsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['accommodations'] } },
		options: [
			{
				name: 'Get Accommodations',
				value: 'getAccommodations',
				description:
					'Get a list of accommodations with optional meta, media, services and translations',
				action: 'Get accommodations',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/accommodations',
						qs: {
							count: '={{ $parameter["count"] || undefined }}',
							get_meta: '={{ $parameter["get_meta"] || undefined }}',
							get_media: '={{ $parameter["get_media"] || undefined }}',
							get_services: '={{ $parameter["get_services"] || undefined }}',
							translations: '={{ $parameter["translations"] || undefined }}',
							limit: '={{ $parameter["limit"] || undefined }}',
							offset: '={{ $parameter["offset"] || undefined }}',
							channel_id: '={{ $parameter["channel_id"] || undefined }}',
							status: '={{ $parameter["status"] || undefined }}',
						},
					},
				},
			},
			{
				name: 'Get Accommodation',
				value: 'getAccommodation',
				description: 'Get a single accommodation by ID',
				action: 'Get accommodation',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/accommodations/{{$parameter["accommodation_id"]}}',
						qs: {
							get_meta: '={{ $parameter["get_meta"] || undefined }}',
							get_media: '={{ $parameter["get_media"] || undefined }}',
							translations: '={{ $parameter["translations"] || undefined }}',
							admin_id: '={{ $parameter["admin_id"] || undefined }}',
						},
					},
				},
			},
			{
				name: 'Add Accommodation',
				value: 'addAccommodation',
				description: 'Add a new accommodation (minimal: name)',
				action: 'Add accommodation',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/accommodations',
						body: {
							name: '={{ $parameter["name"] }}',
						},
					},
				},
			},
		],
		default: 'getAccommodations',
	},

	// Common fields
	{
		displayName: 'Accommodation ID',
		name: 'accommodation_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Unique identifier of the accommodation to retrieve',
		placeholder: '7343',
		default: '',
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodation'] } },
	},

	// List filters
	{
		displayName: 'Count',
		name: 'count',
		type: 'boolean' as NodePropertyTypes,
		description: 'Get the total count of accommodations (independent of channel filter)',
		default: false,
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodations'] } },
	},
	{
		displayName: 'Get Meta',
		name: 'get_meta',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include meta data for each accommodation',
		default: false,
		displayOptions: {
			show: { resource: ['accommodations'], operation: ['getAccommodations', 'getAccommodation'] },
		},
	},
	{
		displayName: 'Get Media',
		name: 'get_media',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include media info for each accommodation',
		default: false,
		displayOptions: {
			show: { resource: ['accommodations'], operation: ['getAccommodations', 'getAccommodation'] },
		},
	},
	{
		displayName: 'Get Services',
		name: 'get_services',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include services for each accommodation',
		default: false,
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodations'] } },
	},
	{
		displayName: 'Translations',
		name: 'translations',
		type: 'boolean' as NodePropertyTypes,
		description: 'Include translations of names and descriptions',
		default: false,
		displayOptions: {
			show: { resource: ['accommodations'], operation: ['getAccommodations', 'getAccommodation'] },
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number' as NodePropertyTypes,
		description: 'Maximum number of accommodations to return (1-50)',
		placeholder: '15',
		typeOptions: { minValue: 1, maxValue: 50 },
		default: 15,
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodations'] } },
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		description: 'Number of items to skip before starting to return results',
		placeholder: '0',
		typeOptions: { minValue: 0 },
		default: 0,
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodations'] } },
	},
	{
		displayName: 'Channel',
		name: 'channel_id',
		type: 'options' as NodePropertyTypes,
		description: 'Select a channel (OTAs)',
		default: '',
		typeOptions: { loadOptionsMethod: 'getChannels' },
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodations'] } },
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options' as NodePropertyTypes,
		description: 'Filter by a status value',
		options: [
			{ name: '— None —', value: '' },
			{ name: 'Active', value: 'active' },
			{ name: 'Nonactive', value: 'nonactive' },
		],
		default: '',
		displayOptions: { show: { resource: ['accommodations'], operation: ['getAccommodations'] } },
	},

	// Add accommodation minimal field(s)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Name of the new accommodation',
		placeholder: 'Campsite',
		default: '',
		displayOptions: { show: { resource: ['accommodations'], operation: ['addAccommodation'] } },
	},
];
