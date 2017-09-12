import React from 'react';
import { shallow, mount } from 'enzyme';
import MessageComponent from './MessageComponent';
import MessagesComponent from './MessagesComponent';

const onStarMessage = jest.fn();

const onUnstarMessage = jest.fn();

const onSelectMessage = jest.fn();

const onDeselectMessage = jest.fn();

const onMarkAsReadMessage = jest.fn();

let messages = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    body:
      'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim.',
    read: false,
    starred: false,
    labels: ['dev', 'personal']
  },
  {
    id: 2,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    body:
      'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim.',
    read: false,
    starred: true,
    labels: ['dev', 'personal']
  }
];

let selectedMessageIds = [1];

describe('a full render test', () => {
  const fullWrapper = mount(
    <MessagesComponent
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
    />
  );

  //Verify the expected number of MessageComponents are rendered based on the
  //number of messages that are passed into MessagesComponent
  it('tests children elemenets with full rendering', () => {
    expect(fullWrapper.children()).toHaveLength(2);
  });

  // All of callbacks gets triggered when you interact with an individual message
  it('should test if onStarMessage function was fired', () => {
    // const onStarMessage = jest.fn();

    fullWrapper.find('.star').first().simulate('click');
    expect(onStarMessage).toHaveBeenCalled();
  });

  it('should test if onUnstarMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();

    fullWrapper.find('.star').at(1).simulate('click');
    expect(onUnstarMessage).toHaveBeenCalled();
  });

  it('should test if onMarkAsReadMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();

    fullWrapper.find('.col-xs-11').first().simulate('click');
    expect(onMarkAsReadMessage).toHaveBeenCalled();
  });

  it('should test if onSelectMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();
    //console.log(fullWrapper.find('.something').first().debug());
    fullWrapper.find('.something').first().simulate('change');
    expect(onSelectMessage).toHaveBeenCalled();
  });

  it('should test if onDeselectMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();
    //console.log(fullWrapper.find('.something').at(1).debug());
    fullWrapper.find('.something').at(1).simulate('change');
    expect(onDeselectMessage).toHaveBeenCalled();
  });
});
