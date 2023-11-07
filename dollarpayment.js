let transactionFee;
const id = 1
let naira 


function exitMenu (chatId,choice,bot,menuChoice){
  const menuOptions = [
    '1. Transfer money',
    '2. Make payment',
    '3. Request for paycard',
    '4. Be a merchant',
    '5. Customer support'
  ];

  const message = `Here is your menu:\n`+ menuOptions.join('\n');
  menuChoice[chatId] = 'mainMenu';
 bot.sendMessage(chatId, message)
 }




function handleDollarAmount(chatId,choice, bot, menuChoice,db,sessions){
  db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return;
      }

        
    const raw = results.map((row) =>  `${row.rate}`);
    const  rate = raw.toString()
    dollarRate = rate

    const maximum = 2000000 / rate
     const minium = 20000 / rate
      const numMax = Number.parseInt(maximum)
      const numMin =  Number.parseInt(minium)
      const max = numMax.toLocaleString()
      const min = numMin.toLocaleString()
        
      if(choice <= numMax && choice >= numMin && Number(choice)){
        sessions[chatId]['amount'] = choice
        
        bot.sendMessage(chatId,   'How would you like to receive your payment?')
        .then(()=> {
          const menuOptions = [
            '1. Transfer',
            '2. Cash',
            '0. Go back',
            '00. Exit'
          ];
          bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
          menuChoice[chatId] = 'dollarReceivePayment'
        })
        }else if (choice === '0'){
          bot.sendMessage(chatId,   'How would you like to estimate your payment?')
          .then(()=> {
            const menuOptions = [
              '1. Naira',
              '2. Dollar ',
              '3. Crypto',
              '00. Exit'
            ];
            bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
            menuChoice[chatId] = 'Selectcurrency'
          })
         }else if (choice === '00'){
          exitMenu(chatId,choice,bot,menuChoice)
         } else{
          const message = `maximum payment is $${max} and minium payment is $${min}. Re-enter your amount \
          \n 0. Go back \
          \n 00. Exit `
          bot.sendMessage(chatId, message);
        }

  })
 
}


function dollarReceivePayment(chatId,choice, bot, menuChoice,db,sessions){
  if(choice === '1'){
    const message =`Enter the account number, you'd like to receive the payment`
    bot.sendMessage(chatId, message);
    menuChoice[chatId] = 'dollarAcctNo'
  }else if(choice === '2'){
    const menuOptions = [
      `1. Remove charges from the ${sessions[chatId]['cryptoasset']} i want to send`,
      `2. Add charges to the ${sessions[chatId]['cryptoasset']} i want to send`,
      '0. Go back',
      '00. Exit'
    ];
    bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
    menuChoice[chatId] = 'dollarcharges'
  }else if(choice === '0'){
    const message = `Enter the amount you want to send in Dollar value  \n\n \
NOTE: Please simply input the numerical amount you wish to transfer.\
     \n 0. Go back \
     \n 00. Exit`
      bot.sendMessage(chatId, message);
      sessions[chatId]['estimate'] = 'Dollar'
     menuChoice[chatId] = 'dollaramount'
  }else if(choice === '00'){
    exitMenu (chatId,choice,bot,menuChoice)
  }else{
    const message = 'Enter a valid option provided. Try again'
    bot.sendMessage(chatId, message);
   }
}





