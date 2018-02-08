import { Selector } from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

const TEST_URL = process.env.TEST_URL;


fixture('/').page(`${TEST_URL}/`);

test(`should display the page correctly if a user is not logged in`, async (t) => {
  await t
    .navigateTo(TEST_URL)
    .expect(Selector('h1').withText('Exercises').exists).ok()
    .expect(Selector('a').withText('User Status').exists).notOk()
    .expect(Selector('a').withText('Log Out').exists).notOk()
    .expect(Selector('a').withText('Register').exists).ok()
    .expect(Selector('a').withText('Log In').exists).ok()
    .expect(Selector('a').withText('Swagger').exists).ok()
    .expect(Selector('a').withText('Users').exists).ok()
    .expect(Selector('button').withText('Run Code').exists).notOk()
    .expect(Selector('.alert-warning').withText(
      'Please log in to submit an exercise.').exists).ok()
});

test(`should display the page correctly if a user is logged in`, async (t) => {
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', password)
    .click(Selector('input[type="submit"]'))
    .navigateTo(TEST_URL)
    .expect(Selector('h1').withText('Exercises').exists).ok()
    .expect(Selector('a').withText('User Status').exists).ok()
    .expect(Selector('a').withText('Log Out').exists).ok()
    .expect(Selector('a').withText('Register').exists).notOk()
    .expect(Selector('a').withText('Log In').exists).notOk()
    .expect(Selector('a').withText('Swagger').exists).ok()
    .expect(Selector('a').withText('Users').exists).ok()
    .expect(Selector('.alert').exists).notOk()
    .expect(Selector('button').withText('Run Code').exists).ok()
    .expect(Selector('.alert-warning').withText(
      'Please log in to submit an exercise.').exists).notOk()
});
