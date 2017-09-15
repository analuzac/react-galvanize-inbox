// export default function updateMessage(messageId, changes) {
//   return fetch(
//     `https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages/${messageId}`,
//     {
//       method: 'PATCH',
//       headers: {
//         Authorization: 'Bearer keyE9lXfaaEAGEG23',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(changes)
//     }
//   ).then(response => response.json());
// }
export default function updateMessage(messageId, changes) {
  console.log('this is request input', messageId);
  console.log('this is request input', changes);
  return fetch(
    `https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages/${messageId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer keyE9lXfaaEAGEG23',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        fields: changes
      })
    }
  )
    .then(response => {
      return response.json();
    })
    .then(record => {
      console.log(record);
      console.log(record.fields.labels);
      if (!record.fields.labels) {
        record.fields.labels = '';
      }
      return {
        id: messageId,
        body: record.fields.body,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels.split(',')
      };
    });
}
