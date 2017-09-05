export default function deleteMessage(messageId) {
  return fetch(
    `https://api.airtable.com/v0/appLbpsbnyJPepk7o/messages/${messageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer keyE9lXfaaEAGEG23',
        'Content-Type': 'application/json'
      }
    }
  ).then(response => response.json());
}

// componentDidMount() {
//   getMessages().then(records => {
//     this.setState({
//       messages: records
//     });
//   });
// }
