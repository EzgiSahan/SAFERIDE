import validator from 'validator'

export const validatePassword = (e) => {
    var password = e.target.value;
    if (validator.isStrongPassword(password)) {
        return '';
    } else {
      return(
        'Password must be at least 8 characters. It must include one uppercase letter, one lowercase letter, one number and one special symbol'
      );
    }
};