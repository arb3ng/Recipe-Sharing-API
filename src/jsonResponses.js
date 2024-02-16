const recipes = {
  'GARLIC BUTTER SHRIMP RECIPE': {
    name: 'GARLIC BUTTER SHRIMP RECIPE',
    ingredients: [
      {
        name: 'shrimp',
        amount: '1/4',
        units: 'kg',
        link: '',
      },
      {
        name: 'butter',
        amount: '1/4',
        units: 'cup ',
        link: '',
      },
      {
        name: 'garlic mince',
        amount: '4',
        units: 'tbsp ',
        link: '',
      },
      {
        name: 'butter',
        amount: '1/4',
        units: 'cup ',
        link: '',
      },
    ],
    steps: [
      { text: 'Put a pan on the stove and cover it with butter.' },
      { text: 'turn the stovetop on' },
      { text: 'crack the 1 egg into the pan' },
      { text: 'wait about a minute, then flip the egg over' },
      { text: 'wait another minute, then turn the stove off' },
      { text: 'your egg is done!' },
      { text: 'put it on a plate and eat it, or eat it straight out of the pan!' },
    ],
  },
  'kraft mac and cheese bowl': {
    name: 'Kraft Mac and Cheese bowl',
    ingredients: [
      {
        name: 'Kraft mac and cheese bowl',
        amount: '1',
        units: '',
        link: 'https://www.kraftmacandcheese.com/products/100166000003/microwavable',
      },
    ],
    steps: [
      { text: 'remove the plastic cover on the bowl' },
      { text: 'pour tap water into the bowl up to the indicated "fill line"' },
      { text: 'stir the macaroni in the water' },
      { text: 'microwave the macaroni for 3:30 minutes' },
      { text: 'take the bowl of mac out of the microwave, and stir in the provided cheese dust' },
      { text: 'enjoy!' },
    ],
  },
  'campbell\'s soup can': {
    name: "Campbell's Soup Can",
    ingredients: [
      {
        name: "Campbell's Soup",
        amount: '1',
        units: 'can',
        link: '',
      },
      {
        name: 'bowl',
        amount: '1',
        units: '',
        link: '',
      },
    ],
    steps: [
      { text: 'Open the can of soup and pour it into the bowl' },
      { text: 'Heat the bowl of soup in the microwave for about 2:30 minutes (for 1100 watt microwave)' },
      { text: "take the bowl out once it's done, and enjoy!" },
    ],
  },
  'boil pasta': {
    name: 'Boil Pasta',
    ingredients: [
      {
        name: 'pasta',
        amount: '1',
        units: 'box',
        link: '',
      },
      {
        name: 'sauce',
        amount: '1',
        units: 'jar',
        link: '',
      },
    ],
    steps: [
      { text: 'Boil 3 quarts of water on the stove' },
      { text: 'once the water is boiling, pour the pasta in' },
      { text: 'boil the pasta for 6-8 minutes, stirring occasionally' },
      { text: 'drain the pasta' },
      { text: 'serve the pasta with your favorite sauce.' },
    ],
  },
  tea: {
    name: 'Tea',
    ingredients: [
      {
        name: 'teabag',
        amount: 1,
        link: '',
        units: '',
      },
    ],
    steps: [
      { text: 'put water in a mug' },
      { text: 'microwave the mug of water' },
      { text: 'put the teabag in the mug of water' },
      { text: 'wait a few minutes' },
      { text: 'tea is ready!' },
    ],
  },
};

// formats the data and sends the response
const respond = (request, response, method, statusCode, object) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  // default headers
  const headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
  };

  // const jsonStringObject = JSON.stringify(object);
  let stringObject = JSON.stringify(object);

  if (acceptedTypes.includes('text/xml')) {
    headers['content-type'] = 'text/xml';
    // if response is a message
    if (stringObject.message) {
      stringObject = `
        <error> 
          <message>
            ${object.message}
          </message>
          <id>
            ${object.id}
          </id>
        <error>
        `;
    } else {
      stringObject = '<recipes>';
      const recipesResponse = Object.values(object);
      // adds recipe
      recipesResponse.forEach((recipe) => {
        stringObject += `
        <recipe>
        <name>
          ${recipe.name}
        </name>
        <ingredients>`;
        // adds ingredients
        recipe.ingredients.forEach((ingredient) => {
          stringObject += `
          <ingredient>
            <name>${ingredient.name}</name>
            <amount>${ingredient.amount}</amount>
            <units>${ingredient.units}</units>
            <link>${ingredient.link}</link>
          </ingredient>`;
        });

        // adds steps
        stringObject += '</ingredients><steps>';
        recipe.steps.forEach((step) => {
          stringObject += `<step><text>${step.text}</text></step>`;
        });

        stringObject += '</steps></recipe>';
      });

      stringObject += '</recipes>';
    }
  }

  if (method === 'HEAD') {
    headers['content-length'] = Buffer.byteLength(stringObject, 'utf-8');
    response.writeHead(statusCode, headers);
  } else {
    response.writeHead(statusCode, headers);
    response.write(stringObject);
  }
  response.end();
};

