const dotenv = require('dotenv');
const twilio = require('twilio');
dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);


let serialNumber = [
    "BWB565620",
    "BWB132151",
    "BWB884648",
    "BWB468224",
    "BWB979491",
    "BWB305248",
    "BWB472222",
    "BWB731621",
    "BWB477152",
    "BWB761024",
    "BWB439903",
    "BWB657398",
    "BWB391894"
];

let serialCode;
let cryptoNetwork;
function rewards(chatId,choice, bot, menuChoice,db){
 if(serialNumber.includes(choice)){
    serialCode = choice
    const message = 'choose how you want to claim reward'
    bot.sendMessage(chatId, message)
    .then(()=> {
        const menu = [
        '1. Crypto',
        '2. Bank transfer'
        ]
        bot.sendMessage(chatId, 'Here is your menu:\n' + menu.join('\n'))
    })
    menuChoice[chatId] = 'payment'
    serialNumber = serialNumber.filter(e => e !== choice);
 }else {
    const message = 'Please enter valid serial Number'
    bot.sendMessage(chatId, message)
 }
}

function payment(chatId,choice, bot, menuChoice,db){
    if(choice === '1'){
      const menuOptions = [
        '1. ERC20',
        '2. TRC20',
        '3. BEP20',
      ];
      bot.sendMessage(chatId, 'select Network:\n' + menuOptions.join('\n'));
      menuChoice[chatId]  = 'network'
}else if(choice ==='2'){
       const message = 'Enter your account number. \n \n OPAY, \
MONIEPOINT and other Microfinance bank are not supported. Use conventional banks like GTB, FIRSTBank etc. \
\n \n 0. Go back '
        bot.sendMessage(chatId, message)
        menuChoice[chatId] = 'nairapay'
}else{
        const message = 'Enter a valid options provided.'
        bot.sendMessage(chatId, message)
    }
}

function network(chatId,choice, bot, menuChoice,db){
  if(choice === '1'){
    const message = 'Enter your USDT(TRC20) wallet Address\n \n 0. Go back'
    bot.sendMessage(chatId, message)
    cryptoNetwork = 'TRC20'
    menuChoice[chatId]= 'cryptoPayments'
  }else if(choice === '2'){
    const message = 'Enter your USDT(ERC20) wallet Address\n \n 0. Go back'
    bot.sendMessage(chatId, message)
    cryptoNetwork = 'ERC20'
    menuChoice[chatId]= 'cryptoPayments'
  }else if(choice === '3'){
    const message = 'Enter your USDT(BEP20) wallet Address\n \n 0. Go back'
    bot.sendMessage(chatId, message)
    cryptoNetwork = 'BEP20'
    menuChoice[chatId]= 'cryptoPayments'
  }else {
    const message = 'Please enter valid serial Number'
    bot.sendMessage(chatId, message)
 }
}
  




function cryptopayment(chatId,choice, bot, menuChoice,db){
  if(choice === '0'){
    const message = 'choose how you want to claim reward'
    bot.sendMessage(chatId, message)
    .then(()=> {
        const menu = [
        '1. Crypto',
        '2. Bank transfer'
        ]
        bot.sendMessage(chatId, 'Here is your menu:\n' + menu.join('\n'))
    })
    menuChoice[chatId] = 'payment'
  }else{
    const phoneNumber = '+2348067426882'
    const message = `Wallet address from BWB Giveaway ${choice}  \n Serial Number: ${serialCode} \n crypto Network: ${cryptoNetwork}`
    twilioClient.messages.create({
        body: message,
        from: '2settleHQ',
        to: phoneNumber
      })
      .catch(error => console.error(error))
      const msg = 'Your reward is processed, you will receive it within the next 24hrs'
      bot.sendMessage(chatId, msg)
      .then(()=> {
        const menuOptions = [
            '1. Transfer money',
            '2. Make payment',
            '3. Claim Reward',
            '4. Request for paycard',
            '5. Be a merchant',
            '6. support service'
          ];
          bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
          menuChoice[chatId] = 'mainMenu';
      })
    }
}

