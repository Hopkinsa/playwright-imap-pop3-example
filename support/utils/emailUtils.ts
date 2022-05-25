export interface IEmailPin {
  pin: string;
  inText: boolean;
  inHTML: boolean;
}

export async function findPin(emailSubject: string, textEmail: string, htmlEmail: string ): Promise<IEmailPin> {
  const subject = emailSubject.match( /(\w+) is your verification code/ );
  const subjectPin = subject[ 1 ];
  const textPin = textEmail.includes( subjectPin );
  const htmlPin = htmlEmail.includes( subjectPin );
  const email:IEmailPin = { pin: subjectPin, inText: textPin, inHTML: htmlPin };
  return email;
}
