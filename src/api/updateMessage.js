export default function updateMessage(messageId, changes) {
  return fetch(
    `https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages/${messageId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer keyE9lXfaaEAGEG23',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
    }
  ).then(response => response.json());
  // .then(message => console.log(message));
  // .then(data =>
  //   data.records.map(record => ({
  //     id: record.id,
  //     subject: record.fields.subject,
  //     read: record.fields.read,
  //     starred: record.fields.starred,
  //     labels: record.fields.labels.split(',')
  //   }))
  // );
}

// -d '{
//   "fields": {
//     "id": 1
//   }
// }'