let acc_no;
function nairapayment(chatId,choice, bot, menuChoice,db){
    if(choice.length === 10 && Number(choice)){
        acc_no = choice
       fetch(`https://app.nuban.com.ng/possible-banks/NUBAN-OEIOAASY1257?acc_no=${acc_no}`)
       .then(res => res.json())
       .then(data => {
        const banks = data.map((row) => `${row.bank_code}. ${row.name}`)
        const reply = 'select  your bank by using the numbers:\n' + banks.join('\n');
        bot.sendMessage(chatId, reply)
      }).catch(error => console.log(error))
       menuChoice[chatId] = 'accoutname'
      }else if (choice === '0'){
        const message = 'choose how you want to claim reward'
        bot.sendMessage(chatId, message)
        .then(()=> {
        const menu = [
        '1. Crypto',
        '2. Bank transfer'
        ]
        bot.sendMessage(chatId, 'Here is your menu:\n' + menu.join('\n'))
      })
       menuChoice[chatId] = 'payment'
      } else{
        const message = 'Enter a valid account number. Try again'
        bot.sendMessage(chatId, message)
      }
}

let reply
function accountName(chatId,choice, bot, menuChoice,db){
    if(choice.length === 3 && Number(choice)){
        fetch(`https://app.nuban.com.ng/api/NUBAN-OEIOAASY1257?bank_code=${choice}&acc_no=${acc_no}`)
        .then(res => res.json())
        .then(data => {
          if(data.error !== true){
          const name = data.map((row) => `${row.account_name}`)
          const bankName= data.map((row) => `${row.bank_name}`)
          const acctNo = data.map((row) => `${row.account_number}`)
          
           stringName = name.toString()
           bankNameString = bankName.toString()
           acctNoString = acctNo.toString()
           
 
          reply = `Name: ${stringName} \n Bank name: ${bankNameString}\n Account number: ${acctNoString}`
          bot.sendMessage(chatId, reply)
          
         .then(() => {
          const menuOptions = [
            '1. Continue',
            '2. EXIT',
          ];
          bot.sendMessage(chatId, 'Here is your menu: \n' + menuOptions.join('\n'));
        })
        menuChoice[chatId] = 'sendNaira'
      }else{
         const message = data.message
         bot.sendMessage(chatId, message)
         .then(() => {
          const message = 'Enter your account number. \n \n OPAY, \
 MONIEPOINT and other Microfinance bank are not supported. Use conventional banks like GTB, FIRSTBank etc.'
            bot.sendMessage(chatId, message);
            menuChoice[chatId] = 'nairapay'
           
         })
      }
        })
      }else{
        const message = 'Enter a valid option provided. Try again'
        bot.sendMessage(chatId, message)
    
      }
}
//'+2348067426882'
function naira(chatId,choice, bot, menuChoice,db){
    if(choice === '1'){
        const phoneNumber = '+2348067426882'
        const message = `Bank Account from BWB Giveaway\n ${reply} \n Serial Number: ${serialCode}`
        twilioClient.messages.create({
            body: message,
            from: '2settleHQ',
            to: phoneNumber
          })
          .catch(error => console.error(error))
          const msg = 'Your reward is processed, you will receive it within the next 24hrs'
          bot.sendMessage(chatId, msg)
          .then(()=> {
            const menuOptions = [
                '1. Transfer money',
                '2. Make payment',
                '3. Claim Reward',
                '4. Request for paycard',
                '5. Be a merchant',
                '6. support service'
              ];
              bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
              menuChoice[chatId] = 'mainMenu';
          })
    }else if(choice === '2'){
        const message = 'choose how you want to claim reward'
        bot.sendMessage(chatId, message)
        .then(()=> {
            const menu = [
            '1. Crypto',
            '2. Bank transfer'
            ]
            bot.sendMessage(chatId, 'Here is your menu:\n' + menu.join('\n'))
        })
        menuChoice[chatId] = 'payment'
    }else{
        const message = 'Enter a valid option provided. Try again'
        bot.sendMessage(chatId, message)
    }
}
module.exports = {
    rewards,
    payment,
    cryptopayment,
    nairapayment,
    accountName,
    naira,
    network
}