

// let transactionFee;

// let cryptoPrice;
// let cryptoasset;
// let walletAddress;
// let imagePath 
// const id = 1
// let estimate;
// let stringName;
// let bankNameString ;
// let acctNoString 
// let nairaNumber 
// let naira 
// let totalcrypto



// function network(chatId,choice,bot,menuChoice){
//   const menuOptions = [
//     '1. ERC20',
//     '2. TRC20',
//     '3. BEP20',
//     '0. Go back',
//     '00. Exit'
//   ];
//   bot.sendMessage(chatId, 'select Network:\n' + menuOptions.join('\n'));
//   menuChoice[chatId] = 'cryptopayment'
//  }





//  function exitMenu (chatId,choice,bot,menuChoice){
//   const menuOptions = [
//     '1. Transfer money',
//     '2. Make payment',
//     '3. Request for paycard',
//     '4. Be a merchant',
//     '5. Customer support'
//   ];

//   const message = `Here is your menu:\n`+ menuOptions.join('\n');
//   menuChoice[chatId] = 'mainMenu';
//  bot.sendMessage(chatId, message)
//  }

 




// function handleSelectCurrency(chatId, choice, bot, menuChoice,sessions){
//     if(choice === '1'){
//      const message = `Enter the amount you want to send in Naira value \n\n \
// NOTE: Please simply input the numerical amount you wish to transfer.\
//     \n 0. Go back \
//     \n 00. Exit`
//      bot.sendMessage(chatId, message);
//      sessions[chatId]['estimate'] = 'Naira'
     
//      menuChoice[chatId] = 'nairamount'
//     }else if(choice === '2'){
//       const message = `Enter the amount you want to send in Dollar value  \n\n \
// NOTE: Please simply input the numerical amount you wish to transfer.\
//      \n 0. Go back \
//      \n 00. Exit`
//       bot.sendMessage(chatId, message);
//       sessions[chatId]['estimate'] = 'Dollar'
//      menuChoice[chatId] = 'dollaramount'
//     }else if(choice === '3'){
//       const message =  `Enter the amount you want to send in crypto value \n\n \
// NOTE: Please simply input the numerical amount you wish to transfer.\
//      \n 0. Go back \
//      \n 00. Exit`
//       bot.sendMessage(chatId, message);
//       sessions[chatId]['estimate'] = 'crypto'
//       menuChoice[chatId] = 'cryptoamount'
//     }else if(choice === '00'){
//       exitMenu (chatId,choice,bot,menuChoice)
//     }
//     else{
//      const message = 'Enter a valid option provided. Try again'
//      bot.sendMessage(chatId, message);
//     }

//    }


//    function handleNairaAmount(chatId,choice, bot, menuChoice,sessions){
//      if(choice <= 2000000 && choice >= 20000 && Number(choice)){
//       sessions[chatId]['amount']  = choice
//       bot.sendMessage(chatId,   'How would you like to receive your payment?')
//       .then(()=> {
//         const menuOptions = [
//           '1. Transfer',
//           '2. Cash',
//           '0. Go back',
//           '00. Exit'
//         ];
//         bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
//         menuChoice[chatId] = 'receivePayment'
//       })
//      }else if (choice === '0'){
//       bot.sendMessage(chatId,   'How would you like to estimate your payment?')
//       .then(()=> {
//         const menuOptions = [
//           '1. Naira',
//           '2. Dollar ',
//           '3. Crypto',
//           '00. Exit'
//         ];
//         bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
//         menuChoice[chatId] = 'Selectcurrency'
//       })
//      }else if (choice === '00'){
//       exitMenu(chatId,choice,bot,menuChoice)
//      }
//      else{
//        const message = 'maximum payment is 2 million naira and minium payment is 20,000 naira. Re-enter your amount \
//          \n 0. Go back \
//          \n 00. Exit'
//        bot.sendMessage(chatId, message);
//      }
//    }





// function receivePayment(chatId,choice, bot, menuChoice,sessions){
//     if(choice === '1'){
//       const message = `Enter the account number, you'd like to receive the payment \
//         \n 0. Go back \
//         \n 00. Exit`
//         bot.sendMessage(chatId, message);
//         menuChoice[chatId] = 'AcctNo'
//     }else if(choice === '2'){
//       const menuOptions = [
//         `1. Remove charges from the ${cryptoasset} i want to send`,
//         `2. Add charges to the ${cryptoasset} i want to send`,
//         '0. Go back',
//         '00. Exit'
//       ];
//       bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
//       menuChoice[chatId] = 'charges'
//     }
// }


