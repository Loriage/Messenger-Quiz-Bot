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
      "response": {
        values: [],
        goto: [],
      }
  };
  var line = rgpd[index - 1];

  question["question"] = line.split('\"')[1];
  
  line = line.split("\"")[2]
          .substring(1);

  line.split(',').forEach(function (e) {
      var val = e.trim().split(':');
      question["response"]["values"].push(val[0]);
      question["response"]["goto"].push(val[1]);
  });
  return question;
}

const askQuestion = (convo) => {
  if (!this.index) this.index = 1;
  const tab = parse(this.index);
  const options = { typing: true };
  
  const question = () => {
    if (tab.response.values[0]) {
      convo.say({
        text: tab.question,
        quickReplies: tab.response.values,
      })
    } else {
      convo.say(tab.question, options)
    }
  };
  const answer = (payload, convo) => {
    const options = { typing: true };
    if (!payload.message) {
      this.index = 1;
      convo.end();
    }
    const isSameValue = (element) => element === payload.message.text;
    let i = tab.response.values.findIndex(isSameValue);
    if (i === -1) i = 0;
    this.index = tab.response.goto[i];

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