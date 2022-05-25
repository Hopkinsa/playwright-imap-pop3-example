export const emailSettings = {
  imap: {
    host: 'imap.ethereal.email',
    port: 993,
    secure: true,
  },
  pop3: {
    host: 'pop3.ethereal.email',
    port: 995,
    secure: true,
  },
  smtp: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: true,
  },
  authentication: {
    username: '',
    password: ''
  },
}

export interface IimapServer {
  host: string,
  port: number,
  tls: boolean,
  user: string,
  password: string,
};

export interface Ipop3Server {
  host: string,
  port: number,
  tls: boolean,
  username: string;
  password: string;
  mailparser: boolean,
};