// function charges(chatId,choice, bot, menuChoice){
    
// }




//    function handleSelectNetwork(chatId,choice,bot,menuChoice, sessions){
//      if(choice === '1'){
//        const menuOptions = [
//          '1. BTC',
//          '0. Go back',
//          '00. Exit'
//        ];
//        bot.sendMessage(chatId, 'Select Network:\n' + menuOptions.join('\n'));
//        menuChoice[chatId] = 'btcpayment'
//        sessions[chatId]['cryptoNetwork'] = 'BTCUSDT'
//        sessions[chatId]['cryptoasset']  = 'BTC'
//        sessions[chatId]['walletAddress']  = '1H2AEX9WWRkiENWt5P1ycHpoJmedof5a6d'
//        sessions[chatId]['imagePath']  = "./Barcode/BTC.png";
//      }else if(choice === '2'){
//       network(chatId,choice,bot,menuChoice)

//       sessions[chatId]['cryptoNetwork'] = 'ETHUSDT'
//       sessions[chatId]['cryptoasset'] = 'ETH'
//       sessions[chatId]['walletAddress'] = '0xb710EF636DB0F94159C0C376256d31E12469F42d'
//       sessions[chatId]['imagePath'] = "./Barcode/PAYMENT.png";
//      }else if(choice === '3'){
//       network(chatId,choice,bot,menuChoice)

//       sessions[chatId]['cryptoNetwork'] = 'BNBUSDT'
//        sessions[chatId]['cryptoasset'] = 'BNB'
//        sessions[chatId]['walletAddress']  = '0xb710EF636DB0F94159C0C376256d31E12469F42d'
//        sessions[chatId]['imagePath'] = "./Barcode/PAYMENT.png";
//      }else if(choice === '4'){
//       network(chatId,choice,bot,menuChoice)

//         sessions[chatId]['cryptoNetwork'] = 'TRXUSDT'
//         sessions[chatId]['cryptoasset'] = 'TRX'
//        sessions[chatId]['walletAddress'] = 'TZCKqDWzUhRKT9BAcYtaxe3XD5dHYfTysq'
//         sessions[chatId]['imagePath'] = "./Barcode/TRC20.png";
//      }else if(choice === '5'){
//       network(chatId,choice,bot,menuChoice)

//       sessions[chatId]['cryptoNetwork'] = 'USDT'
//         sessions[chatId]['cryptoasset'] = 'USDT'
//        sessions[chatId]['walletAddress'] = 'TZCKqDWzUhRKT9BAcYtaxe3XD5dHYfTysq'
//         sessions[chatId]['imagePath'] = "./Barcode/TRC20.png";
//      }else if(choice === '0') {
//       exitMenu(chatId,choice,bot,menuChoice)
//      }
//      else{
//        const message = 'enter a valid options provided. Try again'
//        bot.sendMessage(chatId, message);
//      }
//    }
   
   
//    function handleBtc(chatId,choice,bot,menuChoice,sessions) {
//      if(choice === '1'){
//       bot.sendMessage(chatId,   'How would you like to estimate your payment?')
//       .then(()=> {
//         const menuOptions = [
//           '1. Naira',
//           '2. Dollar ',
//           '3. Crypto',
//           '00. Exit'
//         ];
//         bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
//         menuChoice[chatId] = 'Selectcurrency'
//       })
//      }else if (choice === '0'){
//       const menuOptions = [
//         '1. Bitcoin (BTC)',
//         '2. Ethereum (ETH)',
//         '3. BINANCE (BNB)',
//         '4. TRON (TRX)',
//         '5. USDT',
//         '0. Go back'
//       ];
//       bot.sendMessage(chatId, 'Pay with:\n' + menuOptions.join('\n'));
//       menuChoice[chatId] = 'selectnetwork'
//      }else if (choice === '00'){
//       exitMenu(chatId,choice,bot,menuChoice)
//      } else{
//        const message = 'enter a valid options provided. Try again'
//        bot.sendMessage(chatId, message);
//      }
//    }
   


   
//    function handleCryptos(chatId,choice,bot,menuChoice,sessions) {
//      if(choice === '1' || choice === '2' || choice === '3' ){
//       bot.sendMessage(chatId,  'How would you like to estimate your payment?')
//       .then(()=> {
//         const menuOptions = [
//           '1. Naira',
//           '2. Dollar ',
//           '3. Crypto',
//           '00. Exit'
//         ];
//         bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
//         menuChoice[chatId] = 'Selectcurrency'
//       })
//      } else if (choice === '0'){
//       const menuOptions = [
//         '1. Bitcoin (BTC)',
//         '2. Ethereum (ETH)',
//         '3. BINANCE (BNB)',
//         '4. TRON (TRX)',
//         '5. USDT',
//         '0. Go back'

