#Step-by-step

###Try bot locally

1. Create your own bot using Telegram's [BotFather](https://core.telegram.org/bots#3-how-do-i-create-a-bot) and grab your TOKEN.
2. Clone or download and unpack this repo.
3. Go to the app's folder using `cd ~/heroku-node-telegram-bot`
4. Run `npm install` (in some cases you will need to run this with sudo, you know, just the permissions).
5. Rename .env_example file into .env and set TOKEN to the value, you've got from the BotFather.
5. Run `npm run set_env` to set the environment variables from the .env file.
6. Run `npm start` and send smth to your bot.
7. After it says "hello" to you, open your first bottle of beer :beer:

Feel your awesomeness? :sunglasses:

###Deploy your bot to the heroku

1. Create the [Heroku account](https://heroku.com) and install the [Heroku Toolbelt](https://toolbelt.heroku.com/).
2. Login to your Heroku account using `heroku login`.
3. Go to the app's folder using `cd ~/heroku-node-telegram-bot`
4. Run `heroku create` to prepare the Heroku environment.
5. Run `heroku config:set TOKEN=SET HERE THE TOKEN YOU'VE GOT FROM THE BOTFATHER` and `heroku config:set HEROKU_URL=$(heroku info -s | grep web-url | cut -d= -f2)` to configure environment variables on the server.
6. Run `git add -A && git commit -m "Ready to run on heroku" && git push heroku master` to deploy your bot to the Heroku server.
7. Send smth to the bot to check out if it works ok.
8. Now you r twice awesome, open the second bottle of beer :beer:
