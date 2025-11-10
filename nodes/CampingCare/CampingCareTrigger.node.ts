import type {
	IHookFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes } from 'n8n-workflow';
import { API_BASE_URL, API_ENDPOINTS } from './utils/constants';
import { extractWebhookId } from './utils/helpers';
import type { WebhookEvent, WebhookResponse } from './utils/types';

export class CampingCareTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Starfish (CampingCare/HotelCare) Trigger',
		name: 'campingCareTrigger',
		icon: { light: 'file:campingcare.svg', dark: 'file:campingcaredark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when an event occurs in Starfish',
		defaults: { name: 'Starfish Trigger' },
		credentials: [{ name: 'campingCareApi', required: true }],
		inputs: [],
		outputs: [NodeConnectionTypes.Main],

		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'campingcare',
			},
		],

		properties: [
			{
				displayName: 'Event Names or IDs',
				name: 'events',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getWebhookEvents',
				},
				default: [],
				description:
					'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
		],
	};

	methods = {
		loadOptions: {
			async getWebhookEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('campingCareApi');

				try {
					const events = await this.helpers.httpRequest({
						method: 'GET',
						url: `${API_BASE_URL}${API_ENDPOINTS.WEBHOOKS_EVENTS}`,
						headers: {
							Authorization: `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
					});

					const webhookEvents = (Array.isArray(events) ? events : []) as WebhookEvent[];
					return webhookEvents.map((event) => ({
						name: event.name || event.label || event.event,
						value: event.value || event.event,
					}));
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load webhook events from Starfish',
					});
				}
			},
		},
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId === undefined) {
					return false;
				}
				const credentials = await this.getCredentials('campingCareApi');

				try {
					await this.helpers.httpRequest({
						method: 'GET',
						url: `${API_BASE_URL}${API_ENDPOINTS.WEBHOOKS}/${webhookData.webhookId}`,
						headers: {
							Authorization: `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
					});
					return true;
				} catch (error) {
					return false;
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events') as string[];
				const credentials = await this.getCredentials('campingCareApi');

				const body = {
					url: webhookUrl,
					events: events,
				};

			try {
				const responseData = await this.helpers.httpRequest({
					method: 'POST',
					url: `${API_BASE_URL}${API_ENDPOINTS.WEBHOOKS}`,
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					body,
				}) as WebhookResponse | WebhookResponse[];

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = extractWebhookId(responseData);

				// Store the secret_key for webhook verification
				if (Array.isArray(responseData) && responseData[0]?.secret_key) {
					webhookData.secretKey = responseData[0].secret_key;
				} else if (!Array.isArray(responseData) && responseData?.secret_key) {
					webhookData.secretKey = responseData.secret_key;
				}					return true;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to create webhook in Starfish',
					});
				}
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId === undefined) {
					return true;
				}
				const credentials = await this.getCredentials('campingCareApi');

				try {
					await this.helpers.httpRequest({
						method: 'DELETE',
						url: `${API_BASE_URL}${API_ENDPOINTS.WEBHOOKS}/${webhookData.webhookId}`,
						headers: {
							Authorization: `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
					});
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to delete webhook from Starfish',
					});
				}

				delete webhookData.webhookId;
				delete webhookData.secretKey;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const webhookData = this.getWorkflowStaticData('node');
		const req = this.getRequestObject();
		const headerData = this.getHeaderData();

		// Verify the secret key from the request
		const receivedSecretKey =
			req.headers['x-webhook-secret'] ||
			req.headers['x-secret-key'] ||
			headerData['x-webhook-secret'] ||
			headerData['x-secret-key'];

		// Check if we have a stored secret key
		if (webhookData.secretKey) {
			if (!receivedSecretKey) {
				throw new NodeApiError(this.getNode(),
					{ message: 'Missing webhook secret key in request headers' },
					{
						message: 'Webhook request rejected: No secret key provided',
						description: 'The webhook must include a secret key for security verification'
					}
				);
			}

			if (receivedSecretKey !== webhookData.secretKey) {
				throw new NodeApiError(this.getNode(),
					{ message: 'Invalid webhook secret key' },
					{
						message: 'Webhook request rejected: Invalid secret key',
						description: 'The provided secret key does not match the expected value'
					}
				);
			}
		}

		const bodyData = this.getBodyData();
		return {
			workflowData: [this.helpers.returnJsonArray(bodyData)],
		};
	}
}
