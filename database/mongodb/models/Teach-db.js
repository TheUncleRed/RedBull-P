const { model, Schema} = require('mongoose');

module.exports = model(
`Teach` ,
 new Schema({
memberId: {
    type: String
},

messageId: { 
    type: String
},

channelId: {
    type: String
},

TeachModals: {
    type: String
},

TestingStart: {
    type: String
},

TestingDone1: {
    type: String
},

TestingDone2: {
    type: String
},
TestingDone3: {
    type: String
},

EndTesting: {
    type: String
},

Answer1: {
    type: String
},

Answer2: {
    type: String
},

Answer3: {
    type: String
},

Answer4: {
    type: String
},

Answer5: {
    type: String
},

Answer6: {
    type: String
},

Answer7: {
    type: String
},

Answer8: {
    type: String
},

Answer9: {
    type: String
},

Answer10: {
    type: String
},

Answer11: {
    type: String
},

Answer12: {
    type: String
},

Answer13: {
    type: String
},

Answer14: {
    type: String
},

Answer15: {
    type: String
}

})
)