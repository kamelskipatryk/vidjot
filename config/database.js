if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI:
    'mongodb://patryk:patryk123@ds123012.mlab.com:23012/vidjot-prod'}
} else {
    module.exports = {mongoURI: 'mongodb://127.0.0.1:27017/vidjot-dev'}
}