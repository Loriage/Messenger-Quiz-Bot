'use strict';
const BootBot = require('bootbot');
const config = require('config');
const quiz= require('./quiz');
const menu= require('./menu');
require('dotenv').config();

const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

function parse(index) {
    var question = {
        "question": "",
        "response": []
    };
    var line = quiz[index - 1];

    question["question"] = line.split('\"')[1];
    
    line = line.split("\"")[2]
            .substring(1)
            .replace(/ /g, '');

    line.split(',').forEach(function (e) {
        var val = e.split(':');
        question["response"].push({ value: val[0], goto: val[1] });
    });
    return question;
}

const askQuestion = (convo) => {
  if (!this.index) this.index = 1;
  const tab = parse(this.index);
  
  const question = () => (
    convo.say({
      text: tab.question,
      quickReplies: [tab.response[0].value, tab.response[1].value]
    })
  );
  const answer = (payload, convo) => {
    const options = { typing: true };
    if (payload.message.text === tab.response[0].value) {
      this.index = tab.response[0].goto;
    } else {
      this.index = tab.response[1].goto;
    }
    askQuestion(convo);
  };
  convo.ask(question, answer);
  return this.index;
};
  
const newSessionMenu = (payload, chat) => {
  const message = `Let's go!`;
  const options = { typing: true };
  chat.say(message, options)
   .then(() => chat.conversation(askQuestion));
};
  
const helpMenu = (payload, chat) => {
  const options = { typing: true };
  chat.say(menu[0], options)
    .then(() => chat.say(menu[1], options));
};
  
bot.hear([`Go`, /let(')?s play/i], newSessionMenu);
  
bot.hear(['help', 'help me'], helpMenu);
  
bot.setGetStartedButton((payload, chat) => {
  const options = { typing: true };
 
  chat.say(menu[2], options)
    .then(() => chat.say(menu[3], options));
});
  
bot.setPersistentMenu([
  { type: 'postback', title: 'Start', payload: 'MENU_START' },
  { type: 'postback', title: 'Help', payload: 'MENU_HELP' }
]);

bot.on('postback:MENU_START', newSessionMenu);
bot.on('postback:MENU_HELP', helpMenu);

bot.start(process.env.PORT || 3000);