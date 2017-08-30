import React from 'react';

function theSquare(msg, count) {
  if (count === msg.length) {
    return 'fa fa-check-square-o';
  }
  if (count === 0) {
    return 'fa fa-square-o';
  } else {
    return 'fa fa-minus-square-o';
  }
}

function theBtn(count) {
  if (count === 0) {
    return 'disabled';
  } else {
    return '';
  }
}

onSelectAllMessages;

export default function ToolbarComponent({
  messages,
  selectedMessageCount,
  onOpenComposeForm,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages
}) {
  function handleClickPlus(event) {
    const $plus = event.target;
    console.log($plus);
    console.log('touched PLUS button');
    //onOpenComposeForm();
  }

  function handleClickReadButton(event) {
    const $readButton = event.target;
    console.log($readButton);
    console.log('touched MARK AS READ button');
    //onMarkAsReadSelectedMessages();
  }

  function handleClickUnreadButton(event) {
    const $unreadButton = event.target;
    console.log($unreadButton);
    console.log('touched MARK AS UNREAD button');
    //onMarkAsUnreadSelectedMessages();
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">2</span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus" onClick={handleClickPlus} />
        </a>

        <button className="btn btn-default">
          <i className={theSquare(messages, selectedMessageCount)} />
        </button>

        <button
          className="btn btn-default"
          disabled={theBtn(selectedMessageCount)}
          onClick={handleClickReadButton}>
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={theBtn(selectedMessageCount)}
          onClick={handleClickUnreadButton}>
          Mark As Unread
        </button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
