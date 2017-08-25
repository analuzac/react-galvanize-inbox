import { configure } from '@storybook/react';

function loadStories() {
  // Require your stories here...
  require('../src/index.css');
  require('../src/components/MessageComponent.story.js');
  require('../src/components/MessagesComponent.story.js');
  require('../src/components/ToolbarComponent.story.js');
  require('../src/components/ComposeFormComponent.story.js');
  require('../src/components/InboxPageLayout.story.js');
  require('../src/components/InboxPage.story.js');
}
configure(loadStories, module);
