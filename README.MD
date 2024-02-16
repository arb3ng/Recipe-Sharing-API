This site is meant to be a place where people can record and share family recipes.
The API handles recording and serving up recipes.

Made by:
Bryan Jay Hizole 
Cyrel Madjos
Rb Denzel Mistal
Kamil Saporna
from BSI/T - 3C SD

API Overview

The provided index.js file implements a Node.js server that listens on port 3000 (or the environment variables PORT or NODE_PORT) and handles various HTTP requests based on specific URL endpoints. Here's a breakdown of the key APIs it offers:

--------------------------------------

Endpoints:

Main Page: / (GET method)
Responds with the main page content, likely HTML (handled by responseHandler.getMainPage).

Admin Page: /admin (GET method)
Responds with the admin page content, likely HTML (handled by responseHandler.getAdminPage).

Recipe Form Page: /add-recipe (GET method)
Renders the form for suggesting a recipe, probably HTML (handled by responseHandler.getRecipeFormPage).

Browse Page: /browse (GET method)
Responds with the browse page content, likely HTML (handled by responseHandler.getBrowsePage).

Recipes: /recipes (GET method)
Retrieves recipe data in JSON format (handled by jsonHandler.handleRecipes).

Modify Recipes: /modify-recipes (PUT, POST, or DELETE methods)
Modifies recipes based on the request method and data (handled by jsonHandler.modifyRecipes).

Ingredients: /ingredients (GET method)
Retrieves ingredient data in JSON format (handled by jsonHandler.handleIngredients).

Default Styles: /default-styles (GET method)
Delivers the default CSS stylesheet, probably CSS (handled by responseHandler.getCSS).

Logo: /logo (GET method)
Sends the logo image, likely PNG or JPEG (handled by responseHandler.getLogo).

Parchment Texture: /parchment-texture (GET method)
Provides the parchment texture image, likely PNG or JPEG (handled by responseHandler.getParchment).

Not Found: (Any unrecognized path)
Returns a 404 (Not Found) response (handled by responseHandler.get404Response).

--------------------------------------

Browse Page JavaScript Functionality (Vue.js):

Vue.js: Leverages Vue.js, a popular JavaScript framework, to manage the dynamic components of the page.

Data: Defines variables to store the search term, ingredients, and fetched recipes.

searchRecipes() method:
Trims and processes the comma-separated ingredient list.
Constructs a fetch request to the /recipes endpoint with the search term and ingredient parameters.

On successful response:
Parses the JSON response and updates the recipes data with the retrieved recipe information.
Logs the fetched recipes to the console for debugging purposes.

On error:
Displays an alert message with the error information.
v-for loops: Dynamically render the list of recipes and their details based on the available data.

