require('dotenv').config();
const {Client,WebhookClient}=require('discord.js');
const client=new Client({
    partials:['MESSAGE','REACTION']
});//client is an instance of the class Client
const webhookclient=new WebhookClient(
process.env.WEBHOOK_ID,
process.env.WEBHOOK_TOKEN,
)
const prefix='$';

client.on('ready',()=>{
    console.log(client.user.tag +  ' has logged in');

});

client.on('message',async (message)=>{
    if(message.author.bot===true) return;
    if(message.content.startsWith(prefix)){
        const [cmd_name,...args]=message.content.trim().substring(prefix.length).split(/\s+/);
        console.log(cmd_name);
        console.log(args);


        if(cmd_name==='kick'){
            if (message.member.hasPermission('KICK_MEMBERS')) return message.reply('you donot have permissions')
            if (args.length==0)
                return message.reply("please provide an id");
                

            
            const member=message.guild.members.cache.get(args[0]);
            if(member){
                member.kick().then((member)=>{
                    message.channel.send("a member was kicked");
                }).catch((err)=>{
                    message.channel.send("i donot have permissions!!");
                });

            }
           // message.channel.send("kicked the user");
            console.log(member);//guild means server
        }else if(cmd_name==='ban'){
            if(!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply("you donot have permissions!!");
            if(args.length===0)
                return message.reply("pls provide an id!! ");
            try{
                const user = await message.guild.members.ban(args[0]);//results snowfakes//or an id//
                console.log(user);


            }catch(err){
                console.log(err);

            }
            }else if(cmd_name==='announce'){
                const msg=args.join(' ');
                console.log(msg);
                webhookclient.send(msg);

            }
        
    }
    //console.log(message.content);
    //console.log(message.author.tag);
   /* if(message.content==='Hello'){
      //  message.reply('hello there');
        message.channel.send("hey there");

    }*/

});
client.on('messageReactionremove',(reaction,user)=>{
    console.log("hello");//hello will show because wheneveer a messgae is sent the message is stored in cache//
    const member=reaction.message.guild.members.cache.get(user.id);
    const {name}=reaction.emoji();
if(reaction.message.id===''){
    switch(name){
        case 'apple':
            member.roles.remove('');
            break;
        case '':
            member.roles.remove('');
            break;
        case '':
            member.roles.remove('');
            break;
        
        
    }
    //unicode emojis donot have ids so we check their name
}
});
client.on('messageReactionremove',(reaction,user)=>{
    console.log("hello");//hello will show because wheneveer a messgae is sent the message is stored in cache//
    const member=reaction.message.guild.members.cache.get(user.id);
    const {name}=reaction.emoji();
if(reaction.message.id===''){
    switch(name){
        case 'apple':
            member.roles.remove('');
            break;
        case '':
            member.roles.remove('');
            break;
        case '':
            member.roles.remove('');
            break;
        
        
    }
    //unicode emojis donot have ids so we check their name
}
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
//client.login(process.env.DISCORD_BOT_2);

//instead of .catch use async//
//DISCORD_BOT_2=NzUyMDg4NzI3NzAyMjA4NTIz.X1SjNQ.NFU74gKgLzeUCGGd3lNOU7d83KE;

