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
            "contactType": contactTypeIdx > -1 ? rowItems[contactTypeIdx].trim() : "general"
        }
    })

    return contacts.slice(1).trim()
}

module.exports = parser;
