import { expect } from '@playwright/test';
import { test } from '../setup/extendConfig';
import { findPin } from '../support/email-functions';

test.describe( 'Example test to get code from email', () => {
  test( 'Assert that the pin is the same in subject, text email and html email', async () => {
    const test = await findPin();
    await expect( test.inHTML ).toBe( true );
  } );
} );
