import { Schema,model, Types } from "mongoose";


const UserSchema = new Schema({
firstname : {
    type : String
},
lastname : {
    type : String
},
isAdmin : {
    type : Boolean,
    default : false,
},
email : {
    type : String,
    trim: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
img_link : {
type : String,
default : 'https://yt3.ggpht.com/ytc/AKedOLRnZ1AD08TRJrPs9ZG39oKUsYb9C1ceoUvDNlAubw=s900-c-k-c0x00ffffff-no-rj'
},
phone : {
    type : String,
    unique : true,
    match : [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Please fill a valid phone number']
},
password : {
    type : String
}
}, {
    timestamps : true
})

export default model('Users', UserSchema)