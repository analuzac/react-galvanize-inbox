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
}
