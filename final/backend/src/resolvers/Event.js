const Event = {
    members(parent, args, { db }, info) {
      return Promise.all(
        parent.members.map(
          ({user, identity}) => {
              return {user:db.UserModel.findById(user), identity:identity}
          })
      )
      
    },
    chatRoom(parent, args, { db }, info) {
      return Promise.all(
        parent.chatRoom.map(
          (mId) => {
              return db.MessageModel.findById(mId)
          })
      )
      
    },
};
export default Event  