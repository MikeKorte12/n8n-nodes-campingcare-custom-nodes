import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export const administrationsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['administrations'] } },
		options: [
			{
				name: 'Get Administrations',
				value: 'getAdministrations',
				description: 'You can retrieve the administrations of a specific user. Each API key has access to a single administration. Each user could have access to multiple administrations',
				action: 'Get administrations',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/administrations',
						qs: {
							count: '={{ $parameter["count"] || undefined }}',
							get_accommodations: '={{ $parameter["get_accommodations"] || undefined }}',
							get_age_tables: '={{ $parameter["get_age_tables"] || undefined }}',
							get_media: '={{ $parameter["get_media"] || undefined }}',
							get_meta: '={{ $parameter["get_meta"] || undefined }}',
							translations: '={{ $parameter["translations"] || undefined }}',
							limit: '={{ $parameter["limit"] || undefined }}',
							offset: '={{ $parameter["offset"] || undefined }}',
							order: '={{ $parameter["order"] || undefined }}',
							search: '={{ $parameter["search"] || undefined }}',
						},
					},
				},
			},
			{
				name: 'Get Administration',
				value: 'getAdministration',
				description: 'Get a single administration by id',
				action: 'Get administration',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/administrations/{{$parameter["administrationId"]}}',
						qs: {
							get_age_tables: '={{ $parameter["get_age_tables"] || undefined }}',
							get_media: '={{ $parameter["get_media"] || undefined }}',
							get_meta: '={{ $parameter["get_meta"] || undefined }}',
							get_vat_tables: '={{ $parameter["get_vat_tables"] || undefined }}',
							translations: '={{ $parameter["translations"] || undefined }}',
						},
					},
				},
			},
		],
		default: 'getAdministrations',
	},

	{
		displayName: 'Administration ID',
		name: 'administrationId',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Unique identifier of the administration to retrieve',
		placeholder: '1234',
		default: '',
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministration'] } },
	},

	{
		displayName: 'Count',
		name: 'count',
		type: 'boolean' as NodePropertyTypes,
		description:
			'Whether to get a total count back of the administrations. Default: false.',
		default: false,
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministrations'] } },
	},
	{
		displayName: 'Get Accommodations',
		name: 'get_accommodations',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include accommodation data for each administration',
		default: false,
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministrations'] } },
	},
	{
		displayName: 'Get Age Tables',
		name: 'get_age_tables',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include age table information for the administration(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['administrations'],
				operation: ['getAdministrations', 'getAdministration'],
			},
		},
	},
	{
		displayName: 'Get Media',
		name: 'get_media',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include media information for the administration(s)',
		default: false,
		displayOptions: {
			show: {
				resource: ['administrations'],
				operation: ['getAdministrations', 'getAdministration'],
			},
		},
	},
	{
		displayName: 'Get Meta',
		name: 'get_meta',
		type: 'boolean' as NodePropertyTypes,
		description:
			'Whether to include meta information for the administration(s). Note: OTA users may have limited access.',
		default: false,
		displayOptions: {
			show: {
				resource: ['administrations'],
				operation: ['getAdministrations', 'getAdministration'],
			},
		},
	},
	{
		displayName: 'Get VAT Tables',
		name: 'get_vat_tables',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include VAT table information for the administration',
		default: false,
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministration'] } },
	},
	{
		displayName: 'Translations',
		name: 'translations',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include translations for administration fields',
		default: false,
		displayOptions: {
			show: {
				resource: ['administrations'],
				operation: ['getAdministrations', 'getAdministration'],
			},
		},
	},

	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number' as NodePropertyTypes,
		description: 'Maximum number of administrations to return (minimum 1)',
		placeholder: '10',
		typeOptions: { minValue: 1 },
		default: 5,
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministrations'] } },
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		description: 'Number of items to skip before starting to collect results',
		placeholder: '0',
		typeOptions: { minValue: 0 },
		default: 0,
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministrations'] } },
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'options' as NodePropertyTypes,
		description:
			'Select the sorting order of the returned administrations. — None — will not sort.',
		options: [
			{ name: '— None —', value: '' },
			{ name: 'ASC', value: 'asc' },
			{ name: 'DESC', value: 'desc' },
		],
		default: '',
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministrations'] } },
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string' as NodePropertyTypes,
		description: 'Filter administrations by ID or name. Partial matches are allowed.',
		placeholder: 'Enter ID or name',
		default: '',
		displayOptions: { show: { resource: ['administrations'], operation: ['getAdministrations'] } },
	},
];
