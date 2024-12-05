# Google Mapper

Google Mapper is a web application that leverages the Google Maps JavaScript API to explore locations, show your current location, and navigate to specific coordinates.

## Installation

To run Google Mapper locally, follow these steps:

### Prerequisites

Before proceeding, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installing Dependencies

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/google-mapper.git
   cd google-mapper
   ```

2. Install dependencies using npm:

   ```sh
   npm install
   ```

### Setting Up json-server

Google Mapper uses `json-server` to simulate a REST API for storing favorite locations. Follow these steps to set it up:

1. Install `json-server` globally (if not already installed):

   ```sh
   npm install -g json-server
   ```

2. Start `json-server` to serve the favorites API:

   ```sh
   json-server --watch db.json --port 3000
   ```

### Obtaining Google Maps API Key

You need an API key from the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) to use Google Mapper. Follow these steps to get your API key:

1. Visit [Google Maps Platform](https://developers.google.com/maps/gmp-get-started) and create a new project.

2. Enable the Google Maps JavaScript API for your project.

3. Copy the API key generated for your project.

4. Create a `config.js` file in the root directory of your project (use `.gitignore` to hide this file from version control) and store your API key:

   ```javascript
   // config.js
   const API_KEY = "your_google_maps_api_key_here";

   export default API_KEY;
   ```

## Usage

### Running Google Mapper

1. Open `index.html` in your browser to launch Google Mapper. If you're running this from VS Code download the Live Server Extension below.  Right click on index.html and Open with Live Server

https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer


2. Double-click the "Google Mapper" heading for instructions on using the application.

3. Use the provided buttons to get your current location, explore random places, and look up specific coordinates.

4. Fill in latitude and longitude coordinates in the form and click "Go!" to navigate to a specific location on the map.

5. Mark locations as favorites by pressing "Add to Favorites!" Location must have a name to be a part of your favorites. Favorites will appear in the right sidebar.

6. Click on a favorite location in the sidebar to navigate to that location on the map.
