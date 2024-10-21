# Project purpose

This project is intended to work as supporting tool for validation of JWT tokens issued in various flows.\
It does assume that operator knows the client secret and prefereably can apply small changes to the OIDC client configuration, such as registering of localhost callback.\
**You are using it on your own risk. I will repeat again you will need to provide client secret** so don't use it if you don't know how to check if you can trust that this application is not stealing your secret and sending some place you don't expect.\
As a rule of thumb you should not trust this app and you should not use it.\
But if you do, at least run it locally, where one can control foreground and background activity.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the server mode.\
Express serving the React App, be sure to build React app first.\
Default port 5000, e.g. http://localhost:5000

### `npm run dev start`

Runs the app in the dev mode for both frontend and backend. Hot swap code working for both sides.\
Backend running on port 5000.\
Frontend running on port 3000.\
React proxy set to http://localhost:5000 \
If you want to hotswap React, be sure to start on 3000, otherwise... be sure to run `npm run build` first.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.\
Sorry. No tests so far.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).