function dollarCharges(chatId,choice, bot, menuChoice,db, sessions){
  if(choice === '1'){



   db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return;
    }
    
    const raw = results.map((row) =>  `${row.rate}`);
    const  rate = raw.toString()
     
    const less100 = 100000 / rate
    const less1million = 1000000 / rate
    const less2million = 2000000 / rate
  
 if(sessions[chatId]['amount'] <= less100){
 
   sessions[chatId]['transactionFee']  = 500
 
 }else if(sessions[chatId]['amount'] <= less1million){
 
   sessions[chatId]['transactionFee']  = 1000
 
 }else if(sessions[chatId]['amount'] <= less2million){
 
   sessions[chatId]['transactionFee']  = 1500
 }


    const dollarTrasacFee = sessions[chatId]['transactionFee'] / rate
    const dollarAmount = sessions[chatId]['amount']
    const percentage = 0.8
    let increase = (percentage / 100) * dollarAmount
    const charges = dollarTrasacFee + increase
    const result = dollarAmount - charges
   const nairaValue = result * rate
   sessions[chatId]['naira']  = nairaValue.toLocaleString()
    const message = `You are receiving N${sessions[chatId]['naira']} cash.`
   bot.sendMessage(chatId, message)
   .then(()=> {
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
  .then(res => res.json())
  .then(data =>  {
    sessions[chatId]['cryptPrice']  = data.price
    
    const asset = dollarAmount / sessions[chatId]['cryptPrice']
    sessions[chatId]['totalcrypto']  = asset.toFixed(8)
     const message = `Send ${sessions[chatId]['totalcrypto']} ${sessions[chatId]['cryptoasset']} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
      bot.sendMessage(chatId, message)
      .then(()=> {
        bot.sendMessage(chatId,  sessions[chatId]['walletAddress'])
      })
  })
   })
   })
  }else if(choice === '2'){

  

    db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
     if (err) {
       console.error('Error querying the database:', err);
       return;
     }
     
     const raw = results.map((row) =>  `${row.rate}`);
     const  rate = raw.toString()


     const less100 = 100000 / rate
     const less1million = 1000000 / rate
     const less2million = 2000000 / rate
   
  if(sessions[chatId]['amount'] <= less100){
  
    sessions[chatId]['transactionFee']  = 500
  
  }else if(sessions[chatId]['amount'] <= less1million){
  
    sessions[chatId]['transactionFee']  = 1000
  
  }else if(sessions[chatId]['amount'] <= less2million){
  
    sessions[chatId]['transactionFee']  = 1500
  }

      
     const dollarTrasacFee = sessions[chatId]['transactionFee'] / rate
     const dollarAmount = Number.parseInt(sessions[chatId]['amount'])
     const percentage = 0.8
     let increase = (percentage / 100) * dollarAmount
     const charges = dollarTrasacFee + increase
     const result = dollarAmount + charges
     const nairaValue = dollarAmount * rate
    sessions[chatId]['naira']  =  nairaValue.toLocaleString()

     const message = `You are receiving N${sessions[chatId]['naira']} cash.`
    bot.sendMessage(chatId, message)
    .then(()=> {
     fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
   .then(res => res.json())
   .then(data =>  {
     sessions[chatId]['cryptPrice']  = data.price
     const asset = result / sessions[chatId]['cryptPrice']
     sessions[chatId]['totalcrypto']  = asset.toFixed(8)
      const message = `Send ${sessions[chatId]['totalcrypto']} ${sessions[chatId]['cryptoasset']} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
       bot.sendMessage(chatId, message)
       .then(()=> {
         bot.sendMessage(chatId,  sessions[chatId]['walletAddress'])
       })
   })
    })
    })

  }
}











function handleDollarAcctNo(chatId,choice,bot,menuChoice,sessions){
  if(choice.length === 10 && Number(choice)){
    sessions[chatId]['acct_no'] = choice
   fetch(`https://app.nuban.com.ng/possible-banks/NUBAN-OEIOAASY1257?acc_no=${sessions[chatId]['acct_no']}`)
   .then(res => res.json())
   .then(data => {
    const banks = data.map((row) => `${row.bank_code}. ${row.name}`)
    const reply = 'select  your bank by using the numbers:\n' + banks.join('\n');
    bot.sendMessage(chatId, reply)
  }).catch(error => console.log(error))
   menuChoice[chatId] = 'dollaracctname'
  }else{
    const message = 'Enter a valid account number. Try again'
    bot.sendMessage(chatId, message)
  }
}



function handlDollareAcctName(chatId,choice,bot,menuChoice,sessions){
  if(choice.length === 3 && Number(choice)){
    fetch(`https://app.nuban.com.ng/api/NUBAN-OEIOAASY1257?bank_code=${choice}&acc_no=${sessions[chatId]['acct_no']}`)
    .then(res => res.json())
    .then(data => {
      if(data.error !== true){
      const name = data.map((row) => `${row.account_name}`)
      const bankName= data.map((row) => `${row.bank_name}`)
      const acctNo = data.map((row) => `${row.account_number}`)
      
      const stringName = name.toString()
       sessions[chatId]['bankNameString'] = bankName.toString()
       sessions[chatId]['acctNoString'] = acctNo.toString()
      const nairaValue = sessions[chatId]['amount'] * dollarRate
      const nairaNumber =  Number.parseInt(nairaValue)
      const naira = nairaNumber.toLocaleString()
       
     const reply = `You are sending N${naira} which is equivalent to: $${sessions[chatId]['amount']}  \n Name: ${stringName} \n Bank name: ${ sessions[chatId]['bankNameString']}\n Account number: ${sessions[chatId]['acctNoString']}`
     bot.sendMessage(chatId, reply)
      
     .then(() => {
      const menuOptions = [
        '1. Continue',
        '2. EXIT',
      ];
      bot.sendMessage(chatId, 'Here is your menu: \n' + menuOptions.join('\n'));
    })
    menuChoice[chatId] = 'dollarUnavailable'
  }else{
     const message = data.message
     bot.sendMessage(chatId, message)
     .then(() => {
      const message = 'Enter account number'
        bot.sendMessage(chatId, message);
        menuChoice[chatId] = 'AcctNo'
       
     })
  }
    })
  }else{
    const message = 'Enter a valid option provided. Try again'
    bot.sendMessage(chatId, message)

  }
}







