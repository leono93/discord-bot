const Discord = require('discord.js');
const weather = require('weather-js'); 
const key = require('./key.json').key;
const flags = require('./assets/emojis/flags.json').flags;

const bot = new Discord.Client();

const prefix = '.';  

bot.on('message', message => {

    let msg = message.content.toUpperCase();  
    let cont = message.content.slice(prefix.length).split(" "); 
    let args = cont.slice(1); 


    if (msg.startsWith(prefix + 'WEATHER')) {     
        if (args.length < 1) {
            message.channel.send('Maybe you should try a city 😅')
            return;
        }

        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
            if (!result.length || err) {
                message.channel.send(`Weather not available for that place 😅 (${err})`);
                return;
            }
            var current = result[0].current; 
            var location = result[0].location; 
            var currCountry = flags.find(f => f.country === location.name.split(", ")[1]);
            var flag = !!currCountry ? String.fromCodePoint(...currCountry.values) : '';
            var time = new Date();
            var pic = time.getHours() >= 6 && time.getHours <= 12 ? 'https://data.whicdn.com/images/236177143/original.jpg' : current.imageUrl;

            var embed = new Discord.MessageEmbed()
            .setDescription(`${flag} ${location.name} ${flag}`)
            .setAuthor(`Weather for ${current.observationpoint}`) 
            .setThumbnail(pic) 
            .setColor(0x00AE86) 
            .addField('Day', `${current.shortday}`, true)
            .addField('Observation Time', `${current.observationtime}`, true)
            .addField('Temperature',`${current.temperature} °C`, true)
            .addField('Feels Like', `${current.feelslike} °C`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true);
            
            message.channel.send({embed});
        });
    }

});

bot.on('ready', () => {

    console.log('Bot started.');

});

bot.login(key);