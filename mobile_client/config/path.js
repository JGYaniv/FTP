//configure paths here!

const paths = {
    local: 'http://localhost:5000',
    production: 'https://ftp-crm.herokuapp.com'
}

//local path is buggy, seems to be more stable when using the herokuapp
// if (process.env.NODE_ENV === 'production') {
    // module.exports = paths.production;
// } else {
//     module.exports = paths.local;
// }

module.exports = paths.production;