// various error messages.
const missingParameters = {
  message: `Error: you are missing parameters. Recipes are required to have a name, at least 1 
            ingredient and at least 1 step`,
  id: 'missingParams',
};
/* const noRecipes = {
  message: 'No recipes were found.',
  id: 'notFound',
}; */
const invalidID = {
  message: 'A recipe with that name does not exist.',
  id: 'notFound',
};
const missingName = {
  message: 'You are required to provide the unique name of a recipe to delete it.',
  id: 'missingName',
};
const recipeAlreadyExists = {
  message: 'A recipe with that name already exists. If you are trying to update an existing recipe, go to /admin and click the edit button under the recipe you want to edit.',
  id: 'conflict',
};
const modifyEndpointMethodRestriction = {
  message: 'This endpoint is for POST, PUT and DELETE methods only. For viewing api data, use /recipes or /ingredients',
  id: 'methodNotAllowed',
};
const dataEndpointMethodRestriction = {
  message: 'This endpoint is for GET and HEAD methods only. For modifying api data, use /modify-recipes',
  id: 'methodNotAllowed',
};

// gets recipes from the array of recipes.
const getRecipes = (request, response, params, httpMethod) => {
  // for finding a recipe with this entire name
  let { name } = params;
  // for searching for recipes with this term in their name.
  let { searchterm } = params;
  // for searching by ingredient
  let { ingredients } = params;

  const { limit } = params;

  let results = Object.values(recipes);

  // gets all recipes with given ids
  // let nameResults = Object.values(recipes);
  if (name) {
    name = name.toLowerCase();
    results = results.filter((r) => r.name.toLowerCase() === name);
    // make sure id exists
    if (results.length < 1) return respond(request, response, httpMethod, 404, invalidID);
  }

  // gets recipes with searchterm in their name
  if (searchterm) {
    searchterm = searchterm.toLowerCase();
    const searchRegEx = new RegExp(`.*${searchterm}.*`);

    results = results.filter((r) => searchRegEx.test(r.name.toLowerCase()));
  }

  // gets all recipes with the given ingredient
  if (ingredients) {
    ingredients = ingredients.toLowerCase().split(',');
    ingredients.forEach((ingredient) => {
      results = results.filter((r) => r.ingredients
        .map((i) => i.name.toLowerCase())
        .includes(ingredient));
    });
  }

  // limits results
  if (limit) {
    results = results.slice(0, limit);
  }

  // send back the recipes

  return respond(request, response, httpMethod, 200, results);
};

// adds a recipe or updates an existing recipe, depinding on the method
const addRecipe = (request, response, params, method) => {
  const recipe = params;

  // if missing parameters
  if (!recipe.ingredients || !recipe.steps || !recipe.name) {
    return respond(request, response, method, 400, missingParameters);
  }
  // if params are empty
  if (recipe.ingredients.length < 1 || recipe.steps.length < 1 || recipe.name.length < 1) {
    return respond(request, response, method, 400, missingParameters);
  }

  // if trying to post a recipe with a name that already exists.
  if (method === 'POST' && recipes[recipe.name.toLowerCase()]) {
    return respond(request, response, method, 409, recipeAlreadyExists);
  }
  // if trying to update a nonexstant recipe.
  if (method === 'PUT' && !recipes[recipe.name.toLowerCase()]) {
    return respond(request, response, method, 404, recipe);
  }

  recipes[recipe.name.toLowerCase()] = recipe;
  const responseCode = method === 'POST' ? 201 : 204;
  const jsonResponse = {
    id: recipe.name,
    message: `Recipe ${method === 'POST' ? 'Created' : 'Updated'} Successfully. Find at /recipes?name=${recipe.name.toLowerCase()}`,
  };
  return respond(request, response, method, responseCode, jsonResponse);
};

// removes a recipe
const deleteRecipe = (request, response, params, method) => {
  if (!params.name || params.name < 1) {
    return respond(request, response, method, 400, missingName);
  }

  const recipeName = params.name.toLowerCase();

  if (!recipes[recipeName]) {
    return respond(request, response, method, 404, invalidID);
  }

  delete recipes[recipeName];

  const responseCode = 204;
  const jsonResponse = {
    message: 'Successfully deleted recipe.',
    id: 'deleteSuccess',
  };
  return respond(request, response, method, responseCode, jsonResponse);
};

// helper function that handles any method that involves changing the data on the server
const handlePutAndPost = (request, response, method, funct) => {
  const body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = JSON.parse(bodyString);
    funct(request, response, bodyParams, method);
  });
};

// handles any get requests for recipes
const handleRecipes = (request, response, params, httpMethod) => {
  if (httpMethod === 'HEAD' || httpMethod === 'GET') {
    getRecipes(request, response, params, httpMethod);
  } else {
    respond(request, response, httpMethod, 405, dataEndpointMethodRestriction);
  }
};

// handles modifying the recipe data on the server
const modifyRecipes = (request, response, params, httpMethod) => {
  if (httpMethod === 'POST' || httpMethod === 'PUT') {
    handlePutAndPost(request, response, httpMethod, addRecipe);
  } else if (httpMethod === 'DELETE') {
    handlePutAndPost(request, response, httpMethod, deleteRecipe);
  } else {
    respond(request, response, httpMethod, 405, modifyEndpointMethodRestriction);
  }
};

// sends back all the ingredients
const handleIngredients = (request, response, params, httpMethod) => {
  if (httpMethod !== 'HEAD' && httpMethod !== 'GET') {
    respond(request, response, httpMethod, 405, dataEndpointMethodRestriction);
  }
  const recipesVals = Object.values(recipes);

  let allIngredients = [];
  recipesVals.forEach((recipe) => {
    const ingredientNames = recipe.ingredients.map((a) => a.name);

    allIngredients = allIngredients.filter((a) => !ingredientNames.includes(a));
    allIngredients = allIngredients.concat(ingredientNames);
  });
  respond(request, response, httpMethod, 200, allIngredients);
};

module.exports = {
  handleRecipes,
  handleIngredients,
  modifyRecipes,

};
