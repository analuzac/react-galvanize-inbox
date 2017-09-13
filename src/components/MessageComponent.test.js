import React from 'react';
import { shallow, mount } from 'enzyme';
import MessageComponent from './MessageComponent';
import MessagesComponent from './MessagesComponent';

const onStarMessage = jest.fn();

const onUnstarMessage = jest.fn();

const onSelectMessage = jest.fn();

const onDeselectMessage = jest.fn();

const onMarkAsReadMessage = jest.fn();

const message1 = {
  id: 1,
  subject:
    "You can't input the protocol without calculating the mobile RSS protocol!",
  body:
    'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim.',
  read: true,
  starred: true,
  labels: ['dev', 'personal']
};

const message2 = {
  id: 1,
  subject:
    "You can't input the protocol without calculating the mobile RSS protocol!",
  body:
    'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim.',
  read: false,
  starred: false,
  labels: ['dev', 'personal']
};

describe('a shallow test', () => {
  const shallowWrapper_ver1 = shallow(
    <MessageComponent
      selected={message1.id}
      message={message1}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
    />
  );

  const shallowWrapper_ver2 = shallow(
    <MessageComponent
      selected={message2.id}
      message={message2}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
    />
  );

  const fullWrapper_ver1 = mount(
    <MessageComponent
      selected={message1.id}
      message={message1}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
    />
  );

  const fullWrapper_ver2 = mount(
    <MessageComponent
      selected={message2.id}
      message={message2}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
    />
  );

  const fullWrapper_ver3 = mount(
    <MessageComponent
      selected={null}
      message={message2}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
    />
  );

  it('tests that the read CSS class is present when message.read is true', () => {
    expect(shallowWrapper_ver1.find('.read')).toHaveLength(1);
  });

  it('tests that the unread CSS class is present when message.read is false', () => {
    expect(shallowWrapper_ver2.find('.unread')).toHaveLength(1);
  });

  it('tests that the star icon is filled when the message.starred is true', () => {
    expect(shallowWrapper_ver1.find('.star')).toHaveLength(1);
  });

  it('tests that the selected CSS class is present when the selected prop is true', () => {
    expect(shallowWrapper_ver1.find('.something')).toHaveLength(1);
  });

  it('tests that the checkbox is checked when the selected prop is true', () => {
    //console.log(fullWrapper.find('input').debug());
    expect(fullWrapper_ver1.find('input')).toHaveLength(1);
  });

  it('should test if onStarMessage function was fired', () => {
    // const onStarMessage = jest.fn();

    fullWrapper_ver2.find('.star').simulate('click');
    expect(onStarMessage).toHaveBeenCalled();
  });

  it('should test if onUnstarMessage function was fired', () => {
    //const onUnstarMessage = jest.fn();
    console.log(fullWrapper_ver1.find('.star').debug());
    fullWrapper_ver1.find('.star').simulate('click');
    expect(onUnstarMessage).toHaveBeenCalled();
  });

  it('should test if onMarkAsReadMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();

    fullWrapper_ver2.find('.col-xs-11').simulate('click');
    expect(onMarkAsReadMessage).toHaveBeenCalled();
  });

  it('should test if onSelectMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();
    //console.log(fullWrapper_ver2.find('.something').debug());
    fullWrapper_ver2.find('.something').simulate('change');
    expect(onSelectMessage).toHaveBeenCalled();
  });

  it('should test if onDeselectMessage function was fired', () => {
    // const onUnstarMessage = jest.fn();
    //console.log(fullWrapper.find('.something').at(1).debug());
    fullWrapper_ver3.find('.something').simulate('change');
    expect(onDeselectMessage).toHaveBeenCalled();
  });

  it('Subject rendered ', () => {
    //console.log('hi : ' + shallowWrapper2.find('a.msg').text());
    expect(shallowWrapper_ver2.find('a.msg').text()).toEqual(message2.subject);
  });

  expect(shallowWrapper_ver2).toMatchSnapshot();
});
