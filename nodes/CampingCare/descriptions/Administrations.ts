import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';
import { API_ENDPOINTS, RESOURCES, OPERATIONS } from '../utils/constants';

export const administrationsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: [RESOURCES.ADMINISTRATIONS] } },
		options: [
			{
				name: 'Get Administrations',
				value: OPERATIONS.GET_ADMINISTRATIONS,
				description:
					'You can retrieve the administrations of a specific user. Each API key has access to a single administration. Each user could have access to multiple administrations',
				action: 'Get administrations',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: API_ENDPOINTS.ADMINISTRATIONS,
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
				value: OPERATIONS.GET_ADMINISTRATION,
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
			{
				name: 'Age Tables',
				value: OPERATIONS.AGE_TABLES,
				description: 'Get age tables for an administration',
				action: 'Age tables',
			},
		],
		default: OPERATIONS.GET_ADMINISTRATIONS,
	},

	// Age Tables Method Selection
	{
		displayName: 'Age Tables Method',
		name: 'ageTablesMethod',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.AGE_TABLES],
			},
		},
		options: [
			{
				name: 'Get Age Tables',
				value: 'getAgeTables',
				description: 'Get age tables for this administration',
				action: 'Get age tables',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/administrations/{{$parameter["admin_id"]}}/age_tables',
						qs: {
							translations: '={{ $parameter["translations_age_tables"] || undefined }}',
							sort: '={{ $parameter["sort"] || undefined }}',
						},
					},
				},
			},
			{
				name: 'Get Age Table',
				value: 'getAgeTable',
				description: 'Get a single age table by ID',
				action: 'Get age table',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/administrations/{{$parameter["admin_id"]}}/age_tables/{{$parameter["age_table_id"]}}',
						qs: {
							translations: '={{ $parameter["translations_age_tables"] || undefined }}',
						},
					},
				},
			},
		],
		default: 'getAgeTables',
	},

	{
		displayName: 'Administration ID',
		name: 'administrationId',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Unique identifier of the administration to retrieve',
		placeholder: '1234',
		default: '',
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATION] },
		},
	},

	{
		displayName: 'Count',
		name: 'count',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to get a total count back of the administrations. Default: false.',
		default: false,
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATIONS] },
		},
	},
	{
		displayName: 'Get Accommodations',
		name: 'get_accommodations',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include accommodation data for each administration',
		default: false,
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATIONS] },
		},
	},
	{
		displayName: 'Get Age Tables',
		name: 'get_age_tables',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include age table information for the administration(s)',
		default: false,
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.GET_ADMINISTRATIONS, OPERATIONS.GET_ADMINISTRATION],
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
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.GET_ADMINISTRATIONS, OPERATIONS.GET_ADMINISTRATION],
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
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.GET_ADMINISTRATIONS, OPERATIONS.GET_ADMINISTRATION],
			},
		},
	},
	{
		displayName: 'Get VAT Tables',
		name: 'get_vat_tables',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include VAT table information for the administration',
		default: false,
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATION] },
		},
	},
	{
		displayName: 'Translations',
		name: 'translations',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include translations for administration fields',
		default: false,
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.GET_ADMINISTRATIONS, OPERATIONS.GET_ADMINISTRATION],
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
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATIONS] },
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		description: 'Number of items to skip before starting to collect results',
		placeholder: '0',
		typeOptions: { minValue: 0 },
		default: 0,
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATIONS] },
		},
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
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATIONS] },
		},
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string' as NodePropertyTypes,
		description: 'Filter administrations by ID or name. Partial matches are allowed.',
		placeholder: 'Enter ID or name',
		default: '',
		displayOptions: {
			show: { resource: [RESOURCES.ADMINISTRATIONS], operation: [OPERATIONS.GET_ADMINISTRATIONS] },
		},
	},

	// === AGE TABLES PARAMETERS ===
	{
		displayName: 'Administration ID',
		name: 'admin_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'The administration ID to get age tables from',
		placeholder: '1234',
		default: '',
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.AGE_TABLES],
			},
		},
	},
	{
		displayName: 'Translations',
		name: 'translations_age_tables',
		type: 'boolean' as NodePropertyTypes,
		description: 'Whether to include translations for age table fields',
		default: false,
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.AGE_TABLES],
			},
		},
	},
	{
		displayName: 'Age Table ID',
		name: 'age_table_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'The unique ID of the age table to retrieve',
		placeholder: '1234',
		default: '',
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.AGE_TABLES],
				ageTablesMethod: ['getAgeTable'],
			},
		},
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'options' as NodePropertyTypes,
		description: 'Sort age tables by field',
		options: [
			{ name: '— None —', value: '' },
			{ name: 'Priority', value: 'priority' },
			{ name: 'Name', value: 'name' },
			{ name: 'ID', value: 'id' },
		],
		default: '',
		displayOptions: {
			show: {
				resource: [RESOURCES.ADMINISTRATIONS],
				operation: [OPERATIONS.AGE_TABLES],
				ageTablesMethod: ['getAgeTables'],
			},
		},
	},
];