//       ];
//       bot.sendMessage(chatId, 'Pay with:\n' + menuOptions.join('\n'));
//       menuChoice[chatId] = 'selectnetwork'
//      }else if (choice === '00'){
//       exitMenu(chatId,choice,bot,menuChoice)
//      }
//      else{
//        const message = 'enter a valid options provided. Try again'
//        bot.sendMessage(chatId, message);
//        menuChoice[chatId] = 'Selectcurrency'
//       }
//    }


 




//    function handleAcctNo(chatId,choice,bot,menuChoice,sessions){
//      if(choice.length === 10 && Number(choice)){
//       sessions[chatId]['acct_no']  = choice
//       fetch(`https://app.nuban.com.ng/possible-banks/NUBAN-OEIOAASY1257?acc_no=${sessions[chatId]['acct_no']}`)
//       .then(res => res.json())
//       .then(data => {
//        const banks = data.map((row) => `${row.bank_code}. ${row.name}`)
//        const reply = 'select  your bank by using the numbers:\n' + `${banks.join('\n')} \n` + '0. Go back \n' + '00. Exit'
//        bot.sendMessage(chatId, reply)
//      }).catch(error => console.log(error))
//       menuChoice[chatId] = 'acctname'
//      }else if (choice === '0'){
//       const message = `Enter the amount you want to send in Naira value \n\n \
// NOTE: Please simply input the numerical amount you wish to transfer.\
//           \n 0. Go back \
//           \n 00. Exit`
//            bot.sendMessage(chatId, message);
//            menuChoice[chatId] = 'nairamount'
//      }else if (choice === '00'){
//       exitMenu(chatId,choice,bot,menuChoice)
//      } else{
//        const message = 'Enter a valid account number. Try again'
//        bot.sendMessage(chatId, message)
//      }
//    }
   
//    function handleAcctName(chatId,choice,bot,menuChoice,sessions){
//      if(choice.length === 3 && Number(choice)){
//        fetch(`https://app.nuban.com.ng/api/NUBAN-OEIOAASY1257?bank_code=${choice}&acc_no=${sessions[chatId]['acct_no']}`)
//        .then(res => res.json())
//        .then(data => {
//          if(data.error !== true){
//          const name = data.map((row) => `${row.account_name}`)
//          const bankName= data.map((row) => `${row.bank_name}`)
//          const acctNo = data.map((row) => `${row.account_number}`)
         
//           stringName = name.toString()
//           bankNameString = bankName.toString()
//           acctNoString = acctNo.toString()
//           nairaNumber =  Number.parseInt(sessions[chatId]['amount'])
//           naira = nairaNumber.toLocaleString()

//         const reply = `You are sending N${naira} to \n Name: ${stringName} \n Bank name: ${bankNameString}\n Account number: ${acctNoString}`
//         bot.sendMessage(chatId, reply)
         
//         .then(() => {
//          const menuOptions = [
//            '1. Continue',
//            '2. EXIT',
//          ];
//          bot.sendMessage(chatId, 'Here is your menu: \n' + menuOptions.join('\n'));
//        })
//        menuChoice[chatId] = 'Unavailable'
//      }else{
//         const message = data.message
//         bot.sendMessage(chatId, message)
//         .then(() => {
//          const message = 'Enter account number'
//            bot.sendMessage(chatId, message);
//            menuChoice[chatId] = 'AcctNo'
          
//         })
//      }
//        })
//      }else{
//        const message = 'Enter a valid option provided. Try again'
//        bot.sendMessage(chatId, message)
   
//      }
//    }
   




//    function Unavailable(chatId,choice,bot,menuChoice,db, sessions){
//      if(choice === '1'){

