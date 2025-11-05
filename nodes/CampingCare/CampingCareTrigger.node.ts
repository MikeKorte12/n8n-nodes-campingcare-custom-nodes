import type {
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export class CampingCareTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Camping Care Trigger',
		name: 'campingCareTrigger',
		icon: { light: 'file:campingcare.svg', dark: 'file:campingcaredark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when an event occurs in Camping Care',
		defaults: { name: 'Camping Care Trigger' },
		credentials: [{ name: 'campingCareApi', required: true }],
		inputs: [],
		outputs: ['main'],

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
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{ name: 'Guest Created', value: 'contact.add' },
					{ name: 'Reservation Created', value: 'reservation.add' },
				],
				default: 'contact.add',
				description: 'Event type to listen for from Camping Care',
			},
		],
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
						url: `https://api.camping.care/v21/webhooks/${webhookData.webhookId}`,
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
				const event = this.getNodeParameter('event') as string;
				const credentials = await this.getCredentials('campingCareApi');

				const body = {
					url: webhookUrl,
					events: [event],
				};

				try {
					const responseData = await this.helpers.httpRequest({
						method: 'POST',
						url: 'https://api.camping.care/v21/webhooks',
						headers: {
							Authorization: `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
					});

					const webhookData = this.getWorkflowStaticData('node');
					webhookData.webhookId = responseData.id || responseData.webhook_id || responseData.data?.id;
					return true;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to create webhook in Camping Care',
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
						url: `https://api.camping.care/v21/webhooks/${webhookData.webhookId}`,
						headers: {
							Authorization: `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
					});
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to delete webhook from Camping Care',
					});
				}

				delete webhookData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		try {
			const body = this.getBodyData();

			const selectedEvent = this.getNodeParameter('event') as string;
			if (body?.event && body.event !== selectedEvent) {
				return {};
			}

			return {
				workflowData: [this.helpers.returnJsonArray([body])],
			};
		} catch (error) {
			throw new NodeApiError(this.getNode(), error, {
				message: 'Error processing Camping Care webhook',
			});
		}
	}
}
