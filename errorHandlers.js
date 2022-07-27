
// Error handler for handling non-existent/undefined routes
const handleFourOFour = (req, res, next) => {

    console.log('404 error handler called');

    //create new custom error
    const err = new Error('err');
    err.status = 404;
    err.message = 'Oops, page not found. Looks like that route does not exist.';

    // Pass error to global error handler
    next(err);
}

// Global error handler
const handleGlobalError = (err, req, res, next) => {

    if (err) {
        console.log('Global error handler called', err);
    }

    if (err.status === 404) {
        // res.status(404).render('not-found', { err });
        res.status(404).render('err', { err });
    } else {
        err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
        res.status(err.status || 500).render('error', { err });
        // res.status(err.status || 500);
    }
};

    //from P: Importing/Exporting modules
    // console.log('handling global err...');
    // console.log(err);

    // // Set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // // Set error status and send error message to the page 
    // res.status(err.status || 500);
    // res.send(err.message); 

module.exports = { handleFourOFour, handleGlobalError };