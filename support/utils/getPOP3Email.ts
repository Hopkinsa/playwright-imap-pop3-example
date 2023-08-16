import * as pop3 from 'yapople';
import { emailSettings, IServerPop3 } from '../constants/email';
import { findPin, IEmailPin } from './emailUtils'

class pop3_email {
  private server: IServerPop3;
  private email: IEmailPin;

  constructor() {
    this.server = {
      host: emailSettings.pop3.host,
      port: emailSettings.pop3.port,
      tls: emailSettings.pop3.secure,
      username: emailSettings.pop3.authentication.username,
      password: emailSettings.pop3.authentication.password,
      mailparser: true,
    };
    this.email = {
      pin: '',
      inHTML: false,
    };
  }

  getPop3Email = async ( messages ) => {
    messages.forEach( async ( message ) => {
      this.email = await findPin( message.subject, message.html );
    } );
  }

  getMail = async (): Promise<IEmailPin> => {
    try {
      const client = new pop3.Client( this.server );
      await client.connect();
      const messages = await client.retrieveAll();
      await this.getPop3Email( messages );
      await client.quit();
      return Promise.resolve( this.email );
    } catch ( err ) {
      console.log( err );
      return Promise.reject( err );
    }
  };
}

export class getEmailPOP3 {
  private mailbox;
  constructor( ) {
    console.log('Accessing POP3');
    this.mailbox = new pop3_email();
  }

  public getPin = async (): Promise<IEmailPin> => {
    console.log('Getting Pin');
    const pin = await this.mailbox.getMail();
    console.log( pin );
    return pin ;
  }
}
