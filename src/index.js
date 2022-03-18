const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const axios = require("axios");
const cheerio = require("cheerio");

// Get load env variables
require("dotenv").config();

// Variables
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const TIME = process.env.TIME;

// Bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Link
const url = "https://www.codewars.com/kata/latest"

// Cron
cron.schedule(TIME, () => {
    // Get data
    axios.get(url).then(({ data }) => {
        // Get html
        const $ = cheerio.load(data);
        // Get link from a
        const challenger = $(".item-title a")[0].attribs.href;       
        // Send message
        bot.sendMessage(CHAT_ID, `Buen dia y Bendiciones\nReto del dia: https://www.codewars.com${challenger}`);
    }).catch(err => console.log(err));
});
