import type { NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export const channelsDescription = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options' as NodePropertyTypes,
		noDataExpression: true,
		displayOptions: { show: { resource: ['channels'] } },
		options: [
			{
				name: 'Get Channels',
				value: 'getChannels',
				description: 'Get a list of channels',
				action: 'Get channels',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/channels',
					},
				},
			},
			{
				name: 'Get Channel',
				value: 'getChannel',
				description: 'Get a single channel by ID',
				action: 'Get channel',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/channels/{{$parameter["channel_id"]}}',
					},
				},
			},
			{
				name: 'Add Channel',
				value: 'addChannel',
				description: 'Add a new channel',
				action: 'Add channel',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/channels',
						qs: {
							name: '={{ $parameter["name"] }}',
						},
					},
				},
			},
		],
		default: 'getChannels',
	},

	// Get Channel field
	{
		displayName: 'Channel ID',
		name: 'channel_id',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Unique identifier of the channel to retrieve',
		placeholder: '116',
		default: '',
		displayOptions: { show: { resource: ['channels'], operation: ['getChannel'] } },
	},

	// Add Channel field
	{
		displayName: 'Name',
		name: 'name',
		type: 'string' as NodePropertyTypes,
		required: true,
		description: 'Name of the new channel',
		placeholder: 'Test',
		default: '',
		displayOptions: { show: { resource: ['channels'], operation: ['addChannel'] } },
	},
];
