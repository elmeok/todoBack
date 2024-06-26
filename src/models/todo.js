const mongoose = require('mongoose');
const validator = require('validator');

const Todo = mongoose.model('Todo', {
    title :{
        type : String,
        required: true,
        validate(v){
            if(!validator.isLength(v, {min : 4})) throw new Error('le titre doit être supérieur à 4 caractères');
        }
    },
    description : {
        type:String,
        required:false,
    },
    status : {
        type:String,
        required:false,
    },
});

module.exports = Todo;