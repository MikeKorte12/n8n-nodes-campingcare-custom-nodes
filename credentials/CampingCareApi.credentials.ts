import { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CampingCareApi implements ICredentialType {
	name = 'campingCareApi';
	displayName = 'CampingCare API';
	documentationUrl = 'https://1drv.ms/p/c/7D450A4555B73F91/EXaXncSEOOhMrbgY426x0IkBR7zHsN4tQT1GllgNmP_dog';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Bearer token for API authentication',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.camping.care/v21',
			url: '/administrations',
			method: 'GET',
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
