This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### How to start backend on your first time:
```
cd backend
virtualenv env
source env/bin/activate
cd env
pip install -r requirements.txt
(for the mysqlclient, if you face issues, you run) env LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib" pip install mysqlclient
cd ..
cd fyp_dip_ms/
python manage.py runserver
```

## How to start backend subsequently:
```
cd backend
source env/bin/activate
cd fyp_dip_ms/
python manage.py runserver
```

## Issues that needs to be fixed:
1. Comment box: ~~axios~~ or pull in server like express & socket.io?
2. How to 'focus' when you click on an event? Look at alternatives to history.push else Link? Alternatively look at createRef mapped -- else you might want to remove "Hash Link" in yr dependencies
3. ~~Top bar of weekly report table must be able to stay at the top and not disappear as you scroll~~
4. Meetings page
5. Main calendar "paper" view -- add the relevant details in the paper view and also show timing for events
6. Updating meetings
7. Fix "event form" with the timings (select timing bar) and posting of the details -- currently choosing other dates is not possible once you've entered the event form
8. Backend should be able to update statuses (e.g. late submission detection)
9. Nitpicking: weekly report header try and align w the content
10. Nitpicking: meetings header try and align w the content
11. Nitpicking: clean up the props sent to weeklyreportsubmissionpage & weeklyreportcommentbox pls
12. Double check if it is possible to POST/update to backend alr or not