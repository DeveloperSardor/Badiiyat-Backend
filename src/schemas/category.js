import { Schema,model, Types } from "mongoose";


const CategorySchema = new Schema({
// forWhom : {
//     type : String,
//     enum : ['author', 'book']
// },
category : {
    type : String
}
}, {
    timestamps : true
})

export default model('Categories', CategorySchema)