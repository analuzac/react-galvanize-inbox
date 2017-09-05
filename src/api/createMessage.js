export default function createMessage(message) {
  return (
    fetch('https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer keyE9lXfaaEAGEG23',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(response => response.json())
      // .then(message => console.log(message));
      .then(record => ({
        id: record.id,
        subject: record.fields.subject,
        // read: record.fields.read,
        // starred: record.fields.starred,
        labels: record.fields.labels.split(',')
      }))
  );
}

//test input object:

// -d '{
//   "fields": {
//     "id": 1,
//     "subject": "You can'\''t input the protocol without calculating the mobile RSS protocol!",
//     "read": true,
//     "starred": true,
//     "labels": "dev,personal"
//   }
// }'
