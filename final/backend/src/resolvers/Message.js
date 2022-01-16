const Message = {
    async sender(parent, args, { db }, info) {
        const sender = await db.UserModel.findById(parent.sender)
        return {nickname:sender.nickname, userName: sender.userName}
    },
};
export default Message  