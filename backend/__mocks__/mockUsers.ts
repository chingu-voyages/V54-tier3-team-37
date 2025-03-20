export const mockUsers = {
  validUser: [
    {
      email: "foo@bar.dev",
      name: "Foo",
    },
    {
      email: "hello@world.dev",
      name: "Hello",
    },
  ],
  invalidUser: [
    {
      email: "",
      name: "Foo",
    },
    {
      email: "foo@bar.dev",
      name: "",
    },
    {
      email: "",
      name: "",
    },
  ],
};
