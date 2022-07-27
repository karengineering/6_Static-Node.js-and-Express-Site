
const express = require('express');
const app = express(); //returns an Express app
const { projects } = require('./data.json'); //destructuring assignment to unpack the projects array in data.json and assign it to the var projects
// Import 404 and global error handlers
// const errorHandlers = require('./errorHandlers');

//view engine setup
app.set('view engine', 'pug');

//adds static middleware
// express.static is a piece of middleware built into express, use it to find/return a static file requested by template like an img
// with the static setup, Express makes the public folder contents available @the root of the app
// app.use(express.static('public'));
app.use('/static', express.static('public')); //serves the public folders content at /static ...that wayy all static assets load at /static ...static/css static/images
// ^^^routing static server to a specific location prevents any folders or files names in the public directory from conflicting w/ the app
// Serve static files from the root of the application
// app.use( express.static(path.join(__dirname, 'public')) )
//  Serve static files by routing the static server to '/static'
// app.use( '/static', express.static(path.join(__dirname, 'public')) )

app.get('/', (req, res) => {
    //pass all proj data to 'index' template
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    //return proj obj whose id value matches the id param
    const project = projects.find( ({ id }) => id === +projectId ); 

    if(project) {
        //pass the proj data to the 'project' template
        res.render('project', { project });
    } else {
        // res.sendStatus(404);
        // const err = new Error();
        const err = new Error(`Looks like the quote you requested doesn't exist.`);
        err.status = 404;
        // err.message = `Looks like the quote you requested doesn't exist.`
        next(err);
        // errorHandlers.handleFourOFour();
    } 
});

// Pass 404 and global error handlers to the app
// app.use(errorHandlers.handleFourOFour);
// app.use(errorHandlers.handleGlobalError);

//404 Error Handler
app.use((req, res, next) => {
    console.log('404 error handler called');

    //create new custom error
    // const err = new Error('err');
    // err.status = 404;
    // err.message = 'Oops, page not found. Looks like that route does not exist.';

    // const err = new Error('err');
    const err = new Error('Oops, page not found. Looks like that route does not exist.');
    err.status = 404;
    // err.message = 'Oops, page not found. Looks like that route does not exist.';
    // console.log(err.message);
    // Pass error to global error handler
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // if (err) {
    //     console.log('Global error handler called', err);
    // }

    console.log('Global error handler called', err);

    // if (err.status === 404) {
    //     // res.status(404).render('not-found', { err });
    //     res.status(404).render('error', { err });
    // } else {
    // err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
    // res.status(err.status || 500).render('error', { err });
        // res.status(err.status || 500);
    // }

    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // res.status(err.status || 500);
    // res.render('error');
    // console.error(err.stack);
    // res.status(err.status || 500);
    // res.send(`Oops! It looks like something went wrong.`);

    // err.message = err.message || `Oops! It looks like something went wrong on the server.`;
    // err.status = err.status || 500;
    // console.error(err.stack);
    res.status(err.status || 500);
    res.send(`Oops! It looks like something went wrong.`);
    // res.send(err.message || `Oops! It looks like something went wrong on the server.`
});

app.listen(3000, () => {console.log('app is listening to port3000')});