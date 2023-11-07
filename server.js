const dotenv = require('dotenv');
dotenv.config();
const TelegramBot = require('node-telegram-bot-api');
const telegramToken = process.env.TelegramToken
const bot = new TelegramBot(telegramToken, { polling: true });
const  nairaPayment = require('./nairapayment.js')
const dollarPayment = require('./dollarpayment.js')
const cryptoPayment = require('./crypto.js')
const mysql = require('mysql');
let menuChoice = {}
let sessions = {}


const db = mysql.createConnection({
  host:  process.env.host,
  port:  process.env.port,
  user:  process.env.user,
  password:  process.env.password,
  database: process.env.database
})


const id = 1
function sendMessage(chatId, message) {
    return new Promise((resolve, reject) => {
      bot.sendMessage(chatId, message)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Welcome to 2SettleHQ!, my name is Wálé, i am 2settle virtual assistance, chat me up with 'hello Wálé'`);
  })

bot.onText(/hello|hi|hey/i, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name
 
    sessions[chatId] = {}
    
   db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return;
    }
    const raw = results.map((row) =>  `${row.rate}`);
   
    const  rate = raw.toString()
    
    
    const message = `Today Rate: N${rate}/ per $1 \n\nWelcome to 2SettleHQ ${firstName}, how can i help you today?`;

    
       const menuOptions = [
        '1. Transfer money',
        '2. Make payment',
        '3. Request for paycard',
        '4. Be a merchant',
        '5. Customer support'
      ];

      const message2 = `Here is your menu:\n`+ menuOptions.join('\n');
      menuChoice[chatId] = 'mainMenu';
      sendMessage(chatId, message)
      .then(() => sendMessage(chatId, message2))
      .catch((error) => {
        console.error("Error sending messages:", error);
      });
})

})

bot.onText(/\d+/, (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (menuChoice[chatId] === 'mainMenu') {
      handleMainMenu(chatId, messageText);
    }else if (menuChoice[chatId] === 'subMenu') {
      handleSubMenu(chatId, messageText);
    }else if (menuChoice[chatId] === 'exitMenu') {
      handleExitMenu(chatId, messageText);
    }else if (menuChoice[chatId] === 'Selectcurrency') {
      nairaPayment.handleSelectCurrency(chatId, messageText,bot,menuChoice, sessions);
    }else if (menuChoice[chatId] === 'nairamount') {
      nairaPayment.handleNairaAmount (chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'selectnetwork') {
      nairaPayment.handleSelectNetwork(chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'btcpayment') {
      nairaPayment.handleBtc(chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'cryptopayment') {
      nairaPayment.handleCryptos(chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'AcctNo') {
      nairaPayment.handleAcctNo(chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'acctname') {
      nairaPayment.handleAcctName(chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'Unavailable') {
      nairaPayment.Unavailable(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'receivePayment') {
      nairaPayment.receivePayment(chatId, messageText,bot,menuChoice,sessions);
    }else if (menuChoice[chatId] === 'charges') {
      nairaPayment.charges(chatId, messageText,bot,menuChoice,db,sessions);
    }
    else if (menuChoice[chatId] === 'dollaramount') {
      dollarPayment.handleDollarAmount(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'dollarAcctNo') {
      dollarPayment.handleDollarAcctNo(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'dollaracctname') {
      dollarPayment.handlDollareAcctName(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'dollarUnavailable') {
      dollarPayment.handleDollarUnavailable(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'dollarReceivePayment') {
      dollarPayment.dollarReceivePayment(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'dollarcharges') {
      dollarPayment.dollarCharges(chatId, messageText,bot,menuChoice,db,sessions);
    }
    
    else if (menuChoice[chatId] === 'cryptoamount') {
      cryptoPayment.handleCryptoAmount(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'cryptoAcctNo') {
      cryptoPayment.handleCryptoAcctNo(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'cryptoacctname') {
      cryptoPayment.handleCryptoAcctName(chatId, messageText,bot,menuChoice,db,sessions);
    }else if (menuChoice[chatId] === 'cryptoUnavailable') {
      cryptoPayment.handleCryptoUnavailable(chatId, messageText,bot,menuChoice,db,sessions);
    }


    // }else if (menuChoice[chatId] === 'reward') {
    //   reward.rewards(chatId, messageText,bot,menuChoice,db);
    // }else if (menuChoice[chatId] === 'payment') {
    //   reward.payment(chatId, messageText,bot,menuChoice,db);
    // }else if (menuChoice[chatId] === 'network') {
    //   reward.network(chatId, messageText,bot,menuChoice,db);
    // }else if (menuChoice[chatId] === 'cryptoPayments') {
    //   reward.cryptopayment(chatId, messageText,bot,menuChoice,db);
    // }else if (menuChoice[chatId] === 'nairapay') {
    //   reward.nairapayment(chatId, messageText,bot,menuChoice,db);
    // }else if (menuChoice[chatId] === 'accoutname') {
    //   reward.accountName(chatId, messageText,bot,menuChoice,db);
    // }else if (menuChoice[chatId] === 'sendNaira') {
    //   reward.naira(chatId, messageText,bot,menuChoice,db);
    // }
   
  });





  function handleMainMenu(chatId, choice) {
    if(choice === '1' || choice === '2') {
      const menuOptions = [
        '1. Bitcoin (BTC)',
        '2. Ethereum (ETH)',
        '3. BINANCE (BNB)',
        '4. TRON (TRX)',
        '5. USDT',
        '0. Go back'

      ];
      bot.sendMessage(chatId, 'Pay with:\n' + menuOptions.join('\n'));
      menuChoice[chatId] = 'selectnetwork'
     }else if(choice === '3'){
       const menuOptions = [
           'Bank details',
           'Phone Number',
           'Address'
         ];
     bot.sendMessage(chatId, 'You will be directed to a KYC link, this details are required:\n' + menuOptions.join('\n'))
    .then(() => {
       const menuOptions = [
           '1. Continue',
           '2. Cancel'
         ];
     bot.sendMessage(chatId,  menuOptions.join('\n'));

     menuChoice[chatId] = 'subMenu';
   });
   }else if(choice === '4') {
   bot.sendMessage(chatId, 'This feature is coming soon!')
   .then(() => {
    const menuOptions = [
      '1. Transfer money',
      '2. Make payment',
      '3. Request for paycard',
      '4. Be a merchant',
      '5. Customer support'
    ];
         bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
        });
         menuChoice[chatId] = 'mainMenu';
    }else if(choice === '5'){
      bot.sendMessage(chatId, 'click this link: https://support.2settle.io, to file your complaint to a customer support')
        .then(() => {
                const menuOptions = [
                    '1. Completed',
                    '2. Exit' 
                  ];
              bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
              menuChoice[chatId] = 'exitMenu'
            });
     }
     else{
      const message = 'enter a valid options provided. Try again'
      bot.sendMessage(chatId, message);
    }
    }
     
    function handleSubMenu(chatId, choice){
         if(choice === '1'){
            const link = `click this link: https://vendor.2settle.io`
            bot.sendMessage(chatId, link)
            .then(() => {
                const menuOptions = [
                    '1. Completed',
                    '2. Exit' 
                  ];
              bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
              menuChoice[chatId] = 'exitMenu'
            });
          }else if(choice === '2'){
             bot.sendMessage(chatId, `Will you like to do something else?`)
            .then(() => {
              const menuOptions = [
                '1. Transfer money',
                '2. Make payment',
                '3. Request for paycard',
                '4. Be a merchant',
                '5. Customer support'
              ];
        
        
           bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
         });
           menuChoice[chatId] = 'mainMenu';
          }
     }
     function handleExitMenu(chatId, choice){
       if(choice === '1'){
         bot.sendMessage(chatId, `Thank you for completing the process to your selected menu. will you like to do something else?`)
            .then(() => {
              const menuOptions = [
                '1. Transfer money',
                '2. Make payment',
                '3. Request for paycard',
                '4. Be a merchant',
                '5. Customer support'
              ];
        
        
           bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
     
         });
          menuChoice[chatId] = 'mainMenu';
        }else if(choice === '2'){
         bot.sendMessage(chatId, `will you like to do something else?`)
         .then(() => {
          const menuOptions = [
            '1. Transfer money',
            '2. Make payment',
            '3. Request for paycard',
            '4. Be a merchant',
            '5. Customer support'
          ];
    
    
        bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
  
      });
       menuChoice[chatId] = 'mainMenu';
    } 
  } 


