import type { NodePropertyTypes } from 'n8n-workflow';
import type { WebhookResponse } from './types';

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
		default?: string | number | boolean;
		typeOptions?: Record<string, unknown>;
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

export const extractWebhookId = (responseData: WebhookResponse | WebhookResponse[]): string => {
	if (Array.isArray(responseData)) {
		const firstItem = responseData[0];
		const webhookId = firstItem?.id || firstItem?.webhook_id || firstItem?.data?.id;

		if (!webhookId) {
			throw new Error('Webhook created but no ID was returned from the API');
		}

		return webhookId;
	}

	const webhookId = responseData.id || responseData.webhook_id || responseData.data?.id;

	if (!webhookId) {
		throw new Error('Webhook created but no ID was returned from the API');
	}

	return webhookId;
};

export const isValidWebhookResponse = (data: unknown): data is WebhookResponse => {
	if (typeof data !== 'object' || data === null) {
		return false;
	}
	const response = data as Record<string, unknown>;
	return (
		typeof response.id === 'string' ||
		typeof response.webhook_id === 'string' ||
		(typeof response.data === 'object' && response.data !== null && 'id' in response.data)
	);
};

export const isValidWebhookResponseArray = (data: unknown): data is WebhookResponse[] => {
	return Array.isArray(data) && data.every(isValidWebhookResponse);
};
