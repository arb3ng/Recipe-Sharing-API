This site is meant to be a place where people can record and share family recipes.
The API handles recording and serving up recipes.

Made by:
Bryan Jay Hizole,
Cyrel Madjos,
Rb Denzel Mistal,
Kamil Saporna,
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

--------------------------------------

Add Page JavaScript functionality (Vue.js):

Vue.js: Manages the dynamic elements of the form using Vue.js.
Data: Stores information about the recipe name, ingredients, and steps.

Methods:

addIngredient(): Adds a new ingredient object to the ingredients array.

deleteIngredient(ingredient): Removes the specified ingredient from the ingredients array.

addStep(): Adds a new step object to the steps array.

deleteStep(step): Removes the specified step from the steps array.

getRecipe(): Returns a recipe object with the collected data.

Other functions:

sendPost(e, recipe): Handles form submission, sends the recipe data (obtained from getRecipe()) via XHR POST request to the /modify-recipes endpoint, and displays a message based on the server response.

init(): Sets up the Vue.js instance, adds event listeners for the submit button and adding/deleting ingredients and steps.

--------------------------------------

Admin Page JavaScript Functionality (Vue.js):

Vue.js: Manages dynamic elements of the page using Vue.js.

Data:

curRecipe: Stores the data of the currently edited recipe.

recipes: Stores the list of all available recipes.


Methods:
getRecipes(vueApp): Fetches the list of recipes from the /recipes endpoint and updates the recipes data of the specified Vue instance.

editRecipe(e, recipe, vueApp): Handles submitting the edited recipe data. Sends a PUT request to the /modify-recipes endpoint with the updated recipe information. On successful update, refreshes the recipe list and displays an alert message. Otherwise, shows an error message.

init(): Sets up the Vue instances, fetches the initial recipe list, and adds event listeners for various actions like adding/deleting ingredients/steps, updating recipes, and deleting recipes.


Other methods:

addIngredient(), deleteIngredient(), addStep(), deleteStep(): Manage adding/removing ingredients and steps for the edited recipe.

stageRecipe(recipe): Sets the currently edited recipe to the selected one from the list.

deleteRecipe(recipeName): Sends a DELETE request to the /modify-recipes endpoint with the recipe name to delete. Refreshes the recipe list and displays an alert message based on the success/failure of the operation.




