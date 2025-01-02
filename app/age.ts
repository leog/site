export function calculateAge(birthday: Date) {
  const birthDate = new Date(birthday);
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the birthday hasn't occurred this year
  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!isBirthdayPassed) {
    age--;
  }

  return age;
}
