import validator from 'validator'

export const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
        return '';
    } else {
        return 'Invalid email. Please enter a valid email address.';
    }
};