export const mockUsers = {
  unregisteredUser: [
    { email: "foo@bar.dev", displayName: "Foo" },
    {
      email: "hello@world.dev",
      displayName: "Hello",
    },
  ],
  validUser: [
    { id: "13456-skldfjawe-9fo233", email: "foo@bar.dev", displayName: "Foo" },
    {
      id: "12345-sdfnhsdfn-37u023",
      email: "hello@world.dev",
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
