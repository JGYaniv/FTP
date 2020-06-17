import axios from 'axios';

export const fetchContacts = () => {
  return axios.get('/api/contacts');
};

export const createContact = contactData => {
  return axios.post('/api/contacts', contactData);
};

export const createBulkContacts = contactDataArr => {
  return axios.post('/api/contacts/bulk', contactDataArr);
};

export const parser = (csvString) => {
  const rows = csvString.split("\n")
  const headers = rows[0].split(",").map(el => el.toLowerCase())

  let phoneIdx;
  if (headers.includes("phone_number")) { phoneIdx = headers.findIndex(el => el === "phone_number") }
  if (headers.includes("phonenumber")) { phoneIdx = headers.findIndex(el => el === "phonenumber") }
  if (headers.includes("phone")) { phoneIdx = headers.findIndex(el => el === "phone") }
  if (headers.includes("mobile")) { phoneIdx = headers.findIndex(el => el === "mobile") }

  if (phoneIdx < 0) { throw "Must include 'phone_number' header" }

  const contactTypeIdx = headers.findIndex(el => el === "contact_type")

  console.log(rows)
  const contacts = rows.map(row => {
      let rowItems = row.split(",")
      return {
          "phone": rowItems[phoneIdx],
          "contactType": contactTypeIdx > -1 ? rowItems[contactTypeIdx] : "general"
      }
  })

  return contacts.slice(1)
}
