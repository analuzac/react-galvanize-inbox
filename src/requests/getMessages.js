export default function getMessages() {
  return fetch('https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages?', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer keyE9lXfaaEAGEG23',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data =>
      data.records.map(record => ({
        id: record.id,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels.split(',')
      }))
    );
}
