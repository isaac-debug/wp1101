const Mutation = {
  async createUser(parent, {userName, password, nickname, email,}, {db, pubsub}, info){
    const checkUser = await db.UserModel.findOne({userName:userName})
    const checkEmail = await db.UserModel.findOne({email:email})
    if (checkUser) return {status:"USER_ALREADY_EXISTED"}
    else if (checkEmail) return {status: "EMAIL_ALREADY_EXISTED"}
    const newUser =  new db.UserModel({
      userName:userName,
      password:password,
      nickname:nickname,
      email:email,
      clubs:[]
    });
    await newUser.save()
    console.log("user created: ",userName)
    return {status: "SUCCESS", userData: newUser}
  },
  async createClub(parent, {name, host, invitation, introduction, time}, {db, pubsub}, info){
    const checkClub = await db.ClubModel.findOne({name:name})
    if (checkClub) return {status:"CLUB_ALREADY_EXISTED"}
    const initialUser = await db.UserModel.findOne({userName:host})
    if (!initialUser) return {status:"HOST_NOT_FOUND"}
    const newClub = new db.ClubModel({
      name:name,
      host:host,
      introduction:introduction,
      invitation:invitation,
      time:time,
      members:[{user:initialUser,identity:true}],
      events:[],
      chatRoom:[]
    })
    initialUser.clubs.push(name)
    await newClub.save()
    await initialUser.save()
    pubsub.publish(`User ${host}`,{
      updateUser: initialUser
    })
    console.log("club created: ",name)
    return {status: "SUCCESS", clubData: newClub}
  },

  async joinClub(parent, {name, userName, invitation}, {db, pubsub}, info){
    const checkClub = await db.ClubModel.findOne({name:name})
    if (!checkClub) return {status:"CLUB_NOT_FOUND"}
    const checkUser = await db.UserModel.findOne({userName:userName})
    if (!checkUser) return {status:"USER_NOT_FOUND"}
    let check_exist = false
    checkClub.members.map( ({user, identity}) => {
      if ((user.toString()===checkUser.id)){
        check_exist = true
      }
    })
    if (check_exist) return {status:"MEMBER_ALREADY_EXISTED"}
    // check invitation
    if (checkClub.invitation === invitation){
      checkClub.members.push({user:checkUser,identity:false})
      checkUser.clubs.push(name)
      pubsub.publish(`User ${userName}`,{
        updateUser: checkUser
      })
      await checkClub.save()
      await checkUser.save()
      return {status: "SUCCESS", clubData: checkClub}
    }
    else return{status:"INVALID_INVITATION"}
  },
  async createEvent(parent, {name, clubName, time, location, introduction, host, active}, {db, pubsub}, info){
    const eventName = clubName + "_" + name
    const checkEvent = await db.EventModel.findOne({name:eventName})
    if (checkEvent) return {status:"EVENT_ALREADY_EXISTED"}
    const initialUser = await db.UserModel.findOne({userName:host})
    if (!initialUser) return {status:"HOST_NOT_FOUND"}
    const checkClub = await db.ClubModel.findOne({name:clubName})
    if (!checkClub) return {status:"CLUB_NOT_FOUND"}
    const newEvent =  new db.EventModel({
      name:eventName,
      time:time,
      location:location,
      introduction:introduction,
      host:host,
      active:active,
      members:[{user:initialUser,identity:true}],
      chatRoom:[]
    });
    checkClub.events.push(newEvent)
    await newEvent.save()
    await checkClub.save()
    console.log("event created: ",name)
    pubsub.publish(`Club ${clubName}`,{
      club: checkClub
    })
    return {status: "SUCCESS", eventData: newEvent}
  },

  async joinEvent(parent, {name, userName, clubName}, {db, pubsub}, info){
    const eventName = clubName + "_" + name
    const checkClub = await db.ClubModel.findOne({name:clubName})
    if (!checkClub) return {status:"CLUB_NOT_FOUND"}
    const checkUser = await db.UserModel.findOne({userName:userName})
    if (!checkUser) return {status:"USER_NOT_FOUND"}
    const checkEvent = await db.EventModel.findOne({name:eventName})
    if (!checkEvent) return {status:"EVENT_NOT_FOUND"}
    let check_exist = false
    checkEvent.members.map( ({user, identity}) => {
      if ((user.toString()===checkUser.id)){
        check_exist = true
      }
    })
    if (check_exist)return {status:"MEMBER_ALREADY_EXISTED"}
    checkEvent.members.push({user:checkUser,identity:false})
    await checkEvent.save()
    pubsub.publish(`Club ${clubName}`,{
      club: checkClub
    })
    return {status: "SUCCESS", eventData: checkEvent}
  },

  async createClubMessage(parent, {clubName, sender, body}, {db, pubsub}, info){
    const checkClub = await db.ClubModel.findOne({name:clubName})
    if (!checkClub) return {status:"CLUB_NOT_FOUND"}
    const checkSender = await db.UserModel.findOne({userName:sender})
    if (!checkSender) return {status:"USER_NOT_FOUND"}
    const newMessage =  new db.MessageModel({
      sender: checkSender,
      body: body
    });
    checkClub.chatRoom.push(newMessage)
    await checkClub.save()
    await newMessage.save()
    console.log("message created: ",body)
    pubsub.publish(`Club ${clubName}`,{
      club: checkClub
    })
    pubsub.publish(`Message ${clubName}`,{
      clubMessage: {mutation:"CREATED", data:newMessage}
    })
    return {status: "SUCCESS", messageData: newMessage}
  },

  async createEventMessage(parent, {clubName,name, sender, body}, {db, pubsub}, info){
    const eventName = clubName + "_" + name
    const checkClub = await db.ClubModel.findOne({name:clubName})
    if (!checkClub) return {status:"CLUB_NOT_FOUND"}
    const checkEvent = await db.EventModel.findOne({name:eventName})
    if (!checkEvent) return {status:"EVENT_NOT_FOUND"}
    const checkSender = await db.UserModel.findOne({userName:sender})
    if (!checkSender) return {status:"USER_NOT_FOUND"}
    const newMessage =  new db.MessageModel({
      sender: checkSender,
      body: body
    });
    checkEvent.chatRoom.push(newMessage)
    await checkEvent.save()
    await newMessage.save()
    console.log("message created: ",body)
    pubsub.publish(`Club ${clubName}`,{
      club: checkClub
    })
    pubsub.publish(`Message ${eventName}`,{
      eventMessage: {mutation:"CREATED", data:newMessage}
    })
    return {status: "SUCCESS", messageData: newMessage}
  },
  async mutateClubInfo(parent, {userName, name, introduction, invitation, time}, {db, pubsub}, info){
    const checkClub = await db.ClubModel.findOne({name:name})
    if (!checkClub) return {status:"CLUB_NOT_FOUND"}
    const checkUser = await db.UserModel.findOne({userName:userName})
    if (!checkUser) return {status:"USER_NOT_FOUND"}
    let authorized = false

    checkClub.members.map( ({user, identity}) => {
      if ((user.toString()===checkUser.id) && (identity)){
        authorized = true
      }
    })
    if (!authorized) return {status:"NOT_AUTHORIZED"}
    if (introduction) checkClub.introduction = introduction
    if (time) checkClub.time = time
    if (invitation) checkClub.invitation = invitation
    await checkClub.save()
    pubsub.publish(`Club ${clubName}`,{
      club: checkClub
    })
    return {status:"SUCCESS", clubData:checkClub}
  },

  // async mutateMembers(parent, {userName, name, targetUser, methodType}, {db, pubsub}, info){
  //   const checkClub = await db.ClubModel.findOne({name:name})
  //   if (!checkClub) return {status:"CLUB_NOT_FOUND"}
  //   const checkUser = await db.UserModel.findOne({userName:userName})
  //   if (!checkUser) return {status:"USER_NOT_FOUND"}
  //   const checkTargetUser = await db.UserModel.findOne({userName:targetUser})
  //   if (!checkTargetUser) return {status:"USER_NOT_FOUND"}
  //   let authorized = false
  //   checkClub.members.map( ({user, identity}) => {
  //     if ((user.toString()===checkUser.id) && (identity)){
  //       authorized = true
  //     }
  //   })
  //   if (!authorized) return {status:"NOT_AUTHORIZED"}
  //   // modify user's club list and club's members list
  //   switch(methodType){
  //     case("DELETE"):
  //       // checkTargetUser.clubs.filter(club => club !== name)
  //       checkClub.members.filter( ({user, identity}) => {
  //         return {}
  //       })
  //       break
  //   }
  //   console.log(checkClub)
  //   await checkClub.save()
  //   return {status:"SUCCESS", clubData:checkClub}
  // }
  
}

export { Mutation as default };




