import { Selector } from 'testcafe';

const TEST_URL = process.env.TEST_URL;
const SERVER_URL = process.env.SERVER_URL


fixture('/swagger').page(`${TEST_URL}/`);

test(`should display the swagger docs correctly`, async (t) => {
  await t
    .navigateTo(TEST_URL)
    .click(Selector('a').withText('Swagger'))
    .expect(Selector('select > option').withText(SERVER_URL).exists).ok()
});
