const { model, Schema} = require('mongoose');

module.exports = model( 
`mutes` ,
new Schema({
userId: {
    type: String
},

reason: {
    type: String
},

type: {
    type: String
},

time: {
    type: Date
}

}))