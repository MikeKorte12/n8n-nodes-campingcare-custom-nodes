import type { INodeType, INodeTypeDescription, ILoadOptionsFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { administrationsDescription } from './descriptions/Administrations';
import { contactsDescription } from './descriptions/Contacts';
import { priceCalculationDescription } from './descriptions/PriceCalculation';
import { reservationsDescription } from './descriptions/Reservations';
import { accommodationsDescription } from './descriptions/Accommodations';
import { channelsDescription } from './descriptions/Channels';
import { timezonesDescription } from './descriptions/Timezones';
import { API_BASE_URL, API_ENDPOINTS, EXCLUDED_CONTACT_FIELDS } from './utils/constants';
import type { ContactField, Country, Accommodation } from './utils/types';

export class CampingCare implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Starfish (CampingCare/HotelCare)',
		name: 'campingCare',
		icon: { light: 'file:campingcare.svg', dark: 'file:campingcaredark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Interact with the Starfish API for CampingCare and HotelCare',
		defaults: { name: 'Starfish' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'campingCareApi', required: true }],
		usableAsTool: true,

		requestDefaults: {
			baseURL: API_BASE_URL,
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
					{ name: 'Accommodations API', value: 'accommodations' },
					{ name: 'Administrations API', value: 'administrations' },
					{ name: 'Channels API', value: 'channels' },
					{ name: 'Contacts API', value: 'contacts' },
					{ name: 'Price Calculation API', value: 'priceCalculation' },
					{ name: 'Reservations API', value: 'reservations' },
					{ name: 'Timezones API', value: 'timezones' },
				],
				default: 'accommodations',
			},

			...accommodationsDescription,
			...administrationsDescription,
			...channelsDescription,
			...contactsDescription,
			...priceCalculationDescription,
			...reservationsDescription,
			...timezonesDescription,
		],
	};

	methods = {
		loadOptions: {
			async getContactFields(this: ILoadOptionsFunctions) {
				try {
					const credentials = await this.getCredentials('campingCareApi');

					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${API_BASE_URL}${API_ENDPOINTS.FIELDS}`,
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

					return (response as ContactField[])
						.filter((field) => !(EXCLUDED_CONTACT_FIELDS as readonly string[]).includes(field.key))
						.map((field) => ({
							name: field.name,
							value: field.key,
						}));
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load contact fields',
						description: error.message || 'Unable to retrieve contact fields from the API',
					});
				}
			},
			async getCoTravelerFields(this: ILoadOptionsFunctions) {
				try {
					const credentials = await this.getCredentials('campingCareApi');

					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${API_BASE_URL}${API_ENDPOINTS.FIELDS_FORMS}`,
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
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load co-traveler fields',
						description: error.message || 'Unable to retrieve co-traveler fields from the API',
					});
				}
			},

			getCountriesFromRules: async function (this: ILoadOptionsFunctions) {
				try {
					const credentials = await this.getCredentials('campingCareApi');

					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${API_BASE_URL}${API_ENDPOINTS.FIELDS}`,
						qs: { type: 'contact', status: 'active' },
						headers: {
							Accept: 'application/json',
							Authorization: `Bearer ${credentials.apiKey}`,
						},
					});

					const postcodeField = (response as ContactField[]).find((field) =>
						field.rules?.some((r) => r.type === 'regex_country'),
					);

					if (!postcodeField) {
						return [];
					}

					const rule = postcodeField.rules?.find((r) => r.type === 'regex_country');

					if (!rule?.countries?.length) {
						return [];
					}

					const countries = (rule.countries as Country[]).map((c) => ({
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
						description: error.message || 'Unable to retrieve countries from the API',
					});
				}
			},

			async getAccommodations(this: ILoadOptionsFunctions) {
				try {
					const credentials = await this.getCredentials('campingCareApi');

					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${API_BASE_URL}${API_ENDPOINTS.ACCOMMODATIONS}`,
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${credentials.apiKey}`,
						},
					});

					const accommodations = (response as Accommodation[])
						.filter((a) => (a as any).status === 'active')
						.map((a) => ({
							name: a.name || `Accommodation ${a.id}`,
							value: a.id,
						}));

					accommodations.unshift({
						name: '— None —',
						value: '',
					});

					return accommodations;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load accommodations',
						description: error.message || 'Unable to retrieve accommodations from the API',
					});
				}
			},
		},
	};
}
