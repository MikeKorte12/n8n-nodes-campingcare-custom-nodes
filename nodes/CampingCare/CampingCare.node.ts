import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

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

			// Operations for Administrations
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
								}
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

			// Operations for Contacts
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

			// Extra parameters for Administrations
			{
				displayName: 'Administration ID',
				name: 'administrationId',
				type: 'string',
				default: '',
				description: 'The unique ID of the administration to retrieve',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration'],
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter administrations',
				placeholder: 'Enter search keyword',
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
				placeholder: 'e.g. 0',
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
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
				placeholder: 'e.g. 50',
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
				placeholder: 'e.g. DESC or ASC',
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
						operation: ['getAdministrations', 'getAdministration'],
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
						operation: ['getAdministrations', 'getAdministration'],
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
						operation: ['getAdministrations', 'getAdministration'],
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
						operation: ['getAdministrations', 'getAdministration'],
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
			{
				displayName: 'Get Vat Tables',
				name: 'get_vat_tables',
				type: 'boolean',
				default: false,
				description: 'Whether to include vat tables in the response',
				displayOptions: {
					show: {
						resource: ['administrations'],
						operation: ['getAdministration'],
					},
				},
			},
			// Extra parameters for Contacts
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'The unique ID of the contact to retrieve',
				displayOptions: {
					show: {
						resource: ['contacts'],
						operation: ['getContact'],
					},
				},
			},
		],
	};
}
