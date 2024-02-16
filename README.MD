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

--------------------------------------

Default Styles: /default-styles (GET method)
Delivers the default CSS stylesheet, probably CSS (handled by responseHandler.getCSS).

Logo: /logo (GET method)
Sends the logo image, likely PNG or JPEG (handled by responseHandler.getLogo).

Parchment Texture: /parchment-texture (GET method)
Provides the parchment texture image, likely PNG or JPEG (handled by responseHandler.getParchment).

Not Found: (Any unrecognized path)
Returns a 404 (Not Found) response (handled by responseHandler.get404Response).

--------------------------------------

Request Handling:

The onRequest function parses the incoming request URL, method, and query parameters.
It then matches the request path against the urlStruct object, which maps paths to handler functions.
If a matching handler is found, it's called with the request, response, parameters, and method.
Otherwise, the notFound handler is invoked to return a 404 response.

--------------------------------------

Error Handling:

While error handling isn't explicitly shown in the code, it's essential to incorporate proper mechanisms to gracefully handle potential errors and provide meaningful feedback to users. This could involve using try-catch blocks, middleware, or other methods to log errors, send error responses, or display user-friendly error messages.
Assumptions and Enhancements:

Since the specific implementations of the handler functions are not provided, some assumptions have been made based on naming conventions and common practices.

To provide a more accurate and in-depth explanation, consider sharing more details about the data formats, request/response structures, and overall application logic.

Additional enhancements could include adding API documentation with examples, using a more structured approach for organizing endpoints (e.g., RESTful principles), and considering security measures like authentication and authorization for sensitive resources.
