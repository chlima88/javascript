process.env["NTBA_FIX_319"] = 1

require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
const TelegramBot = require('node-telegram-bot-api');

//Note: Your Alphavantage API key will be visible in the network traffic, this should not be used for public projects.
const alphavantage_key = process.env.ALPHAVANTAGE_APIKEY;
const alpha = require('alphavantage')({key: alphavantage_key})

// Created instance of TelegramBot
const bot = new TelegramBot(token, {polling: true});

// In-memory storage
const URLs = [];
const URLLabels = [];
let tempSiteURL = '';


bot.onText(/\/stock (.*)/, (msg, match) =>{
    
    const interval = '60min'
    const chatId = msg.chat.id;
    const symbol = match[1]+'.SAO'

    alpha.data.intraday(symbol,'','',interval).then(data => { 
        TimeSeriesKey = Object.keys(data)[1]
        LastDataKey = Object.keys(data[TimeSeriesKey])[0]

        res = data[TimeSeriesKey][LastDataKey]

        msg = `${symbol.toUpperCase()} - Cotação atual ${res["1. open"]}`

        
        bot.sendMessage(chatId,msg);

    });

    
    
} )

// Listener (handler) for telegram's /bookmark event
bot.onText(/\/bookmark/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    if (url === undefined) {
        bot.sendMessage(chatId,'Please provide URL of article!');
        return;
    }

    URLs.push(url);
    bot.sendMessage(chatId,'URL has been successfully saved!');
});



bot.onText(/\/label/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];

    if (url === undefined) {
        bot.sendMessage(chatId,'Please provide URL of article!');
        return;
    }

    tempSiteURL = url;
    bot.sendMessage(chatId,'URL has been successfully saved!',
        {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: 'Development',
                        callback_data: 'development'
                    }, {
                        text: 'Lifestyle',
                        callback_data: 'lifestyle'
                    }, {
                        text: 'Other',
                        callback_data: 'other'
                    }
                ]]
            }
        }
    );
});

// Listener (handler) for callback data from /label command
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const category = callbackQuery.data;

    URLLabels.push({
        url: tempSiteURL,
        label: category,
    });

    tempSiteURL = '';

    bot.sendMessage(message.chat.id, `URL has been labeled with category "${category}"`);
});



// Listener (handler) for showcasing different keyboard layout
bot.onText(/\/keyboard/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Alternative keybaord layout', {
        'reply_markup': {
            'keyboard': [['Sample text', 'Second sample'], ['Keyboard'], ['I\'m robot']],
            resize_keyboard: true,
            one_time_keyboard: true,
            force_reply: true,
        }
    });
});



// Inline keyboard options
const inlineKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'YES',
                    callback_data: JSON.stringify({
                        'command': 'mycommand1',
                        'answer': 'YES'
                    })
                },
                {
                    text: 'NO',
                    callback_data: JSON.stringify({
                        'command': 'mycommand1',
                        'answer': 'NO'
                    })
                },
            ]
        ]
    }
};

// Listener (handler) for showcasing inline keyboard layout
bot.onText(/\/inline/, (msg) => {
    bot.sendMessage(msg.chat.id, 'You have to agree with me, OK?', inlineKeyboard);
});



// Keyboard layout for requesting phone number access
const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [[{
            text: "My phone number",
            request_contact: true,
            one_time_keyboard: true
        }], ["Cancel"]]
    }
};

// Listener (handler) for retrieving phone number
bot.onText(/\/phone/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Can we get access to your phone number?', requestPhoneKeyboard);
});



// Handler for phone number request when user gives permission
bot.on('contact', async (msg) => {
    const phone = msg.contact.phone_number;
    bot.sendMessage(msg.chat.id, `Phone number saved: ${phone}`);
})


// Listener (handler) for telegram's /start event
// This event happened when you start the conversation with both by the very first time
// Provide the list of available commands
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        `
            Welcome at <b>ArticleBot</b>, thank you for using my service
      
            Available commands:
        
            /bookmark <b>URL</b> - save interesting article URL
        `, {
            parse_mode: 'HTML',
        }
    );
});
