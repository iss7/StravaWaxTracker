# StravaWaxTracker
## How to run
*`git clone https://github.com/iss7/StravaWaxTracker.git`
*`cd StravaWaxTracker`
*`npm install`
*`node server.js` OR (watching files and reloading for development) `npm install -g nodemon; nodemon server.js`
*Requires environment variables STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, and STRAVA_REDIRECT_URI, which can be stored in a file called .env

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
* Setup development environment
* Allow user to login with Strava
* Get user's strava activities
* Process strava activities to determine when to wax
* Contact user and allow for a response
* Deploy to web
* ...and many more...

## Credit
*Based off of: git@github.com:scotch-io/node-todo
*In the tutorial: https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular