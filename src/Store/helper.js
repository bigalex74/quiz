const superEmail = 'yandex';

export const isTeacher = (email) => {
  return email.toString().split('@')[1].toLowerCase().includes(superEmail.toLowerCase())
};