//      if(sessions[chatId]['amount'] <= 100000){
//         transactionFee = 500
//      }else if(sessions[chatId]['amount'] <= 1000000){
//         transactionFee = 1000
//      }else if(sessions[chatId]['amount'] <= 2000000){
//         transactionFee = 1500
//      }else if(sessions[chatId]['amount'] >= 2100000){
//         transactionFee = 2000
//      }
      

//      db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
//       if (err) {
//         console.error('Error querying the database:', err);
//         return;
//       }
      
//       const raw = results.map((row) =>  `${row.rate}`);
//       const  rate = raw.toString()
       
//     const dollarTrasacFee = transactionFee / rate
//     const dollarAmount = sessions[chatId]['amount'] / rate
//     const dollar = dollarAmount + dollarTrasacFee
//     const percentage = 0.8
//     var increase = (percentage / 100) * dollar
//     var result = dollar + increase; 
//     if( sessions[chatId]['cryptoNetwork'] !== 'USDT' ){
//     fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
//     .then(res => res.json())
//     .then(data =>  {
//       sessions[chatId]['cryptPrice']  = data.price
//         const asset = result / sessions[chatId]['cryptPrice']
//          totalcrypto = asset.toFixed(4)
//         const message = `Send ${totalcrypto} ${ sessions[chatId]['imagePath']} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
//         bot.sendMessage(chatId, message)
//         .then(()=> {
//           bot.sendMessage(chatId, walletAddress)
//         })
//         .then(() => {
//          bot.sendPhoto(chatId, imagePath, {
//          caption: 'Scan the wallet address', // Optional caption for the image
//          parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
//         }).catch((error) => {
//           console.error('Error sending image:', error);
//         });
//         })
        
//         const user = {
//           crypto: cryptoasset,
//           network: sessions[chatId]['cryptoNetwork'] ,
//           estimation: estimate,
//           acct_number: acctNoString,
//           bank_name: bankNameString,
//           receiver_name: stringName,
//           receiver_amount: naira,
//           crypto_amount: sessions[chatId]['amount'],
//           total_crypto_amount: totalcrypto,
//           wallet_address: walletAddress

//         };
//             // User doesn't exist, store the data in the database
//             db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
//               if (err) {
//                 console.error('Error storing user data in the database:', err);
//                 return;
//               }
//             })
//     })  
//   }else{
//         const asset = result
//         const totalcrypto = asset.toFixed(4)
//         const message = `Send ${totalcrypto} ${cryptoasset} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
//         bot.sendMessage(chatId, message)
//         .then(()=> {
//           bot.sendMessage(chatId, walletAddress)
//         })
//         .then(() => {
//          bot.sendPhoto(chatId, imagePath, {
//          caption: 'Scan the wallet address', // Optional caption for the image
//          parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
//         }).catch((error) => {
//           console.error('Error sending image:', error);
//         });
//         })  

//         const user = {
//           crypto: cryptoasset,
//           network: sessions[chatId]['cryptoNetwork'] ,
//           estimation: estimate,
//           acct_number: acctNoString,
//           bank_name: bankNameString,
//           receiver_name: stringName,
//           receiver_amount: naira,
//           crypto_amount: sessions[chatId]['amount'],
//           total_crypto_amount: totalcrypto,
//           wallet_address: walletAddress

//         };
//             // User doesn't exist, store the data in the database
//             db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
//               if (err) {
//                 console.error('Error storing user data in the database:', err);
//                 return;
//               }
//             })
//   }
//     })
//      }else{
//        const message = 'Enter a valid option provided. Try again'
//        bot.sendMessage(chatId, message)
//      }
   
//    }










// // dollar section ------------------------------------------------------------------------------



//    function handleDollarAmount(chatId,choice, bot, menuChoice,db,sessions){
//     db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
//         if (err) {
//           console.error('Error querying the database:', err);
//           return;
//         }

          
//       const raw = results.map((row) =>  `${row.rate}`);
//       const  rate = raw.toString()
//       dollarRate = rate

//       const maximum = 2000000 / rate
//        const minium = 20000 / rate
//         const numMax = Number.parseInt(maximum)
//         const numMin =  Number.parseInt(minium)
//         const max = numMax.toLocaleString()
//         const min = numMin.toLocaleString()
          
