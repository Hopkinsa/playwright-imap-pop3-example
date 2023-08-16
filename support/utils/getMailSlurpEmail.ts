import { MailSlurp } from 'mailslurp-client';
import { emailSettings } from '../constants/email';
import { findPin, IEmailPin } from './emailUtils'

class slurp_api {
  private server: MailSlurp;
  private email: any;

  constructor() {
    this.server = new MailSlurp({apiKey: emailSettings.mailSlurp.api});
    this.email = {
      pin: '',
      inHTML: false,
    };
  }
  getMail = async (): Promise<IEmailPin> => {
    try {
      this.email = await this.server.waitController.waitForLatestEmail({
        inboxId: emailSettings.mailSlurp.inbox_id,
        timeout: emailSettings.mailSlurp.timeoutMs,
        unreadOnly: true,
      })

      const emailPin = await findPin( this.email.subject, this.email.body );

      return Promise.resolve( emailPin );
    } catch ( err ) {
      console.log( err );
      return Promise.reject( err );
    }
  };

}

export class getEmailSlurp {
  private mailbox;
  constructor( ) {
    console.log('Accessing MailSlurp');
    this.mailbox = new slurp_api();
  }

  public getPin = async (): Promise<any> => {
    console.log('Getting Pin');
    const pin = this.mailbox.getMail();
    console.log( pin );
    return pin ;
  }
}
