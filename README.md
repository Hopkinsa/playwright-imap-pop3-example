# Playwright example for getting strings from IMAP or POP3 email

This example uses the fake email server at from [ethereal.email](https://ethereal.email/). If you choose to use this as well, please be aware that the  mailboxes are regularly emptied.

## Installation

Just use `npm install`

Note: Node.js version 12 or higher is required to use Playwright. It won't install correctly on older Node versions

## Test email retrieval

Run `npm run start:dev` to execute the code to retrieve emails.

## Running tests

Run `npm run test-all` to run all Playwright tests.  

Run `TEST=<name> npm run test-one` to start a single Playwright test. For example, `TEST=email npm run test-one` will only run the tests in `email.spec.ts`.

## View reports

Run `npm run show-report` to start the Playwright report server.

## How to configure

You can customise the number of retries for failing test along with many other options by altering the values in the `playwright.config.ts` file.

The settings in `support/constants/email.ts` must be changed. They are as follows:

```typescript
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
    username: 'EMAIL USERNAME',
    password: 'EMAIL PASSWORD'
  },
}
```

`host` is the address of the email server.

`port` is the port to connect via.

`secure` indicates whether or not to attempt a secure connection - can be true or false

`authentication.username` is the username required to access the mailbox.

`authentication.password` is the password required to access the mailbox.

To set which mailbox type to use just pass the value to the class on initialisation, for example

`const example = new getEmail( 'pop3' );`

or

`const example = new getEmail( 'imap' );`
