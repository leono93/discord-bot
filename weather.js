const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js'); 

const prefix = '.';  

bot.on('message', message => {

    let msg = message.content.toUpperCase();  
    let cont = message.content.slice(prefix.length).split(" "); 
    let args = cont.slice(1); 


    if (msg.startsWith(prefix + 'WEATHER')) { 
       
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
            if (err) message.channel.send(err);

            if (result.length === 0) {
                message.channel.send('Enter a location asshole') 
                return; 
            }

            var current = result[0].current; 
            var location = result[0].location; 

            const embed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`) 
                .setAuthor(`Weather for ${current.observationpoint}`) 
                .setThumbnail(current.imageUrl) 
                .setColor(0x00AE86) 
                .addField('Day', `${current.shortday}`, true)
                .addField('Observation Time', `${current.observationtime}`, true)
                .addField('Temperature',`${current.temperature} °C`, true)
                .addField('Feels Like', `${current.feelslike} °C`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                message.channel.send({embed});
        });
    }

});

bot.on('ready', () => {

    console.log('Bot started.');

});

bot.login('token xd');