//configure paths here!

const paths = {
    local: 'http://192.168.1.177',
    production: 'https://ftp-crm.herokuapp.com'
}

//not sure if this will work, but hey why not try??
// if (process.env.NODE_ENV === 'production') {
    module.exports = paths.production;
// } else {
//     module.exports = paths.local;
// }