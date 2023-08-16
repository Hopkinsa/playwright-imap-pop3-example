export interface IEmailPin {
  pin: string;
  inHTML: boolean;
}

export async function findPin(emailSubject: string, htmlEmail: string ): Promise<IEmailPin> {
  const subject = emailSubject.match( /(\w+) is your verification code/ );
  const subjectPin = subject[ 1 ];
  const htmlPin = htmlEmail.includes( subjectPin );
  const email:IEmailPin = { pin: subjectPin, inHTML: htmlPin };
  return email;
}
