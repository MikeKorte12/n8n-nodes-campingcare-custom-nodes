import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class CampingCare implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Camping Care',
		name: 'campingCare',
		group: ['transform'],
		version: 1,
		description: 'Node for Camping Care operations including Google Sheets integration',
		defaults: {
			name: 'Camping Care',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'campingCareOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						operation: ['getSheetWithFilter', 'setResultToPending'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Sheet if Not Imported',
						value: 'getSheetWithFilter',
						description: 'Get rows from a Google Sheet when not imported',
						action: 'Get rows from a google sheet when not imported',
					},
					{
						name: 'Set Result to Pending',
						value: 'setResultToPending',
						description: 'Set result column to "pending" for rows where imported is FALSE',
						action: 'Set result column to pending for rows where imported is false',
					},
				],
				default: 'getSheetWithFilter',
			},
			{
				displayName: 'Spreadsheet ID',
				name: 'spreadsheetId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getSheetWithFilter'],
					},
				},
				default: '',
				placeholder: 'Please enter your Spreadsheet ID',
			},
			{
				displayName: 'Sheet Name',
				name: 'sheetName',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getSheetWithFilter'],
					},
				},
				default: 'Sheet1',
			},


			// Parameters for setResultToPending operation
			{
				displayName: 'Spreadsheet ID',
				name: 'spreadsheetId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['setResultToPending'],
					},
				},
				default: '',
				placeholder: 'Please enter your Spreadsheet ID',
			},
			{
				displayName: 'Sheet Name',
				name: 'sheetName',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['setResultToPending'],
					},
				},
				default: 'Sheet1',
			},


		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;

		const returnData: INodeExecutionData[] = [];

		if (operation === 'getSheetWithFilter') {
			try {
				const spreadsheetId = this.getNodeParameter('spreadsheetId', 0) as string;
				const sheetName = this.getNodeParameter('sheetName', 0) as string;
				// Fixed values for consistent structure
				const range = 'A:Z'; // Gets all columns from A to Z and all rows
				const headerRow = 1;
				const importedColumnName = 'Imported';

				// Validate required parameters
				if (!spreadsheetId) {
					throw new NodeOperationError(this.getNode(), 'Spreadsheet ID is required');
				}

				// Construct the full range
				const fullRange = `${sheetName}!${range}`;

				// Make HTTP request to Google Sheets API using CampingCare OAuth2 credentials
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'campingCareOAuth2Api',
					{
						method: 'GET',
						url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(fullRange)}`,
						json: true,
					},
				);
				const values = response.values as string[][];

				if (!values || values.length === 0) {
					throw new NodeOperationError(this.getNode(), 'No data found in the specified range');
				}

				// Get headers from the specified header row
				const headers = values[headerRow - 1];
				if (!headers) {
					throw new NodeOperationError(this.getNode(), `Header row ${headerRow} not found`);
				}

				// Find the imported column index
				const importedColumnIndex = headers.findIndex(header =>
					header && header.trim().toLowerCase() === importedColumnName.toLowerCase()
				);

				if (importedColumnIndex === -1) {
					throw new NodeOperationError(this.getNode(), `Column "${importedColumnName}" not found in headers`);
				}

				// Process data rows (skip header row)
				for (let i = headerRow; i < values.length; i++) {
					const row = values[i];
					if (!row || row.length === 0) continue;

					// Check if Imported column is FALSE or empty
					const importedValue = row[importedColumnIndex];
					const isNotImported = !importedValue ||
										 importedValue.trim().toLowerCase() === 'false' ||
										 importedValue.trim() === '';

					if (isNotImported) {
						// Create an object with all column data, starting with row number
						const rowData: { [key: string]: any } = {
							_rowNumber: i + 1,
						};

						// Map all headers to their corresponding values with proper type conversion
						headers.forEach((header, index) => {
							if (header && header.trim()) {
								const cellValue = row[index] || '';
								const headerName = header.trim();

								// Convert boolean values
								if (cellValue.toLowerCase() === 'true') {
									rowData[headerName] = true;
								} else if (cellValue.toLowerCase() === 'false') {
									rowData[headerName] = false;
								} else if (!isNaN(Number(cellValue)) && cellValue !== '' && cellValue.trim() !== '') {
									// Convert numeric values to numbers
									rowData[headerName] = Number(cellValue);
								} else {
									// Keep as string
									rowData[headerName] = cellValue;
								}
							}
						});

						// Add imported status
						rowData._importedStatus = importedValue ? (importedValue.toLowerCase() === 'true') : false;

						// Add API data structure for records that are not imported
						const apiData = {
							accommodation_id: String(rowData['Accommodation ID'] || ''),
							arrival: String(rowData['Arrival (YYYY-MM-DD)'] || ''),
							departure: String(rowData['Departure (YYYY-MM-DD)'] || ''),
							persons: 2,
							force: true,
							main_traveler: {
								first_name: String(rowData['First name'] || ''),
								last_name: String(rowData['Last name'] || ''),
								street: String(rowData['Street'] || ''),
								email: String(rowData['E-Mail'] || '')
							},
							forced_rows: [
								{
									description: "Price for the stay",
									amount: 1,
									total: typeof rowData['Price'] === 'number' ? rowData['Price'] : (parseFloat(String(rowData['Price'])) || 0),
									type: "product_price"
								}
							]
						};

						// Add the api_data to the row data
						(rowData as any).api_data = apiData;

						returnData.push({
							json: rowData,
							pairedItem: { item: 0 },
						});
					}
				}

				if (returnData.length === 0) {
					// Return empty result if no unimported records found
					returnData.push({
						json: {
							message: 'No records found with Imported = FALSE',
							totalRowsChecked: values.length - headerRow,
						},
						pairedItem: { item: 0 },
					});
				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: 0 },
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex: 0 });
				}
			}
		} else if (operation === 'setResultToPending') {
			try {
				const spreadsheetId = this.getNodeParameter('spreadsheetId', 0) as string;
				const sheetName = this.getNodeParameter('sheetName', 0) as string;
				// Fixed values for consistent structure
				const range = 'A:Z'; // Gets all columns from A to Z and all rows
				const headerRow = 1;
				const importedColumnName = 'Imported';
				const resultColumnName = 'Result';

				// Validate required parameters
				if (!spreadsheetId) {
					throw new NodeOperationError(this.getNode(), 'Spreadsheet ID is required');
				}

				// Construct the full range
				const fullRange = `${sheetName}!${range}`;

				// First, get the current data to find rows where imported is FALSE
				const getResponse = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'campingCareOAuth2Api',
					{
						method: 'GET',
						url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(fullRange)}`,
						json: true,
					},
				);
				const values = getResponse.values as string[][];

				if (!values || values.length === 0) {
					throw new NodeOperationError(this.getNode(), 'No data found in the specified range');
				}

				// Get headers from the specified header row
				const headers = values[headerRow - 1];
				if (!headers) {
					throw new NodeOperationError(this.getNode(), `Header row ${headerRow} not found`);
				}

				// Find the imported and result column indices
				const importedColumnIndex = headers.findIndex(header =>
					header && header.trim().toLowerCase() === importedColumnName.toLowerCase()
				);
				const resultColumnIndex = headers.findIndex(header =>
					header && header.trim().toLowerCase() === resultColumnName.toLowerCase()
				);

				if (importedColumnIndex === -1) {
					throw new NodeOperationError(this.getNode(), `Column "${importedColumnName}" not found in headers`);
				}
				if (resultColumnIndex === -1) {
					throw new NodeOperationError(this.getNode(), `Column "${resultColumnName}" not found in headers`);
				}

				// Find rows where imported is FALSE and prepare updates
				const updates: any[] = [];
				const updatedRowsData: any[] = [];

				for (let i = headerRow; i < values.length; i++) {
					const row = values[i];
					if (!row || row.length === 0) continue;

					// Check if Imported column is FALSE or empty
					const importedValue = row[importedColumnIndex];
					const isNotImported = !importedValue ||
										 importedValue.trim().toLowerCase() === 'false' ||
										 importedValue.trim() === '';

					if (isNotImported) {
						// Convert column index to letter (A=0, B=1, etc.)
						const resultColumnLetter = String.fromCharCode(65 + resultColumnIndex);
						const cellRange = `${sheetName}!${resultColumnLetter}${i + 1}`;

						updates.push({
							range: cellRange,
							values: [['pending']],
						});

						// Add to the output data
						updatedRowsData.push({
							row_number: i + 1,
							Result: 'pending'
						});
					}
				}

				// Perform batch update if there are any updates
				if (updates.length > 0) {
					await this.helpers.httpRequestWithAuthentication.call(
						this,
						'campingCareOAuth2Api',
						{
							method: 'POST',
							url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
							json: true,
							body: {
								valueInputOption: 'RAW',
								data: updates,
							},
						},
					);

					// Return the array of updated rows
					for (const rowData of updatedRowsData) {
						returnData.push({
							json: rowData,
							pairedItem: { item: 0 },
						});
					}
				} else {
					returnData.push({
						json: {
							message: 'No rows found with Imported = FALSE to update',
							updatedRows: 0,
							totalRowsChecked: values.length - headerRow,
						},
						pairedItem: { item: 0 },
					});
				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: 0 },
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex: 0 });
				}
			}
		}

		return [returnData];
	}
}
