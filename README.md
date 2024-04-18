### Group Project completed with team mates at Brainstation:

### API Functionality Summary:

- **Express Framework**: Utilization of Express for server setup and middleware management, providing a robust backend framework for API development.
- **Environment Variables**: Use of `dotenv` for managing environment variables, enhancing security and configuration flexibility.
- **CORS Configuration**: Implementation of CORS to allow cross-origin requests, essential for client-side interactions with the API.
- **Routing**: Establishment of distinct routes for handling warehouse and inventory data, enabling structured access and manipulation of resources.
- **Express JSON Middleware**: Use of `express.json()` for parsing JSON data in request bodies, facilitating the handling of JSON input.
- **Database Interaction**: Integration with a MySQL database using Knex.js to query and manipulate data, ensuring efficient data storage and retrieval.
- **CRUD Operations**: Comprehensive CRUD (Create, Read, Update, Delete) functionality for inventory items through RESTful endpoints.
  - **Create**: Endpoint to add new inventory items with validation to ensure all necessary data is provided.
  - **Read**: Endpoints to retrieve all inventory items or a single item by ID, including detailed joins to include warehouse data.
  - **Update**: Endpoint to update existing inventory items with robust validation to ensure data integrity.
  - **Delete**: Endpoint to delete inventory items, ensuring data can be cleanly removed when necessary.
- **Data Validation**: Implementation of input validation to prevent incorrect data entry and to ensure database integrity.
- **Error Handling**: Robust error handling to provide clear feedback on operation failures, improving the API's reliability and ease of debugging.
- **Seeding**: Database seeding functionality to populate the database with initial data for development and testing purposes.



# team-4-instock-server

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> develop
