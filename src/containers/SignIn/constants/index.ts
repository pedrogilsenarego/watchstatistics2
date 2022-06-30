export const menuButtons = (setWhichMenu: any) => [
  {
    name: "Login",
    onClick: () => setWhichMenu("main"),
  },
  {
    name: "Register",
    onClick: () => setWhichMenu("register"),
  },
  { name: "Reset Password", onClick: () => setWhichMenu("recover") },
];