//         if(choice <= numMax && choice >= numMin && Number(choice)){
//           sessions[chatId]['amount'] = choice
//           const message =`Enter the account number, you'd like to receive the payment`
//           bot.sendMessage(chatId, message);
//           menuChoice[chatId] = 'dollarAcctNo'
//           }else if (choice === '0'){
//             bot.sendMessage(chatId,   'How would you like to estimate your payment?')
//             .then(()=> {
//               const menuOptions = [
//                 '1. Naira',
//                 '2. Dollar ',
//                 '3. Crypto',
//                 '00. Exit'
//               ];
//               bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'))
//               menuChoice[chatId] = 'Selectcurrency'
//             })
//            }else if (choice === '00'){
//             exitMenu(chatId,choice,bot,menuChoice)
//            } else{
//             const message = `maximum payment is $${max} and minium payment is $${min}. Re-enter your amount \
//             \n 0. Go back \
//             \n 00. Exit `
//             bot.sendMessage(chatId, message);
//           }

//     })
   
//   }



//   function handleDollarAcctNo(chatId,choice,bot,menuChoice,sessions){
//     if(choice.length === 10 && Number(choice)){
//       sessions[chatId]['acct_no'] = choice
//      fetch(`https://app.nuban.com.ng/possible-banks/NUBAN-OEIOAASY1257?acc_no=${sessions[chatId]['acct_no']}`)
//      .then(res => res.json())
//      .then(data => {
//       const banks = data.map((row) => `${row.bank_code}. ${row.name}`)
//       const reply = 'select  your bank by using the numbers:\n' + banks.join('\n');
//       bot.sendMessage(chatId, reply)
//     }).catch(error => console.log(error))
//      menuChoice[chatId] = 'dollaracctname'
//     }else{
//       const message = 'Enter a valid account number. Try again'
//       bot.sendMessage(chatId, message)
//     }
//   }
  

  
//   function handlDollareAcctName(chatId,choice,bot,menuChoice,sessions){
//     if(choice.length === 3 && Number(choice)){
//       fetch(`https://app.nuban.com.ng/api/NUBAN-OEIOAASY1257?bank_code=${choice}&acc_no=${sessions[chatId]['acct_no']}`)
//       .then(res => res.json())
//       .then(data => {
//         if(data.error !== true){
//         const name = data.map((row) => `${row.account_name}`)
//         const bankName= data.map((row) => `${row.bank_name}`)
//         const acctNo = data.map((row) => `${row.account_number}`)
        
//         const stringName = name.toString()
//         const bankNameString = bankName.toString()
//         const acctNoString = acctNo.toString()
//         const nairaValue = sessions[chatId]['amount'] * dollarRate
//         const nairaNumber =  Number.parseInt(nairaValue)
//         const naira = nairaNumber.toLocaleString()
         
//        const reply = `You are sending N${naira} which is equivalent to: $${sessions[chatId]['amount']}  \n Name: ${stringName} \n Bank name: ${bankNameString}\n Account number: ${acctNoString}`
//        bot.sendMessage(chatId, reply)
        
//        .then(() => {
//         const menuOptions = [
//           '1. Continue',
//           '2. EXIT',
//         ];
//         bot.sendMessage(chatId, 'Here is your menu: \n' + menuOptions.join('\n'));
//       })
//       menuChoice[chatId] = 'dollarUnavailable'
//     }else{
//        const message = data.message
//        bot.sendMessage(chatId, message)
//        .then(() => {
//         const message = 'Enter account number'
//           bot.sendMessage(chatId, message);
//           menuChoice[chatId] = 'AcctNo'
         
//        })
//     }
//       })
//     }else{
//       const message = 'Enter a valid option provided. Try again'
//       bot.sendMessage(chatId, message)
  
//     }
//   }



  



//   function handleDollarUnavailable(chatId,choice,bot,menuChoice,db){
//     if(choice === '1'){
//         const less100 = 100000 / dollarRate
//         const less1million = 1000000 / dollarRate
//         const less2million = 2000000 / dollarRate
      
//     if(sessions[chatId]['amount'] <= less100){
//        transactionFee = 500
//     }else if(sessions[chatId]['amount'] <= less1million){
//        transactionFee = 1000
//     }else if(sessions[chatId]['amount'] <= less2million){
//        transactionFee = 1500
//     }
//     // else if(amount >= 2100000){
//     //    transactionFee = 2000
//     // }
     

