import type { INodeType, INodeTypeDescription, ILoadOptionsFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { administrationsDescription } from './descriptions/Administrations';
import { contactsDescription } from './descriptions/Contacts';
import { getReservationsDescription } from './descriptions/GetReservations';
import { createReservationsDescription } from './descriptions/CreateReservations';

export class CampingCare implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Camping Care',
		name: 'campingCare',
		icon: { light: 'file:campingcare.svg', dark: 'file:campingcaredark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Interact with the Camping Care API',
		defaults: { name: 'Camping Care' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'campingCareApi', required: true }],
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
					{ name: 'Administration', value: 'administrations' },
					{ name: 'Contact', value: 'contacts' },
					{ name: 'Get Reservation', value: 'resourceGetReservations' },
					{ name: 'Create Reservation', value: 'resourceCreateReservations' },
				],
				default: 'administrations',
			},

			...administrationsDescription,
			...contactsDescription,
			...getReservationsDescription,
			...createReservationsDescription,
		],
	};

	methods = {
		loadOptions: {
			async getContactFields(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('campingCareApi');

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://api.camping.care/v21/fields',
					qs: {
						type: 'contact',
						status: 'active',
						read_only: 'true',
					},
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${credentials.apiKey}`,
					},
				});

				const excludeFields = [
					'gender',
					'first_name',
					'last_name',
					'address',
					'address_number',
					'birthday',
					'city',
					'company',
					'country',
					'country_origin',
					'email',
					'id_nr',
					'phone',
					'zipcode',
					'phone_mobile',
					'vat_number',
					'state',
					'id_type',
					'created',
					'create_date',
				];

				return response
					.filter((field: any) => !excludeFields.includes(field.key))
					.map((field: any) => ({
						name: field.name,
						value: field.key,
					}));
			},
			async getCoTravelerFields(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('campingCareApi');

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://api.camping.care/v21/fields/forms',
					qs: {
						type: 'booking',
					},
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${credentials.apiKey}`,
					},
				});

				const coTravelerFields = response?.co_travelers ?? [];

				return coTravelerFields.map((field: any) => ({
					name: field.name,
					value: field.key,
				}));
			},

			getCountriesFromRules: async function (this: ILoadOptionsFunctions) {
				try {
					const credentials = await this.getCredentials('campingCareApi');

					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: 'https://api.camping.care/v21/fields',
						qs: { type: 'contact', status: 'active' },
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${credentials.apiKey}`,
						},
					});

					const postcodeField = response.find((field: any) =>
						field.rules?.some((r: any) => r.type === 'regex_country'),
					);

					if (!postcodeField) {
						return [];
					}

					const rule = postcodeField.rules.find((r: any) => r.type === 'regex_country');

					if (!rule?.countries?.length) {
						return [];
					}

					const countries = rule.countries.map((c: any) => ({
						name: c.country_name,
						value: c.country,
					}));

					countries.sort((a: any, b: any) => a.name.localeCompare(b.name));

					countries.unshift({
						name: '— None —',
						value: '',
					});

					return countries;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load country list',
					});
				}
			},

			async getAccommodations(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('campingCareApi');

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://api.camping.care/v21/accommodations',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${credentials.apiKey}`,
					},
				});

				const accommodations = response
					.filter((a: any) => a.status === 'active')
					.map((a: any) => ({
						name: a.name || `Accommodation ${a.id}`,
						value: a.id,
					}));

				accommodations.unshift({
					name: '— None —',
					value: '',
				});

				return accommodations;
			},
		},
	};
}
