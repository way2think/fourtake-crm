function isValidEmail(email: string) {
    // Regular expression for a valid email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Test the email against the regex pattern
    return emailRegex.test(email);
}

function isValidPassword(password: string) {
    // Password must be 6 characters or more in length
    // const passwordRegex = /^.{6,}$/;
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Test the password against the regex pattern
    return passwordRegex.test(password);
}

function isValidName(name: string) {
    //Name contains letter and space(no space in beginning and ending)
    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

    //Test the name against the regex pattern
    return nameRegex.test(name);
}

function isValidPhoneNumber(phoneNumber: string) {
    // contains only 10 digit number
    const phoneNumberRegex = /^\d{10}$/;

    //Test the Phone number against the regex pattern
    return phoneNumberRegex.test(phoneNumber);
}

function isValidAddress(address: string) {
    const addressRegex = /^[a-zA-Z0-9\s\/.,#'-]+$/;

    //Test the address against the regex pattern
    return addressRegex.test(address);
}

function isLettersAndNumbers(str: string) {
    //
    const lettersAndNumbersRegex = /^[a-zA-Z0-9]+$/;

    //
    return lettersAndNumbersRegex.test(str);
}

function isCapitalLettersAndNumbers(str: string) {
    const lettersAndNumbersRegex = /^[A-Z0-9]+$/;
    return lettersAndNumbersRegex.test(str);
}

function isValidNumber(num: string) {
    // contains only 10 digit number
    const numberRegex = /^\d+$/;

    //Test the Phone number against the regex pattern
    return numberRegex.test(num);
}

function isValidTextareaContent(content: string) {
    // Content contains letters and spaces (no spaces at the beginning or end)
    const contentRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

    // Test the content against the regex pattern
    return contentRegex.test(content);
}

function isValidDropdown(num: string) {
    // Test the Dropdwon is not Select return false
    if (num == '1' || Number(num) == 1 || num == null) {
        return false;
    }
    // Test the Dropdwon is Select return true
    return true;
}

export { isValidEmail, isValidPassword, isValidAddress, isValidPhoneNumber, isValidName, isValidNumber, isValidDropdown, isLettersAndNumbers, isCapitalLettersAndNumbers, isValidTextareaContent };