//     db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
//      if (err) {
//        console.error('Error querying the database:', err);
//        return;
//      }
     
//      const raw = results.map((row) =>  `${row.rate}`);
//      const  rate = raw.toString()
      

//     const numberAmmount = Number.parseInt(sessions[chatId]['amount'])
//    const dollarTrasacFee = transactionFee / rate
//    const dollar =  numberAmmount + dollarTrasacFee
//    const percentage = 0.8
//    var increase = (percentage / 100) * dollar
//    var result = dollar + increase; 
//    if(sessions[chatId]['cryptoNetwork']  !== 'USDT' ){
//    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
//    .then(res => res.json())
//    .then(data =>  {
//        cryptoPrice = data.price
//        const asset = result / cryptoPrice
//        const totalcrypto = asset.toFixed(4)
//           const message = `Send ${totalcrypto} ${cryptoasset} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
//         bot.sendMessage(chatId, message)
//         .then(()=> {
//           bot.sendMessage(chatId, walletAddress)
//         })
//         .then(() => {
//          bot.sendPhoto(chatId, imagePath, {
//          caption: 'Scan the wallet address', // Optional caption for the image
//          parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
//         }).catch((error) => {
//           console.error('Error sending image:', error);
//         });
//         })

//         const user = {
//           crypto: cryptoasset,
//           network: sessions[chatId]['cryptoNetwork'] ,
//           estimation: estimate,
//           acct_number: acctNoString,
//           bank_name: bankNameString,
//           receiver_name: stringName,
//           receiver_amount: naira,
//           crypto_amount: sessions[chatId]['amount'],
//           total_crypto_amount: totalcrypto,
//           wallet_address: walletAddress

//         };
//             // User doesn't exist, store the data in the database
//             db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
//               if (err) {
//                 console.error('Error storing user data in the database:', err);
//                 return;
//               }
//             })
//    })  
//  }else{
//        const asset = result
//        const totalcrypto = asset.toFixed(4)
//        const message = `Send ${totalcrypto} ${cryptoasset} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
//         bot.sendMessage(chatId, message)
//         .then(()=> {
//           bot.sendMessage(chatId, walletAddress)
//         })
//         .then(() => {
//          bot.sendPhoto(chatId, imagePath, {
//          caption: 'Scan the wallet address', // Optional caption for the image
//          parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
//         }).catch((error) => {
//           console.error('Error sending image:', error);
//         });
//         })

//         const user = {
//           crypto: cryptoasset,
//           network: sessions[chatId]['cryptoNetwork'] ,
//           estimation: estimate,
//           acct_number: acctNoString,
//           bank_name: bankNameString,
//           receiver_name: stringName,
//           receiver_amount: naira,
//           crypto_amount: sessions[chatId]['amount'],
//           total_crypto_amount: totalcrypto,
//           wallet_address: walletAddress

//         };
//             // User doesn't exist, store the data in the database
//             db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
//               if (err) {
//                 console.error('Error storing user data in the database:', err);
//                 return;
//               }
//             })
//  }
//    })
//     }else{
//       const message = 'Enter a valid option provided. Try again'
//       bot.sendMessage(chatId, message)
//     }
  
//   }
// //---------------------------- dollar section ends here -------------------------------------------------------------




















// //------------------------- crypto section ---------------------------------------------------------------




// function handleCryptoAmount(chatId,choice, bot, menuChoice,db){
//     db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
//         if (err) {
//           console.error('Error querying the database:', err);
//           return;
//         }

          
//       const raw = results.map((row) =>  `${row.rate}`);
//       const  rate = raw.toString()
//       dollarRate = rate
         
//       const maximum = 2000000 / rate
//       const minium = 20000 / rate
       
//        if(sessions[chatId]['cryptoNetwork']  !== 'USDT'){
//        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
//        .then(res => res.json())
//        .then(data =>  {
//         sessions[chatId]['cryptPrice']   = data.price
      
//            const maxs = maximum / sessions[chatId]['cryptPrice']
//            const mins = minium  / sessions[chatId]['cryptPrice']

//              const numberMax = maxs.toFixed(4)
//              const numberMin = mins.toFixed(4)

