import bcrypt from 'bcryptjs'
const Query = {
  async user(parent, {userName,password}, { db }, info) {
    //check log in
    const user = await db.UserModel.findOne({userName:userName})
    if (!user) return {status:"USER_NOT_FOUND"}
    const res = await bcrypt.compare(password, user.password)
    console.log(res)
    if (res) return {status:"SUCCESS", userData: user}
    return {status: "INVALID_PASSWORD"}

  },
  async updateUser(parent, {userName}, {db}, info){
    const user = await db.UserModel.findOne({userName:userName})
    return user
  },
  async clubs(parent, args, { db }, info) {
    //query all clubs
    return db.ClubModel.find()
  },
  async club(parent, {name}, { db }, info) {
    //query one club
    console.log(name)
    return db.ClubModel.findOne({name:name})
  },
  async event(parent, {clubName, name}, { db }, info) {
    //query one event
    const eventName = clubName + "_" + name
    return db.EventModel.findOne({name:eventName})
  },
  async event(parent, {clubName, name}, { db }, info) {
    //query one event
    const eventName = clubName + "_" + name
    return db.EventModel.findOne({name:eventName})
  },
};

export { Query as default };
