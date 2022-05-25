import { getEmail } from './support/utils/getEmail'

// *********************************************
// FOR TESTING MAILBOX - UNCOMMENT AND USE THE
// FOLLOWING IN THE DIRECTORY ./playwright-tests
// *********************************************
//
// npm run start:dev
//
( async () => {
const test = new getEmail( 'pop3' );
const pin = await test.getPin();
console.log( pin );
} )();
