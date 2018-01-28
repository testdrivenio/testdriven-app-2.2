import { Selector } from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

const TEST_URL = process.env.TEST_URL;

fixture('/register').page(`${TEST_URL}/register`);

test(`should display flash messages correctly`, async (t) => {

  // register user
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', password)
    .click(Selector('input[type="submit"]'))

  // assert flash messages are removed when user clicks the 'x'
  await t
    .expect(Selector('.alert-success').withText('Welcome!').exists).ok()
    .click(Selector('.alert > button'))
    .expect(Selector('.alert-success').withText('Welcome!').exists).notOk()

  // log a user out
  await t
    .click(Selector('a').withText('Log Out'))

  // attempt to log in
  await t
    .navigateTo(`${TEST_URL}/login`)
    .typeText('input[name="email"]', 'incorrect@email.com')
    .typeText('input[name="password"]', password)
    .click(Selector('input[type="submit"]'))

  // assert correct message is flashed
  await t
    .expect(Selector('.alert-success').exists).notOk()
    .expect(Selector('.alert-danger').withText(
      'User does not exist.').exists).ok()

  // log a user in
  await t
    .navigateTo(`${TEST_URL}/login`)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', password)
    .click(Selector('input[type="submit"]'))

  // assert flash message is removed when a new message is flashed
  await t
    .expect(Selector('.alert-success').withText('Welcome!').exists).ok()
    .expect(Selector('.alert-danger').withText(
      'User does not exist.').exists).notOk()

  // log a user out
  await t
    .click(Selector('a').withText('Log Out'))

  // log a user in
  await t
    .navigateTo(`${TEST_URL}/login`)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', password)
    .click(Selector('input[type="submit"]'))

  // assert flash message is removed after three seconds
  await t
    .expect(Selector('.alert-success').withText('Welcome!').exists).ok()
    .wait(4000)
    .expect(Selector('.alert-success').withText('Welcome!').exists).notOk()

});
