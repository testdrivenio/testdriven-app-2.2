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
    .expect(Selector('.btn-group').exists).ok()
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).notOk();
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
    .expect(Selector('.btn-group').exists).ok()
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).notOk()
    .click(Selector('button').withText('Run Code'))
    .expect(Selector('h4').withText('Incorrect!').exists).ok()
    .expect(Selector('h4').withText('Correct!').exists).notOk()
  await t
    .navigateTo(`${TEST_URL}/`)
    .selectText(Selector('textarea'))
    .pressKey('home')
    for (let i = 0; i < 23; i++) {
      await t.pressKey('delete')
    }
  await t
    .typeText('textarea', 'def sum(x,y):\nreturn x+y')
    .click(Selector('button').withText('Run Code'))
    .expect(Selector('h4').withText('Incorrect!').exists).notOk()
    .expect(Selector('h4').withText('Correct!').exists).ok()
});

test(`should allow a user to move to different exercises`, async (t) => {
  await t
    .expect(Selector('.btn-group').exists).ok()
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).notOk()
    .click(Selector('button').withText('Next'))
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).ok()
    .click(Selector('button').withText('Next'))
    .expect(Selector('button').withText('Next').exists).notOk()
    .expect(Selector('button').withText('Prev').exists).ok()
    .click(Selector('button').withText('Prev'))
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).ok()
});

test(`should allow a user to move to different exercises`, async (t) => {
  await t
    .expect(Selector('.btn-group').exists).ok()
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).notOk()
    .expect(Selector('.ace_comment').withText(
      '# Enter your code here.').exists).ok()
    .click(Selector('button').withText('Next'))
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).ok()
    .expect(Selector('.ace_comment').withText(
      '# Enter your code here.').exists).ok()
    .click(Selector('button').withText('Next'))
    .expect(Selector('button').withText('Next').exists).notOk()
    .expect(Selector('button').withText('Prev').exists).ok()
    .expect(Selector('.ace_comment').withText(
      '# Enter your code here.').exists).ok()
    .selectText(Selector('textarea'))
    .pressKey('home')
    for (let i = 0; i < 23; i++) {
      await t.pressKey('delete')
    }
  await t
    .typeText('textarea', 'def sum(x,y):\nreturn x+y')
    .click(Selector('button').withText('Prev'))
    .expect(Selector('button').withText('Next').exists).ok()
    .expect(Selector('button').withText('Prev').exists).ok()
    .expect(Selector('.ace_comment').withText(
      '# Enter your code here.').exists).ok()
});
