export default function getMessages() {
  return fetch('https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages?', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer keyE9lXfaaEAGEG23',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.records.map(record => {
        if (!record.fields.labels) {
          record.fields.labels = '';
        }
        return {
          id: record.id,
          subject: record.fields.subject,
          read: record.fields.read,
          starred: record.fields.starred,
          labels: record.fields.labels.split(',')
        };
      });
    });
}
