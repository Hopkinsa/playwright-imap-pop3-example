import { mailbox } from './support/constants/email';
import { getEmailImap } from './support/utils/getIMapEmail'
import { getEmailPOP3 } from './support/utils/getPOP3Email'
import { getEmailSlurp } from './support/utils/getMailSlurpEmail'
// *********************************************
// FOR TESTING MAILBOX - UNCOMMENT AND USE THE
// FOLLOWING IN THE DIRECTORY ./playwright-tests
// *********************************************
//
// npm run start:dev
//
(async () => {
    let findEmail = null;
    if (mailbox === 'imap') {
        findEmail = new getEmailImap();
    }

    if (mailbox === 'pop3') {
        findEmail = new getEmailPOP3();
    }

    if (mailbox === 'slurp') {
        findEmail = new getEmailSlurp();
    }

    if (findEmail !== null && findEmail !== undefined) {
        const email = await findEmail.getPin();
        console.log(email);
    } else {
        console.log('No valid mailbox selected');
    }
})();