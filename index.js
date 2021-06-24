const cjs = require('comfy.js');
const axios = require('axios');
require('dotenv').config();


function ps3Msg(msg, icon, sound){
    // Change the IP Address to the Address of your PS3
    axios.get(`http://192.168.1.143/notify.ps3mapi?msg=${msg}&icon=${icon}&snd=${sound}`);
    console.log(`http://192.168.1.143/notify.ps3mapi?msg=${msg}&icon=${icon}&snd=${sound}`);
}

cjs.onCommand = (user, command, message, flags, extra) =>{
    if(flags.broadcaster && command === "ps3-test"){
        console.log('Testing PS3 Connection');
        cjs.Say('Sent Test PS3 Message');
        ps3Msg('Testing Connection', 6, 5); //6 = Glowing Update Icon
    }
}

cjs.onChat = (user, message, flags, self, extra) =>{
    if(message.includes('Cheers for the follow') == true && user == "StreamElements"){
        ps3Msg(message, 1, 5); //1 = Friends Icon
        console.log(message);
    }
}


cjs.onReward = ( user, reward, cost, message, extra ) => {
    if(reward == "[PS3 ONLY] Send a message via PS3 Live"){
        ps3Msg(`${user}: ${message}`, 38, 5); //38 = Chat Bubble
    }
  }

cjs.onSub = (user, message, subTierInfo, extra)=>{
    ps3Msg(`Subscription from ${user}`, 12, 5); // 12 = Platnium Trophy
}

cjs.onJoin = (user,self,extra)=>{
    ps3Msg(`${user} has joined the chat`, 0, null); // 0 = Info Icon
}

try{
    cjs.Init(process.env.TWITCHUSER, process.env.EXTOAUTH);
    ps3Msg('Connected to Twitch using PS3-LIVE by ML-Astra', 50, 5); //50 = Connect Icon
}catch{
    // It doesn't like me removing this for some reason.
}
// Specify these either in a .env file or as exports.

