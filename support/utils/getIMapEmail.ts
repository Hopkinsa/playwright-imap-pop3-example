import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { emailSettings, IServerImap } from '../constants/email';
import { findPin, IEmailPin } from './emailUtils'

class imap_email {
  private server: IServerImap;
  private email: IEmailPin;

  constructor() {
    this.server = {
      host: emailSettings.imap.host,
      port: emailSettings.imap.port,
      tls: emailSettings.imap.secure,
      user: emailSettings.imap.authentication.username,
      password: emailSettings.imap.authentication.password
    };
    this.email = {
      pin: '',
      inHTML: false,
    };
  }

  processEmail = async ( subject: string, htmlEmail: string ) => {
    // Because the IMAP library uses events, this is needed to make it work properly sequentially
    const emailPin = await findPin( subject, htmlEmail );
    this.email = {
      pin: emailPin.pin,
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
            const endFlag2 = await this.processEmail( subject, textAsHtml );
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

export class getEmailImap {
  private mailbox;
  constructor() {
    console.log('Accessing IMap');
    this.mailbox = new imap_email();
  }

  public getPin = async (): Promise<IEmailPin> => {
    console.log('Getting Pin');
    const pin = await this.mailbox.getMail();
    console.log( pin );
    return pin ;
  }
}
