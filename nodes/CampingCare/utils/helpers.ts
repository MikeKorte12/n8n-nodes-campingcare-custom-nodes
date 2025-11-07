import type { NodePropertyTypes } from 'n8n-workflow';

export const createDisplayOptions = (
	resource: string,
	operation: string | string[],
	subOperation?: string | string[],
) => ({
	show: {
		resource: [resource],
		operation: Array.isArray(operation) ? operation : [operation],
		...(subOperation && {
			subOperation: Array.isArray(subOperation) ? subOperation : [subOperation],
		}),
	},
});

export const createContactField = (
	name: string,
	displayName: string,
	description: string,
	options: {
		type?: NodePropertyTypes;
		required?: boolean;
		default?: any;
		typeOptions?: any;
		placeholder?: string;
	} = {},
) => ({
	displayName,
	name,
	type: (options.type || 'string') as NodePropertyTypes,
	description,
	default: options.default !== undefined ? options.default : '',
	required: options.required || false,
	displayOptions: createDisplayOptions('contacts', 'addContact'),
	...(options.typeOptions && { typeOptions: options.typeOptions }),
	...(options.placeholder && { placeholder: options.placeholder }),
});

export const extractWebhookId = (responseData: any): string => {
	const webhookId = responseData.id || responseData.webhook_id || responseData.data?.id;

	if (!webhookId) {
		throw new Error('Webhook created but no ID was returned from the API');
	}

	return webhookId;
};
