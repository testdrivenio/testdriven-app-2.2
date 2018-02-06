import { Selector } from 'testcafe';

const TEST_URL = process.env.TEST_URL;


fixture('/all-users').page(`${TEST_URL}/all-users`);

test(`should display the all-users page correctly if a user is not logged in`, async (t) => {
  await t
    .navigateTo(`${TEST_URL}/all-users`)
    .expect(Selector('H1').withText('All Users').exists).ok()
    .expect(Selector('a').withText('User Status').exists).notOk()
    .expect(Selector('a').withText('Log Out').exists).notOk()
    .expect(Selector('a').withText('Register').exists).ok()
    .expect(Selector('a').withText('Log In').exists).ok()
    .expect(Selector('a').withText('Swagger').exists).ok()
    .expect(Selector('a').withText('Users').exists).ok()
    .expect(Selector('.alert').exists).notOk()
});
