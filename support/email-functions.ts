import { IEmailPin } from './utils/emailUtils';
import { getEmail } from './utils/getEmail'

export async function findPin(): Promise<IEmailPin> {
  const findEmail= new getEmail( 'imap' );
  const email = await findEmail.getPin();
  return email;
}

export async function isPinFound(): Promise<boolean> {
  const email = await findPin();
  if (email.inText && email.inHTML) {
    return true;
  }
  return false
}
