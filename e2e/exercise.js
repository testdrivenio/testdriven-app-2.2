import { Selector } from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

const TEST_URL = process.env.TEST_URL;


fixture('/').page(`${TEST_URL}/`);

test(`should display the exercises correctly if a user is not logged in`, async (t) => {
  await t
    .navigateTo(`${TEST_URL}/`)
    .expect(Selector('H1').withText('Exercises').exists).ok()
    .expect(Selector('.alert-warning').withText('Please log in to submit an exercise.').exists).ok()
    .expect(Selector('button').withText('Run Code').exists).notOk()
});

test(`should allow a user to submit an exercise if logged in`, async (t) => {
  await t
    .navigateTo(`${TEST_URL}/register`)
    .typeText('input[name="username"]', username)
    .typeText('input[name="email"]', email)
    .typeText('input[name="password"]', password)
    .click(Selector('input[type="submit"]'))
  await t
    .navigateTo(`${TEST_URL}/`)
    .expect(Selector('H1').withText('Exercises').exists).ok()
    .expect(Selector('.alert-warning').withText('Please log in to submit an exercise.').exists).notOk()
    .expect(Selector('button').withText('Run Code').exists).ok()
    .click(Selector('button').withText('Run Code'))
    .expect(Selector('h4').withText('Incorrect!').exists).ok()
});
