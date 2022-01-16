import mongoose from "mongoose";
const {Schema} = mongoose

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  // departmentLevel: { type: String, required: true },
  email: { type: String, required: true },
  clubs: [{ type: String, required: true }],
});

const ClubSchema = new Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  introduction: { type: String, required: true },
  invitation: { type: String, required: true },
  time: { type: String, required: true },
  members: [{user:{ type: mongoose.Types.ObjectId, ref: "User"}, 
            identity:{type:Boolean, required:true}}], 
            // true:administrator, false:normal member
  events: [{ type: mongoose.Types.ObjectId, ref: "Event"}],
  chatRoom: [{ type: mongoose.Types.ObjectId, ref: "Message"}]
});
const EventSchema = new Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  location: { type:String, required: true},
  introduction: { type: String, required: true },
  host: { type: String, required: true},
  active: {type: Boolean, required: true},
  members: [{user:{ type: mongoose.Types.ObjectId, ref: "User"}, 
            identity:{type:Boolean, required:true}}], 
            // true:host, false:normal member
  chatRoom: [{ type: mongoose.Types.ObjectId, ref: "Message"}]
});

const MessageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);
const ClubModel = mongoose.model("Club", ClubSchema);
const EventModel = mongoose.model("Event", EventSchema)
const MessageModel = mongoose.model("Message", MessageSchema)
export {UserModel, ClubModel, EventModel, MessageModel}

