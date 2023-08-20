import { Schema, model, Types } from "mongoose";
import { langs } from "../utils/constans.js";

const AuthorSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    date_of_death: {
      type: Date,
      default : null
    },
    country: {
      type: String,
    },
    bio: [{
      text: String,
      lang: {
        type: String,
        enum: langs,
      },
    }],
    img_link : {
        type : String 
   },
    category: {
      type: Types.ObjectId,
      ref: "Categories",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Authors", AuthorSchema);
