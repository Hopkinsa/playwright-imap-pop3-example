import * as pop3 from 'yapople';
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { emailSettings, IimapServer, Ipop3Server } from "../constants/email";
import { findPin, IEmailPin } from "./emailUtils"

class imap_email {
  private server: IimapServer;
  private email: IEmailPin;

  constructor() {
    this.server = {
      host: emailSettings.imap.host,
      port: emailSettings.imap.port,
      tls: emailSettings.imap.secure,
      user: emailSettings.authentication.username,
      password: emailSettings.authentication.password
    };
    this.email = {
      pin: '',
      inText: false,
      inHTML: false,
    };
  }

  processEmail = async ( subject: string, textEmail: string, htmlEmail: string ) => {
    // Because the IMAP library uses events, this is needed to make it work properly sequentially
    const emailPin = await findPin( subject, textEmail, htmlEmail );
    this.email = {
      pin: emailPin.pin,
      inText: emailPin.inText,
      inHTML: emailPin.inHTML,
    };
    return true;
  }

  getImapEmail = async ( imap, results, err ) => {
    const endFlag = await ( new Promise( ( resolve, reject ) => {
      const fetchEmail = imap.fetch( results, { bodies: '' } );
      fetchEmail.on( 'message', msg => {
        msg.on( 'body', stream => {
          simpleParser( stream, async ( err, parsed ) => {
            const { subject, textAsHtml, text } = parsed;
            const endFlag2 = await this.processEmail( subject, text, textAsHtml );
            if ( endFlag2 ) { resolve(true); }
          } );
        } )
        msg.once( 'attributes', attrs => {
          const { uid } = attrs;
          imap.addFlags( uid, [ '\\Seen' ], () => {
            // Mark the email as read after reading it
          } );
        } );
        // msg.once( 'end', () => console.log('all done') );
      } );
      // The following event could be used, but I found the event fires too soon and causes problems for Playwright
      // fetchEmail.once('end', function() { console.log('Done fetching all messages!'); });
    } ) );
    return true;
  }

  getImap = async () => {
    const endFlag = await ( new Promise( ( resolve, reject ) => {
        const imap = new Imap( this.server );

        imap.once( 'ready', async () => {
          await imap.openBox( 'INBOX', false, async () => {
            await imap.search( [ 'SEEN', [ 'SINCE', new Date() ] ], async ( err, results ) => {
              const endFlag2 = await this.getImapEmail( imap, results, err );
              if ( endFlag2 ) { imap.end(); resolve(true); }
            } );
          } );
        } );

        imap.once( 'error', reject );
        // The following event could be used, but I found the event fires too soon and causes problems for Playwright
        // imap.once( 'end', () => {} );
        imap.connect();
    } ) );
    return true
  };

  getMail = async () => {
    try {
      const endFlag = await this.getImap();
      if ( endFlag ) { return this.email; }
    } catch ( err ) {
      console.log( err );
    }
    return null;
  }
}

class pop3_email {
  private server: Ipop3Server;
  private email: IEmailPin;

  constructor() {
    this.server = {
      host: emailSettings.pop3.host,
      port: emailSettings.pop3.port,
      tls: emailSettings.pop3.secure,
      username: emailSettings.authentication.username,
      password: emailSettings.authentication.password,
      mailparser: true,
    };
    this.email = {
      pin: '',
      inText: false,
      inHTML: false,
    };
  }

  getPop3Email = async ( messages ) => {
    messages.forEach( async ( message ) => {
      this.email = await findPin( message.subject, message.text, message.html );
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

export class getEmail {
  private mailbox;
  constructor( mailType: string ) {
    console.log('NEW getEmail');
    if ( mailType.toLowerCase() === 'pop3' ) {
      this.mailbox = new pop3_email();
      console.log('Using: POP3');
    }
    if ( mailType.toLowerCase() === 'imap' ) {
      this.mailbox = new imap_email();
      console.log('Using: IMAP');
    }
  }

  public getPin = async (): Promise<IEmailPin> => {
    console.log('Getting Pin');
    const pin = await this.mailbox.getMail();
    console.log( pin );
    return pin ;
  }
}
