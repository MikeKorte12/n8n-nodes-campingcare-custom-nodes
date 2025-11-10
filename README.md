# n8n-nodes-campingcare-custom-nodes

Custom n8n nodes for integrating with the [Starfish API](https://api.camping.care) for CampingCare and HotelCare platforms. These nodes allow you to interact with contacts, reservations, accommodations, and webhooks in your n8n workflows.

## Features

This package provides the following nodes:

### Starfish (CampingCare/HotelCare) Node

Regular node for making API calls to Starfish:

- **Administrations**: Manage administration data
- **Contacts**: Create, retrieve, and search contacts
- **Reservations**: Get and create reservations with price calculations
- **Accommodations**: List and manage accommodations

### Starfish (CampingCare/HotelCare) Trigger Node

Webhook trigger node that listens for events from Starfish:

- Automatically creates and manages webhooks
- Supports multiple event types
- Receives real-time updates from Starfish

## Installation

### Prerequisites

- Node.js 20.x or higher
- n8n installed (minimum version 0.x)
- A valid Starfish API key

### Install via npm

```bash
npm install n8n-nodes-campingcare-custom-nodes
```

### Install in n8n

1. Stop your n8n instance
2. Install the package: `npm install n8n-nodes-campingcare-custom-nodes`
3. Restart n8n
4. The nodes will appear in the nodes panel

## Configuration

### Setting up API Credentials

1. In n8n, go to **Credentials** > **New**
2. Search for "Starfish (CampingCare/HotelCare) API"
3. Enter your API credentials:
   - **API Key**: Your Starfish API key (available in your Starfish dashboard)

## Usage Examples

### Example 1: Create a Contact

1. Add the "Starfish (CampingCare/HotelCare)" node
2. Select **Resource**: Contact
3. Select **Operation**: Add Contact
4. Fill in the required fields:
   - Last Name (required)
   - Email (required)
   - Additional optional fields as needed

### Example 2: Create a Reservation

1. Add the "Starfish (CampingCare/HotelCare)" node
2. Select **Resource**: Create Reservation
3. Choose operation type:
   - **Using Price Calculation**: Calculate price first, then create
   - **With Start/End Date**: Automatic price calculation
   - **Force Reservation**: Use custom pricing data

### Example 3: Listen for Webhook Events

1. Add the "Starfish (CampingCare/HotelCare) Trigger" node
2. Select the event types you want to listen for
3. Activate the workflow
4. The webhook will be automatically created in Starfish

## Supported Operations

### Contacts

- **Get Contacts**: Retrieve contacts with filtering, sorting, and pagination
- **Get Contact**: Get a specific contact by ID
- **Add Contact**: Create a new contact with metadata support

### Reservations

- **Get Reservations**: List reservations with filters
- **Create Reservation**: Multiple methods for creating reservations
- **Calculate Price**: Get pricing before creating a reservation

### Administrations

- Manage administration data and settings

## API Documentation

For detailed API documentation, visit: [https://api.camping.care/docs](https://api.camping.care)

## Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/MikeKorte12/n8n-nodes-campingcare-custom-nodes.git

# Install dependencies
npm install

# Build the project
npm run build

# Link for local testing
npm link

# In your n8n installation directory
npm link n8n-nodes-campingcare-custom-nodes
```

### Project Structure

```
nodes/
  CampingCare/
    CampingCare.node.ts          # Main node
    CampingCareTrigger.node.ts   # Webhook trigger node
    descriptions/                 # Operation descriptions
      Contacts.ts
      Reservations.ts
      Administrations.ts
      CreateReservations.ts
    utils/                        # Utility functions
      constants.ts                # API constants
      helpers.ts                  # Helper functions
credentials/
  CampingCareApi.credentials.ts  # API credentials definition
```

### Running Tests

```bash
npm run lint          # Check for linting errors
npm run lintfix       # Auto-fix linting errors
npm run build         # Build the project
```

## Troubleshooting

### Common Issues

**Issue**: "Invalid API Key" error

- **Solution**: Verify your API key in the Starfish dashboard and update it in n8n credentials

**Issue**: Webhook not receiving events

- **Solution**:
  - Check that the workflow is activated
  - Verify the webhook exists in Starfish dashboard
  - Ensure n8n is accessible from the internet (for webhooks)

**Issue**: Date format errors in reservations

- **Solution**: Ensure dates are in YYYY-MM-DD format

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## Changelog

### Version 0.1.0

- Initial release
- Support for Contacts, Reservations, and Accommodations
- Webhook trigger support
- Price calculation features

## License

[MIT](LICENSE.md)

## Support

For support, please:

- Check the [API Documentation](https://api.camping.care/docs)
- Open an issue on [GitHub](https://github.com/MikeKorte12/n8n-nodes-campingcare-custom-nodes/issues)
- Contact Starfish support for API-related questions

## Credits

Created by [MikeKorte12](https://github.com/MikeKorte12)

Built with the [n8n nodes starter](https://github.com/n8n-io/n8n-nodes-starter)
