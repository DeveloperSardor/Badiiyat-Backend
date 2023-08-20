import { Schema,model, Types } from "mongoose";
import { langs } from "../utils/constans.js";

const BookSchema = new Schema({
title : {
    type : String
},
full_info : [{
    text : String,
    lang : {
        type : String,
        enum : langs
    }
}],
pages : {
    type : Number,
    min : [3, 'Minimum page 3!']
},
price : {
    type : Number
},
img_link : {
    type : String
},
author : {
    type : Types.ObjectId,
    ref : 'Authors'
},
category : {
    type : Types.ObjectId,
    ref : 'Categories'
}
}, {
    timestamps : true
})

export default model('Books', BookSchema)