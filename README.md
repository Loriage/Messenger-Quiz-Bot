# Messenger-Quiz-Bot
A simple Messenger quiz bot engine.

## Installation

Clone the repository
```git clone https://github.com/Loriage/Messenger-Quiz-Bot && cd Messenger-Quiz-Bot```

Use the package manager [npm](https://www.npmjs.com/) to install the Messenger Quiz Bot.

```npm install```

Rename the file .env.sample to .env and follow [this tutorial](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start) to get your Facebook app variables.

## Usage

Starting the bot

```npm start```
or
```node app.js```

You can add questions to the quiz by editing the "quiz.json" file following the format given as an example.

The format is as follows (don't put the "[]" in the json file):

```[X]:\"[Your question here]\", [FirstAnswer]:[Y], [SecondAnswer]:[Z]```

The first parametere, X, is the number of your question (if it's the first question, X will be equal at 1).

The second parameter is your question.

The third parameter is the First answer to you quiz (For example, it can be "Yes").

The fourth parameter, Y, is the question which your anwser lead (For example, if you answer yes, you can choose to then go to question 5, skipping the previous ones).

The fifth and sixth work in the same way as the two previous parameters.

Here is an real example:

```1:\"Do you live in USA?\", Yes:2, No:3```

## Authors

**Bruno "Loriage" Durand**
* [Github/Loriage](https://github.com/Loriage)
* [Twitter/Loriage](https://twitter.com/Loriage_)

**Vincent Ferrard**
* [Github/Vincent-Ferrard](https://github.com/Vincent-Ferrard)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
