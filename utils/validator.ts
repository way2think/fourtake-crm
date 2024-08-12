import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

function isValidEmail(email: string) {
    // Regular expression for a valid email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Test the email against the regex pattern
    return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
    const minLength = 6;
    const minNumbers = /[0-9]/;
    const minSymbols = /[!@#$%^&*(),.?":{}|<>]/;
    const minUppercase = /[A-Z]/;

    if (password.length < minLength) {
        return false;
    }

    if (!minNumbers.test(password)) {
        return false;
    }

    if (!minSymbols.test(password)) {
        return false;
    }

    if (!minUppercase.test(password)) {
        return false;
    }

    return true;
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

function isValidUrl(url: string) {
    // Test if the URL is null or an empty string, return false
    if (url == null || url.trim() === '') {
        return false;
    }

    // Define the regular expression for URL validation
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' + // domain name and extension
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator

    // Test if the URL matches the pattern and has the correct domain, return true if it does
    if (urlPattern.test(url) && /\.(com|org|in)(\/|$)/.test(url)) {
        return true;
    }

    // If it doesn't match, return false
    return false;

    // Examples of usage
    // console.log(isValidUrl('http://example.com')); // true
    // console.log(isValidUrl('https://example.org')); // true
    // console.log(isValidUrl('https://example.in/path?name=value#anchor')); // true
    // console.log(isValidUrl('http://example.com/subpage')); // true
    // console.log(isValidUrl('http://example.xyz')); // false
    // console.log(isValidUrl('example.com')); // false
    // console.log(isValidUrl('')); // false
    // console.log(isValidUrl(null)); // false
}

const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return error && typeof error === 'object' && 'status' in error && 'data' in error;
};

const isSerializedError = (error: any): error is SerializedError => {
    return error && typeof error === 'object' && 'message' in error;
};

export {
    isValidEmail,
    isValidPassword,
    isValidAddress,
    isValidPhoneNumber,
    isValidName,
    isValidNumber,
    isValidDropdown,
    isLettersAndNumbers,
    isCapitalLettersAndNumbers,
    isValidTextareaContent,
    isValidUrl,
    isFetchBaseQueryError,
    isSerializedError,
};
