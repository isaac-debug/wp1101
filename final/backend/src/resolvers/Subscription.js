// broadcast the message to another one in the chatRoom
const Subscription = {
  clubMessage: {
    subscribe(parent, { clubName}, { db, pubsub }, info) {
        return pubsub.asyncIterator(`Message ${clubName}`);
    },
  },
  eventMessage: {
    subscribe(parent, { clubName, name}, { db, pubsub }, info) {
        const eventName = clubName + "_" + name
        return pubsub.asyncIterator(`Message ${eventName}`);
    },
  },
  club:{
    subscribe(parent, {name}, { db, pubsub }, info) {
      return pubsub.asyncIterator(`Club ${name}`);
    },
  },
  updateUser:{
    subscribe(parent, {userName}, { db, pubsub }, info) {
      return pubsub.asyncIterator(`User ${userName}`);
    },
  },
};
export { Subscription as default };

