export const passwordStrength = (password) => {
  if (!password) return "Enter password";
  const strong = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
  return strong.test(password) ? "Strong password 💪" : "Weak password ⚠️";
};
