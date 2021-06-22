const cjs = require('comfy.js');
const axios = require('axios');
require('dotenv').config();


function ps3Msg(msg, icon, sound){
    axios.get(`http://192.168.1.143/notify.ps3mapi?msg=${msg}&icon=${icon}&snd=${sound}`);
    console.log(`http://192.168.1.143/notify.ps3mapi?msg=${msg}&icon=${icon}&snd=${sound}`);
}

cjs.onCommand = (user, command, message, flags, extra) =>{
    if(flags.broadcaster && command === "ps3-test"){
        console.log('Testing PS3 Connection');
        cjs.Say('Sent Test PS3 Message');
        ps3Msg('Testing Connection', 1, 5);
    }
}

cjs.onChat = (user, message, flags, self, extra) =>{
    if(message.includes('Cheers for the follow') == true){
        ps3Msg(message, 1, 5);
        console.log(message);
    }
}

cjs.onSub = (user, message, subTierInfo, extra)=>{
    ps3Msg(`Subscription from ${user}`, 12, 5);
}

cjs.onJoin = (user,self,extra)=>{
    ps3Msg(`${user} has joined the chat`, 12, 5);
}


cjs.Init(process.env.TWITCHUSER, process.env.OAUTH);