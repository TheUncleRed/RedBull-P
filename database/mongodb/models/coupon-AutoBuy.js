const { model, Schema} = require('mongoose');

module.exports = model(
'coupon' ,
new Schema({
guild: {
    type: String,
},

couponcode: {
    type: String
},

amount: {
    type: String
}

})
);