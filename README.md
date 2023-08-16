# Playwright example for getting strings from IMAP or POP3 email

This example uses the email servers from [ethereal.email](https://ethereal.email/) and [mailslurp.com](https://www.mailslurp.com).

If you choose to use either service please be aware that third party services may regularly empty the inboxes.

## Installation

Just use `npm install`

**Note:** Node.js version 12 or higher is required to use Playwright. It won't install correctly on older Node versions

## How to configure

You can customise the number of retries for failing test along with many other options by altering the values in the `playwright.config.ts` file.

The settings in `support/constants/email.ts` must be changed. They are as follows:

```typescript
export const mailbox: string = 'imap';

export const emailSettings = {
  imap: {
    host: 'imap.ethereal.email',
    port: 993,
    secure: true,
    authentication: {
      username: 'EMAIL USERNAME',
      password: 'EMAIL PASSWORD'
    },
  },
  pop3: {
    host: 'pop3.ethereal.email',
    port: 995,
    secure: true,
    authentication: {
      username: 'EMAIL USERNAME',
      password: 'EMAIL PASSWORD'
    },
  },
  smtp: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: true,
    authentication: {
      username: 'EMAIL USERNAME',
      password: 'EMAIL PASSWORD'
    },
  },
  mailSlurp: {
    api: 'API KEY FROM mailslurp.com',
    inbox_id: 'ID OF INBOX',
    timeoutMs: 60000,
  },
}
```

`mailbox` is the type of mailbox to access - can be either **imap**, **pop3** or **slurp**.

`host` is the address of the email server.

`port` is the port to connect via.

`secure` indicates whether or not to attempt a secure connection - can be **true** or **false**.

`authentication.username` is the username required to access the mailbox.

`authentication.password` is the password required to access the mailbox.

`api` is the api key generated for accessing the MailSlurp account.

`inbox_id` is the ID of the MailSlurp inbox to access.

`timeoutMs` is the amount of time in milliseconds to wait for the email to arrive if it is not in the inbox.

## The example Playwright test

Find a six character verification code in an email and confirm the code in the subject line matches the code in the HTML body.

## Expected email content

This example expects the inbox to contain an email similar to

```
    Subject: ABC123 is your verification code

    Body:
        Hi Tester,

        Please use the following code:

        ABC123

        Yours sincerely,

        Us
```

## Test email retrieval

Run `npm run start:dev` to execute the code to retrieve emails.

## Running the Playwright test

Run `npm run test-all` to run all Playwright tests.

Run `TEST=<name> npm run test-one` to start a single Playwright test. For example, `TEST=email npm run test-one` will only run the tests in `email.spec.ts`.

## View reports

Run `npm run show-report` to start the Playwright report server.
