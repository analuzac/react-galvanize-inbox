import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageComponent from './MessageComponent';

storiesOf('MessageComponent', module)
  .add('Message: Unread (unstarred)', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: false,
        labels: []
      }}
    />
  )
  .add('Message: Read (unstarred)', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: true,
        starred: false,
        labels: []
      }}
    />
  )
  .add('Message: Selected', () =>
    <MessageComponent
      selected={true}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: true,
        starred: false,
        labels: []
      }}
    />
  )
  .add('Messeage: Starred', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: true,
        starred: true,
        labels: []
      }}
    />
  )
  .add('Message: With Labels', () =>
    <MessageComponent
      selected={false}
      message={{
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: true,
        starred: false,
        labels: ['dev', 'personal']
      }}
    />
  );
// .add('Message: Expanded', () =>
//   <MessageComponent
//     expanded={true}
//     selected={false}
//     message={{
//       id: 1,
//       subject:
//         "You can't input the protocol without calculating the mobile RSS protocol!",
//       read: true,
//       starred: false,
//       labels: ['dev', 'personal'],
//       expanded: ['This is the body of the message.']
//     }}
//   />
// );
