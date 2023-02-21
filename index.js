require('dotenv').config();
const nodemailer=require('nodemailer');
const telegraf=require('telegraf');

const bot=new telegraf(process.env.BOT_TOKEN);

var transporter=nodemailer.createTransport({
 service:'gmail',
 auth:{
  user:process.env.MAIL,
  pass:process.env.APP_PASS
 }
});

var mailOptions={
 from:process.env.MAIL,
 to:" ",
 subject:" ",
 text:" "
};

bot.start((ctx)=>{
 ctx.reply("Hi!!..I am Telegram mail bot\nI send text mails to required mail address..Follow the steps given below to send a mail\n/help for more help\n/to-along with the command followed by space enter destination mail id\n/sub-along with the command followed by space enter the subject of the mail\n/compose-along with the command followed by space enter body of the mail\n/send-To send the mail");
});

bot.command('to',(ctx)=>{
 var toMail=ctx.message.text;
 var data=toMail.split('/to ');
 mailOptions.to=data[1];
});

bot.command('/sub',(ctx)=>{
 var subject=ctx.message.text;
 var data=subject.split('/sub ');
 mailOptions.subject=data[1];
});

bot.command('compose',(ctx)=>{
 var body=ctx.message.text;
 var data=body.split('/compose ');
 mailOptions.text=data[1];
});

bot.command('send',(ctx)=>{
 transporter.sendMail(mailOptions,function(err,info){
  if(err){
   ctx.reply("Failed to send\n"+err);
  }else{
   ctx.reply("Mail sent successfully to "+mailOptions.to);
  }
 });
});

bot.launch();

