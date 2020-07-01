const encryptor = (cipher) => {
    const ciphArr = [];
    
    for (let i=0; i<cipher.length; i++){
        let code = cipher.charCodeAt((i+10) % cipher.length)
        ciphArr.push((code % 10) + 10)
    }

    return {
        encrypt: (string) => {
            var encryptedString = "";

            for (let i=0; i<string.length; i++){
                let code = (string.charCodeAt(i) + ciphArr[i % ciphArr.length])
                encryptedString += String.fromCharCode(code)
            }

            return encryptedString
        },

        decrypt: (encodedString) => {
            var encryptedString = "";

            for (let i = 0; i < encodedString.length; i++) {
                let code = (encodedString.charCodeAt(i) - ciphArr[i % ciphArr.length])
                encryptedString += String.fromCharCode(code)
            }

            return encryptedString
        },

        ciphArr: ciphArr
    }    
}

module.exports = encryptor;

const encrypt = encryptor("pizzakey")
