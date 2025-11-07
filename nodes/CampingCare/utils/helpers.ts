import type { NodePropertyTypes } from 'n8n-workflow';

/**
 * Helper function to create display options for node properties
 */
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

/**
 * Helper function to create contact field properties with less duplication
 */
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

/**
 * Validate webhook ID from API response
 */
export const extractWebhookId = (responseData: any): string => {
	const webhookId = responseData.id || responseData.webhook_id || responseData.data?.id;

	if (!webhookId) {
		throw new Error('Webhook created but no ID was returned from the API');
	}

	return webhookId;
};