function handleDollarUnavailable(chatId,choice,bot,menuChoice,db,sessions){
  if(choice === '1'){
      const less100 = 100000 / dollarRate
      const less1million = 1000000 / dollarRate
      const less2million = 2000000 / dollarRate
    
  if(sessions[chatId]['amount'] <= less100){
     transactionFee = 500
  }else if(sessions[chatId]['amount'] <= less1million){
     transactionFee = 1000
  }else if(sessions[chatId]['amount'] <= less2million){
     transactionFee = 1500
  }
  // else if(amount >= 2100000){
  //    transactionFee = 2000
  // }
   

  db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
   if (err) {
     console.error('Error querying the database:', err);
     return;
   }
   
   const raw = results.map((row) =>  `${row.rate}`);
   const  rate = raw.toString()
    

  const numberAmmount = Number.parseInt(sessions[chatId]['amount'])
 const dollarTrasacFee = transactionFee / rate
 const dollar =  numberAmmount + dollarTrasacFee
 const percentage = 0.8
 var increase = (percentage / 100) * dollar
 var result = dollar + increase; 
 if(sessions[chatId]['cryptoNetwork']  !== 'USDT' ){
 fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
 .then(res => res.json())
 .then(data =>  {
  sessions[chatId]['cryptoPrice'] = data.price
     const asset = result / sessions[chatId]['cryptoPrice']
     const totalcrypto = asset.toFixed(4)
        const message = `Send ${totalcrypto} ${sessions[chatId]['cryptoasset']} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
      bot.sendMessage(chatId, message)
      .then(()=> {
        bot.sendMessage(chatId, sessions[chatId]['walletAddress'])
      })
      .then(() => {
       bot.sendPhoto(chatId,  sessions[chatId]['imagePath'] , {
       caption: 'Scan the wallet address', // Optional caption for the image
       parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
      }).catch((error) => {
        console.error('Error sending image:', error);
      });
      })

      const user = {
        crypto: sessions[chatId]['cryptoasset'],
        network: sessions[chatId]['cryptoNetwork'] ,
        estimation: sessions[chatId]['estimate'],
        acct_number: sessions[chatId]['acctNoString'],
        bank_name:  sessions[chatId]['bankNameString'],
        receiver_name: sessions[chatId]['stringName'],
        receiver_amount: naira,
        crypto_amount: sessions[chatId]['amount'],
        total_crypto_amount: totalcrypto,
        wallet_address: sessions[chatId]['walletAddress']

      };
          // User doesn't exist, store the data in the database
          db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
            if (err) {
              console.error('Error storing user data in the database:', err);
              return;
            }
          })
 })  
}else{
     const asset = result
     const totalcrypto = asset.toFixed(4)
     const message = `Send ${totalcrypto} ${sessions[chatId]['cryptoasset']} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
      bot.sendMessage(chatId, message)
      .then(()=> {
        bot.sendMessage(chatId, sessions[chatId]['walletAddress'])
      })
      .then(() => {
       bot.sendPhoto(chatId,  sessions[chatId]['imagePath'] , {
       caption: 'Scan the wallet address', // Optional caption for the image
       parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
      }).catch((error) => {
        console.error('Error sending image:', error);
      });
      })

      const user = {
        crypto: sessions[chatId]['cryptoasset'],
        network: sessions[chatId]['cryptoNetwork'] ,
        estimation: sessions[chatId]['estimate'],
        acct_number: sessions[chatId]['acctNoString'],
        bank_name:  sessions[chatId]['bankNameString'],
        receiver_name: sessions[chatId]['stringName'],
        receiver_amount: naira,
        crypto_amount: sessions[chatId]['amount'],
        total_crypto_amount: totalcrypto,
        wallet_address: sessions[chatId]['walletAddress']

      };
          // User doesn't exist, store the data in the database
          db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
            if (err) {
              console.error('Error storing user data in the database:', err);
              return;
            }
          })
}
 })
  }else{
    const message = 'Enter a valid option provided. Try again'
    bot.sendMessage(chatId, message)
  }

}

module.exports = {
  handleDollarAmount,
  handleDollarAcctNo,
  handlDollareAcctName,
  handleDollarUnavailable,
  dollarReceivePayment,
  dollarCharges
 }

