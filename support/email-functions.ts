import { mailbox } from './constants/email';
import { IEmailPin } from './utils/emailUtils';
import { getEmailImap } from './utils/getIMapEmail'
import { getEmailPOP3 } from './utils/getPOP3Email'
import { getEmailSlurp } from './utils/getMailSlurpEmail'

export async function findPin(): Promise<IEmailPin> {
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
    return email;
  }
}

export async function isPinFound(): Promise<boolean> {
  const email = await findPin();
  return email.inHTML;
}
