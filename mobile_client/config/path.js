//configure paths here!

const paths = {
    local: 'http://localhost:5000',
    production: 'https://ftp-crm.herokuapp.com'
}

//not sure if this will work, but hey why not try??
if (process.env.NODE_ENV === 'production') {
    module.exports = paths.production;
} else {
    module.exports = paths.local;
}