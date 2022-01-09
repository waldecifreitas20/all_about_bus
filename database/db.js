const mongoose = require('mongoose')
const database = 'all_of_bus'

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost/${database}`).then(() => {
    console.log('DATABASE HAS BEEN CONECTED WITH SUCCESS');
}).catch(err => {
    console.error('AN ERROR HAS BEEN OCURRED. DETAILS: ' + err);
})

module.exports = mongoose