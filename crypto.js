let transactionFee;
const id = 1

function handleCryptoAmount(chatId,choice, bot, menuChoice,db, sessions){
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
       
       if(sessions[chatId]['cryptoNetwork']  !== 'USDT'){
       fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork'] }`)
       .then(res => res.json())
       .then(data =>  {
        sessions[chatId]['cryptoPrice']   =  data.price
      
           const maxs = maximum / sessions[chatId]['cryptoPrice']
           const mins = minium  / sessions[chatId]['cryptoPrice']

             const numberMax = maxs.toFixed(4)
             const numberMin = mins.toFixed(4)

             const max = Number(numberMax)
             const min = Number(numberMin)
           if(choice <= max && choice >= min && Number(choice)){
            sessions[chatId]['amount'] = choice
            const message =`Enter the account number, you'd like to receive the payment`
            bot.sendMessage(chatId, message);
            menuChoice[chatId] = 'cryptoAcctNo'
            }else{
              const message = `maximum payment is ${max} ${sessions[chatId]['cryptoasset']} and minium payment is ${min} ${sessions[chatId]['cryptoasset']}. try again `
              bot.sendMessage(chatId, message);
            }
  
       })

      }else{
        const numMax = Number.parseInt(maximum)
        const numMin =  Number.parseInt(minium)
        const max = numMax.toLocaleString()
        const min = numMin.toLocaleString()
        if(choice <= max && choice >= min && Number(choice)){
          sessions[chatId]['amount'] = choice
          const message =`Enter the account number, you'd like to receive the payment`
          bot.sendMessage(chatId, message);
          menuChoice[chatId] = 'dollarAcctNo'
          }else{
            const message = `maximum payment is $${max} ${sessions[chatId]['cryptoasset']} and minium payment is $${min} ${sessions[chatId]['cryptoasset']}. try again `
            bot.sendMessage(chatId, message);
          }
      }

        
       

    })
   
  }



  function handleCryptoAcctNo(chatId,choice,bot,menuChoice,sessions){
    if(choice.length === 10 && Number(choice)){
      sessions[chatId]['acct_no']= choice
     fetch(`https://app.nuban.com.ng/possible-banks/NUBAN-OEIOAASY1257?acc_no=${sessions[chatId]['acct_no']}`)
     .then(res => res.json())
     .then(data => {
      const banks = data.map((row) => `${row.bank_code}. ${row.name}`)
      const reply = 'select  your bank by using the numbers:\n' + banks.join('\n');
      bot.sendMessage(chatId, reply)
    }).catch(error => console.log(error))
     menuChoice[chatId] = 'cryptoacctname'
    }else{
      const message = 'Enter a valid account number. Try again'
      bot.sendMessage(chatId, message)
    }
  }





  function handleCryptoAcctName(chatId,choice,bot,menuChoice,sessions){
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

        const dollarValue =   sessions[chatId]['amount'] * sessions[chatId]['cryptoPrice'] 
        const nairaValue =  dollarValue * dollarRate
         const nairaInterger = nairaValue.toFixed(0)
         const nairaNumber =  Number.parseInt(nairaInterger)
         sessions[chatId]['naira'] = nairaNumber.toLocaleString()
         
       const reply = `You are sending N${sessions[chatId]['naira']} which is equivalent to: ${sessions[chatId]['amount']} ${sessions[chatId]['cryptoasset']} \n Name: ${stringName} \n Bank name:${ sessions[chatId]['bankNameString']}\n Account number: ${sessions[chatId]['acctNoString']}`
       bot.sendMessage(chatId, reply)
        
       .then(() => {
        const menuOptions = [
          '1. Continue',
          '2. EXIT',
        ];
        bot.sendMessage(chatId, 'Here is your menu: \n' + menuOptions.join('\n'));
      })
      menuChoice[chatId] = 'cryptoUnavailable'
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





  function handleCryptoUnavailable(chatId,choice,bot,menuChoice,db, sessions){
    if(choice === '1'){
       
        const dollarValue =   sessions[chatId]['amount'] * sessions[chatId]['cryptoPrice']
        const nairaValue =  dollarValue * dollarRate

    if(nairaValue <= 100000){
       transactionFee = 500
    }else if(nairaValue <= 1000000){
       transactionFee = 1000
    }else if(nairaValue <= 2000000){
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
      
     const dollarTrasacFee = transactionFee / rate
     const cryptodollar =  sessions[chatId]['amount'] * sessions[chatId]['cryptoPrice']
    const dollar =  cryptodollar + dollarTrasacFee
    const percentage = 0.8
    var increase = (percentage / 100) * dollar
    var result = dollar + increase; 
    if(sessions[chatId]['cryptoNetwork'] !== 'USDT' ){
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sessions[chatId]['cryptoNetwork']}`)
    .then(res => res.json())
    .then(data =>  {
        sessions[chatId]['cryptoPrice'] = data.price
       const asset = result / sessions[chatId]['cryptoPrice']
       const totalcrypto = asset.toFixed(4)
          const message = `Send ${totalcrypto} ${sessions[chatId]['cryptoasset']} to our walllet address. \n\ncopy or scan the wallet address below 👇🏾`
        bot.sendMessage(chatId, message)
        .then(()=> {
          bot.sendMessage(chatId,  sessions[chatId]['walletAddress'])
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
          network: sessions[chatId]['cryptoNetwork'],
          estimation: sessions[chatId]['estimate'],
          acct_number: sessions[chatId]['acctNoString'],
          bank_name:  sessions[chatId]['bankNameString'],
          receiver_name: sessions[chatId]['stringName'],
          receiver_amount:  sessions[chatId]['naira'],
          crypto_amount:  sessions[chatId]['amount'],
          total_crypto_amount: totalcrypto,
          wallet_address:  sessions[chatId]['walletAddress']

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
          bot.sendMessage(chatId,  sessions[chatId]['walletAddress'])
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
          network: sessions[chatId]['cryptoNetwork'],
          estimation: sessions[chatId]['estimate'],
          acct_number: sessions[chatId]['acctNoString'],
          bank_name:  sessions[chatId]['bankNameString'],
          receiver_name: sessions[chatId]['stringName'],
          receiver_amount:  sessions[chatId]['naira'],
          crypto_amount:  sessions[chatId]['amount'],
          total_crypto_amount: totalcrypto,
          wallet_address:  sessions[chatId]['walletAddress']

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
    handleCryptoAmount,
    handleCryptoAcctNo,
    handleCryptoAcctName,
    handleCryptoUnavailable
   }

