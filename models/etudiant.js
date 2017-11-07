var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    intro: {
        type: String,
    },
    email: {
        type: String, 
        required: true,
    },
    departement: {
        type: String,
    },
});

module.exports = mongoose.model('Etudiant',schema);