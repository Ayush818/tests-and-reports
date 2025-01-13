export function generateEmail() {
  return `test${Math.floor(Math.random() * 100000)}@example.com`;
}
export function generatePassword() {
  return `Asdf123!@#+${Math.floor(Math.random() * 100000)}`;
}
