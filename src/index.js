const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const axios = require("axios");
const cheerio = require("cheerio");

require("dotenv").config();

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const bot = new TelegramBot(TOKEN, { polling: true });

const url = "https://www.codewars.com/kata/latest"

// const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

cron.schedule("*/10 * * * * *", () => {
    axios.get(url).then(({ data }) => {
        const $ = cheerio.load(data);
        const challenger = $(".item-title a")[0].attribs.href;       
        bot.sendMessage(CHAT_ID, `Buen dia y Bendiciones\nReto del dia: https://www.codewars.com${challenger}`);
    }).catch(err => console.log(err));
});
