var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');


bot.onText(/^today/i, function (msg) {
    var name = msg.from.first_name;
    var request = require('request');
    var cheerio = require('cheerio');

    var url = 'http://www.cwb.gov.tw/V7e/forecast/taiwan/Taipei_City.htm';
    request(url, function(err, res, body){
        // 去跟中央氣象局的網站要資料

        var $ = cheerio.load(body);
        // 把要到的資料放進 cheerio

        var weather = []
        $('.FcstBoxTable01 tbody tr').each(function(i, elem){
            weather.push($(this).text().split('\n'));
        });
        // 語法都跟 jquery 一樣
        // 找到 class = "FcstBoxTable01"
        // 再找標籤 <tbody>
        // 取得裡面的每一個 <tr>
        // 取文字部分分行之後放進 weather
        //console.log(weather);
        var output = [];

        for(var i=0 ; i<weather.length ; i++){
            output.push({
                time: weather[i][1].substring(2).split(' ')[0],
                temp: weather[i][2].substring(2),
                rain: weather[i][6].substring(2)
            });
        }
        for(var i=0 ; i<output.length ; i++){
            var time = output[i].time;
            var temp = output[i].temp;
            var rain = output[i].rain;
            var str = 'Taipei City' + time + '，Temperature ' + temp + '℃  ,Probability of Precipitation ' + rain;
            console.log(str);
            bot.sendMessage(msg.chat.id, 'Hello, ' + name + '! ' + str).then(function () {
            });
        }
    });
/*  bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(function () {
    // reply sent!
  });*/
});

module.exports = bot;
