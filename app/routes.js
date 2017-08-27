var Todo = require('./models/todo');
var User = require('./models/user');
var passport = require('passport')

module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // get all users
    app.get('/api/users', function(req, res) {

        // use mongoose to get all users in the database
        // https://stackoverflow.com/questions/13065121/selecting-particular-fields-in-mongoosejs
        User.find({}, req.query.fields || 'name email phone_number', function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });

    // Setting the strava oauth routes
    app.get('/auth/strava',
        passport.authenticate('strava'));

    app.get('/auth/strava/callback',
        passport.authenticate('strava', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
    );

    app.get('/login', function(req, res) {
        if (req.user) {
            res.redirect('/');
        }
        else {
            res.render('login.html')
        }
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        User.find({}, function(err, users) {
            console.log(users);
        });
        if (req.user) {
            res.sendfile('./public/home.html'); // load the single view file (angular will handle the page changes on the front-end)
        }
        else {
            res.redirect('/login');
        }
    });
};