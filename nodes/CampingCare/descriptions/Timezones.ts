import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';
import { API_ENDPOINTS, RESOURCES, OPERATIONS } from '../utils/constants';

export const timezonesDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: [RESOURCES.TIMEZONES] } },
		options: [
			{
				name: 'Get Timezones',
				value: OPERATIONS.GET_TIMEZONES,
				description: 'Get a list of timezones with optional filters',
				action: 'Get timezones',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: API_ENDPOINTS.TIMEZONES,
						qs: {
							limit: '={{ $parameter["limit"] || undefined }}',
							offset: '={{ $parameter["offset"] || undefined }}',
							count: '={{ $parameter["count"] || undefined }}',
							country_code: '={{ $parameter["country_code"] || undefined }}',
						},
					},
				},
			},
		],
		default: OPERATIONS.GET_TIMEZONES,
	},

	// Get Timezones parameters
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number' as NodePropertyTypes,
		description: 'Maximum number of timezones to return',
		placeholder: '15',
		typeOptions: { minValue: 1 },
		default: 15,
		displayOptions: { show: { resource: [RESOURCES.TIMEZONES], operation: [OPERATIONS.GET_TIMEZONES] } },
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number' as NodePropertyTypes,
		description: 'Number of items to skip before starting to return results',
		placeholder: '0',
		typeOptions: { minValue: 0 },
		default: 0,
		displayOptions: { show: { resource: [RESOURCES.TIMEZONES], operation: [OPERATIONS.GET_TIMEZONES] } },
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'boolean' as NodePropertyTypes,
		description: 'Get the total count of timezones',
		default: false,
		displayOptions: { show: { resource: [RESOURCES.TIMEZONES], operation: [OPERATIONS.GET_TIMEZONES] } },
	},
	{
		displayName: 'Country Code',
		name: 'country_code',
		type: 'string' as NodePropertyTypes,
		description: 'Filter timezones by country code (e.g., deu for Germany)',
		placeholder: 'deu',
		default: '',
		displayOptions: { show: { resource: [RESOURCES.TIMEZONES], operation: [OPERATIONS.GET_TIMEZONES] } },
	},
];
