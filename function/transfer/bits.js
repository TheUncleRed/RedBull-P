// async function LutexBits(client, { channel, BankID, amount, time = 60000 }) {
// const allowedBotIds = ['451379187031343104', '1276522930653630556'];

// if (!channel) throw new Error("Missing required parameter: channel");
// if (!BankID) throw new Error("Missing required parameter: BankID");
// if (amount === undefined) throw new Error("Missing required parameter: amount");
// const user = await client.users.fetch(BankID);

// return new Promise((resolve) => {
// const filter = (oldMessage, newMessage) =>
// newMessage.channel.id === channel.id && allowedBotIds.includes(newMessage.author.id) && (
// newMessage.content.includes(`<:yes:1284538119420383282> **Transfer successful! You have transferred \`\`$${amount}\`\``) && newMessage.content.includes(`<@${BankID}>`) && newMessage.content.includes("has been deducted** <:xpluna:1284524822306750544>") || newMessage.content.includes(`You have successfully transferred \`\`$${amount}\`\``) && newMessage.content.includes(`<@${BankID}>`) || newMessage.content === `**> <:yea:1079670590807474216> Successfully transfered \`$${amount}\` bits to ${user.username}!**`
// );
// // newMessage.content.includes(`<:yes:1284538119420383282> **Transfer successful! You have transferred \`\`$${amount}\`\``) && newMessage.content.includes(`<@${BankID}>`) && newMessage.content.includes("has been deducted** <:xpluna:1284524822306750544>") || newMessage.content.includes(`You have successfully transferred \`\`$${amount}\`\``) && newMessage.content.includes(`<@${BankID}>`)

// const listener = (oldMessage, newMessage) => {
// if (filter(oldMessage, newMessage)) {
// resolve(true);
// client.off('messageUpdate', listener);  
//  }
// };

// client.on('messageUpdate', listener);

// setTimeout(() => {
// resolve(false);
//   client.off('messageUpdate', listener);
// }, time);
//   });
// }

// module.exports = {
// LutexBits
// };

async function LutexBits(client, { channel, BankID, amount, time = 60000 }) {
const allowedBotIds = ['451379187031343104', '1276522930653630556'];

if (!channel) throw new Error("Missing required parameter: channel");
if (!BankID) throw new Error("Missing required parameter: BankID");
if (amount === undefined) throw new Error("Missing required parameter: amount");
  
const user = await client.users.fetch(BankID);
  
    return new Promise((resolve) => {
      const filter = (oldMessage, newMessage) => {
        if (
          newMessage.channel.id === channel.id &&
          allowedBotIds.includes(newMessage.author.id) &&
          newMessage.content.includes(`<@${BankID}>`) &&
          newMessage.content.includes(`You have transferred \`\`$`)
        ) {

          const match = newMessage.content.match(/\$\d+\.\d+/);
          if (match) {
            const transferredAmount = parseFloat(match[0].replace('$', ''));
            
            console.log(`Transferred Amount: ${transferredAmount}, Amount Expected: ${amount}`);
            if (transferredAmount >= amount) {
              return true;
            }
          }
        }
        return false;
      };
  
      const listener = (oldMessage, newMessage) => {
        if (filter(oldMessage, newMessage)) {
          resolve(true);
          client.off('messageUpdate', listener);
        }
      };
  
      client.on('messageUpdate', listener);
  
      setTimeout(() => {
        resolve(false);
        client.off('messageUpdate', listener);
      }, time);
    });
  }

function taxBits(price) {
return Math.ceil(price * 1.025); // إضافة 2.5% مع التقريب للأعلى لضمان كفاية المبلغ
}

const taxAmount = '2.5%';

  module.exports = {
    LutexBits,
    taxBits,
    taxAmount
  };