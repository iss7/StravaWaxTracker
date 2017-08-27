# StravaWaxTracker
## How to run
*`git clone https://github.com/iss7/StravaWaxTracker.git`
*`cd StravaWaxTracker`
*`npm install`
*`node server.js` OR (watching files and reloading for development) `npm install -g nodemon; nodemon server.js`
*Requires environment variables STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, and SESSION_SECRET which can be stored in a file called .env
*Requires mongo to be running as well, presumably using `mongod`

## Development Plan
### Frameworks:
* Backend: Node.js
* Frontend: React
* Database: MongoDB

### APIs:
* Strava (user login, activity data)
* Weather? (estimate snow abrasiveness)
* Texting API (Twilio?)
* Email (probably don't need an API, more like a plugin)

### Tasks:
#### Done:
* Decide on development environment
* Allow user to login with Strava
#### TODO:
* Check if user has authenticated previously with Strava
* Get user's strava activities
* Process strava activities to determine when to wax
* Contact user and allow for a response
* Persistent storage of user session in cookies
* Figure out why mongo is allowing duplicate records despite a unique constraint
* Deploy to web
* ...and many more...

## Credit
*Based off of: git@github.com:scotch-io/node-todo
*In the tutorial: https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular