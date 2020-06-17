const parser = (csvString) => {
    const rows = csvString.trim().split("\n")
    const headers = rows[0].split(",").map(el => el.toLowerCase())

    let phoneIdx;
    if (headers.includes("phone_number")) { phoneIdx = headers.findIndex(el => el === "phone_number") }
    if (headers.includes("phonenumber")) { phoneIdx = headers.findIndex(el => el === "phonenumber") }
    if (headers.includes("phone")) { phoneIdx = headers.findIndex(el => el === "phone") }
    if (headers.includes("mobile")) { phoneIdx = headers.findIndex(el => el === "mobile") }

    if (phoneIdx < 0) { throw "Must include 'phone_number' header" }

    const contactTypeIdx = headers.findIndex(el => el === "contact_type")

    const contacts = rows.map(row => {
        let rowItems = row.trim().split(",")
        return {
            "phone": rowItems[phoneIdx].trim(),
            "contact_type": contactTypeIdx > -1 ? rowItems[contactTypeIdx].trim() : "general"
        }
    })

    return contacts.slice(1)
}

module.exports = parser;

// const testString = "" +
//     "first_name,stuff1,stuff2,email,phone_number,status\n" + 
//     "jon, 1, a, hi@me.com, 5556667788, TRUE\n" + 
//     "will, 2, b, bye@me.com, 2223334455, FALSE\n" + 
//     "adrian, 3, c, money@me.com, 1112224488, TRUE\n" + 
//     "alex, 4, d, adios@me.com, 1113336699, FALSE"

// const parseTest = parser(testString)
// console.log(parseTest)