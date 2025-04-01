export const mockUsers = {
  unregisteredUser: [
    { email: "foo@bar.dev", displayName: "Foo" },
    {
      email: "hello@world.dev",
      displayName: "Hello",
    },
  ],
  validUser: [
    {
      id: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
      email: "hello@bar.dev",
      displayName: "Foo",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "world@world.dev",
      displayName: "Hello",
    },
  ],
  invalidUser: [
    { id: "", email: "", displayName: "" },
    { id: "12345", email: "", displayName: "" },
    { id: "12345", email: "foo@bar.dev", displayName: "" },
    { id: "", email: "", displayName: "Foo" },
    { id: "", email: "hello@world.dev", displayName: "Bar" },
    { id: "12345", email: "", displayName: "Foo" },
  ],
};