//              const max = Number(numberMax)
//              const min = Number(numberMin)
//            if(choice <= max && choice >= min && Number(choice)){
//             sessions[chatId]['amount'] = choice
//             const message =`Enter the account number, you'd like to receive the payment`
//             bot.sendMessage(chatId, message);
//             menuChoice[chatId] = 'cryptoAcctNo'
//             }else{
//               const message = `maximum payment is ${max} ${cryptoasset} and minium payment is ${min} ${cryptoasset}. try again `
//               bot.sendMessage(chatId, message);
//             }
  
//        })

//       }else{
//         const numMax = Number.parseInt(maximum)
//         const numMin =  Number.parseInt(minium)
//         const max = numMax.toLocaleString()
//         const min = numMin.toLocaleString()
//         if(choice <= max && choice >= min && Number(choice)){
//           sessions[chatId]['amount'] = choice
//           const message =`Enter the account number, you'd like to receive the payment`
//           bot.sendMessage(chatId, message);
//           menuChoice[chatId] = 'dollarAcctNo'
//           }else{
//             const message = `maximum payment is $${max} ${cryptoasset} and minium payment is $${min} ${cryptoasset}. try again `
//             bot.sendMessage(chatId, message);
//           }
//       }

        
       

//     })
   
//   }



//   function handleCryptoAcctNo(chatId,choice,bot,menuChoice,sessions){
//     if(choice.length === 10 && Number(choice)){
//       sessions[chatId]['acct_no']= choice
//      fetch(`https://app.nuban.com.ng/possible-banks/NUBAN-OEIOAASY1257?acc_no=${sessions[chatId]['acct_no']}`)
//      .then(res => res.json())
//      .then(data => {
//       const banks = data.map((row) => `${row.bank_code}. ${row.name}`)
//       const reply = 'select  your bank by using the numbers:\n' + banks.join('\n');
//       bot.sendMessage(chatId, reply)
//     }).catch(error => console.log(error))
//      menuChoice[chatId] = 'cryptoacctname'
//     }else{
//       const message = 'Enter a valid account number. Try again'
//       bot.sendMessage(chatId, message)
//     }
//   }





//   function handleCryptoAcctName(chatId,choice,bot,menuChoice,sessions){
//     if(choice.length === 3 && Number(choice)){
//       fetch(`https://app.nuban.com.ng/api/NUBAN-OEIOAASY1257?bank_code=${choice}&acc_no=${sessions[chatId]['acct_no']}`)
//       .then(res => res.json())
//       .then(data => {
//         if(data.error !== true){
//         const name = data.map((row) => `${row.account_name}`)
//         const bankName= data.map((row) => `${row.bank_name}`)
//         const acctNo = data.map((row) => `${row.account_number}`)
        
//         const stringName = name.toString()
//         const bankNameString = bankName.toString()
//         const acctNoString = acctNo.toString()

//         const dollarValue =   sessions[chatId]['amount'] * cryptoPrice
//         const nairaValue =  dollarValue * dollarRate
//          const nairaInterger = nairaValue.toFixed(0)
//          const nairaNumber =  Number.parseInt(nairaInterger)
//          const naira = nairaNumber.toLocaleString()
         
//        const reply = `You are sending N${naira} which is equivalent to: ${sessions[chatId]['amount']} ${cryptoasset} \n Name: ${stringName} \n Bank name:${bankNameString}\n Account number: ${acctNoString}`
//        bot.sendMessage(chatId, reply)
        
//        .then(() => {
//         const menuOptions = [
//           '1. Continue',
//           '2. EXIT',
//         ];
//         bot.sendMessage(chatId, 'Here is your menu: \n' + menuOptions.join('\n'));
//       })
//       menuChoice[chatId] = 'cryptoUnavailable'
//     }else{
//        const message = data.message
//        bot.sendMessage(chatId, message)
//        .then(() => {
//         const message = 'Enter account number'
//           bot.sendMessage(chatId, message);
//           menuChoice[chatId] = 'AcctNo'
         
//        })
//     }
//       })
//     }else{
//       const message = 'Enter a valid option provided. Try again'
//       bot.sendMessage(chatId, message)
  
//     }
//   }





//   function handleCryptoUnavailable(chatId,choice,bot,menuChoice,db){
//     if(choice === '1'){
       
//         const dollarValue =   sessions[chatId]['amount'] * sessions[chatId]['cryptPrice']
//         const nairaValue =  dollarValue * dollarRate

