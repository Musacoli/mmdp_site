const user = {
  fetchedUsersData: [
    {
      email: 'john@andela.com',
      phone: 7288888888,
      isAdmin: false,
      confirmed: true,
      username: 'john',
      last_name: 'John',
      first_name: 'Doe',
      groups: [{ _id: 1, name: 'admin' }],
    },
    {
      email: 'smith@gmail.com',
      isAdmin: false,
      confirmed: false,
      username: 'smith',
      last_name: 'Smith',
      first_name: 'John',
      groups: [{ _id: 1, name: 'admin' }],
    },
    {
      email: 'tom@gmail.com',
      isAdmin: false,
      confirmed: false,
      username: 'tom',
      last_name: 'Tom',
      first_name: 'Jack',
      groups: [{ _id: 1, name: 'admin' }],
    },
  ],
};

export default user;
