export const mailbox: string = 'imap'; // imap | pop3 | slurp

export const emailSettings = {
  imap: {
    host: 'imap.ethereal.email',
    port: 993,
    secure: true,
    authentication: {
      username: '',
      password: ''
    },
  },
  pop3: {
    host: 'pop3.ethereal.email',
    port: 995,
    secure: true,
    authentication: {
      username: '',
      password: ''
    },
  },
  smtp: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: true,
    authentication: {
      username: '',
      password: ''
    },
  },
  mailSlurp: {
    api: '',
    inbox_id: '',
    timeoutMs: 60000,
  },
}

interface IServer {
  host: string,
  port: number,
  tls: boolean,
  password: string,
}

export interface IServerImap extends IServer {
  user: string,
};

export interface IServerPop3 extends IServer {
  username: string,
  mailparser: boolean,
};