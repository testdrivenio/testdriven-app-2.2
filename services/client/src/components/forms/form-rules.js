export const registerFormRules = [
  {
    id: 1,
    field: 'username',
    name: 'Username must be greater than 5 characters.',
    valid: false
  },
  {
    id: 2,
    field: 'email',
    name: 'Email must be greater than 5 characters.',
    valid: false
  },
  {
    id: 3,
    field: 'email',
    name: 'Email must be a valid email address.',
    valid: false
  },
  {
    id: 4,
    field: 'password',
    name: 'Password must be greater than 10 characters.',
    valid: false
  }
];

export const loginFormRules = [
  {
    id: 1,
    field: 'email',
    name: 'Email is required.',
    valid: false
  },
  {
    id: 2,
    field: 'password',
    name: 'Password is required.',
    valid: false
  }
];
