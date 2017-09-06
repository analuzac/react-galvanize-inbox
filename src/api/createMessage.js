export default function createMessage(message) {
  return fetch('https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer keyE9lXfaaEAGEG23',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
    .then(response => response.json())
    .then(record => ({
      id: record.id,
      subject: record.fields.subject,
      // read: record.fields.read,
      // starred: record.fields.starred,
      labels: record.fields.labels.split(',')
    }));
}