//     if(nairaValue <= 100000){
//        transactionFee = 500
//     }else if(nairaValue <= 1000000){
//        transactionFee = 1000
//     }else if(nairaValue <= 2000000){
//        transactionFee = 1500
//     }
//     // else if(amount >= 2100000){
//     //    transactionFee = 2000
//     // }
     

//     db.query(`SELECT * FROM 2Settle_ExchangeRate WHERE id = ${id}`, (err, results) => {
//      if (err) {
//        console.error('Error querying the database:', err);
//        return;
//      }
     
//      const raw = results.map((row) =>  `${row.rate}`);
//      const  rate = raw.toString()
      
//      const dollarTrasacFee = transactionFee / rate
//      const cryptodollar =  sessions[chatId]['amount'] * cryptoPrice
//     const dollar =  cryptodollar + dollarTrasacFee
//     const percentage = 0.8
//     var increase = (percentage / 100) * dollar
//     var result = dollar + increase; 
//     if(sessions[chatId]['cryptoNetwork'] !== 'USDT' ){
//     fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork']}`)
//     .then(res => res.json())
//     .then(data =>  {
//        cryptoPrice = data.price
//        const asset = result / cryptoPrice
//        const totalcrypto = asset.toFixed(4)
//           const message = `Send ${totalcrypto} ${cryptoasset} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
//         bot.sendMessage(chatId, message)
//         .then(()=> {
//           bot.sendMessage(chatId, walletAddress)
//         })
//         .then(() => {
//          bot.sendPhoto(chatId, imagePath, {
//          caption: 'Scan the wallet address', // Optional caption for the image
//          parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
//         }).catch((error) => {
//           console.error('Error sending image:', error);
//         });
//         })


//         const user = {
//           crypto: cryptoasset,
//           network: sessions[chatId]['cryptoNetwork'],
//           estimation: estimate,
//           acct_number: acctNoString,
//           bank_name: bankNameString,
//           receiver_name: stringName,
//           receiver_amount: naira,
//           crypto_amount:  sessions[chatId]['amount'],
//           total_crypto_amount: totalcrypto,
//           wallet_address: walletAddress

//         };
//             // User doesn't exist, store the data in the database
//             db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
//               if (err) {
//                 console.error('Error storing user data in the database:', err);
//                 return;
//               }
//             })
//    })  
//  }else{
//        const asset = result
//        const totalcrypto = asset.toFixed(4)
//        const message = `Send ${totalcrypto} ${cryptoasset} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
//         bot.sendMessage(chatId, message)
//         .then(()=> {
//           bot.sendMessage(chatId, walletAddress)
//         })
//         .then(() => {
//          bot.sendPhoto(chatId, imagePath, {
//          caption: 'Scan the wallet address', // Optional caption for the image
//          parse_mode: 'Markdown', // Optional: You can use Markdown for formatting
//         }).catch((error) => {
//           console.error('Error sending image:', error);
//         });
//         })

      
//         const user = {
//           crypto: cryptoasset,
//           network: sessions[chatId]['cryptoNetwork'],
//           estimation: estimate,
//           acct_number: acctNoString,
//           bank_name: bankNameString,
//           receiver_name: stringName,
//           receiver_amount: naira,
//           crypto_amount:  sessions[chatId]['amount'],
//           total_crypto_amount: totalcrypto,
//           wallet_address: walletAddress

//         };
//             // User doesn't exist, store the data in the database
//             db.query('INSERT INTO 2settle_transaction_table SET ?', user, (err, result) => {
//               if (err) {
//                 console.error('Error storing user data in the database:', err);
//                 return;
//               }
//             })


//  }
//    })
//     }else{
//       const message = 'Enter a valid option provided. Try again'
//       bot.sendMessage(chatId, message)
//     }
  
//   }


  











// module.exports = { 
//     handleSelectCurrency,
//     handleNairaAmount,
//     handleSelectNetwork,
//     handleBtc,
//     handleCryptos,
//     handleAcctNo,
//     handleAcctName,
//     Unavailable,
//     handleDollarAmount,
//     handleDollarAcctNo,
//     handlDollareAcctName,
//     handleDollarUnavailable,
//     handleCryptoAmount,
//     handleCryptoAcctNo,
//     handleCryptoAcctName,
//     handleCryptoUnavailable
//    }
