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

function unreadMessages(messages) {
  //console.log(messages);
  let unread = 0;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].read === false) {
      unread = unread + 1;
    }
  }
  return unread;
}

export default function ToolbarComponent({
  messages,
  selectedMessageCount,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onSelectAllMessages,
  onDeselectAllMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages,
  onOpenComposeForm
}) {
  function handleClickReadButton(event) {
    const $readButton = event.target;
    console.log($readButton);
    console.log('touched MARK AS READ button');
    onMarkAsReadSelectedMessages();
  }

  function handleClickUnreadButton(event) {
    const $unreadButton = event.target;
    console.log($unreadButton);
    console.log('touched MARK AS UNREAD button');
    onMarkAsUnreadSelectedMessages();
  }

  function handleSelectAllMessages(event) {
    const $selectAll = event.target;
    console.log($selectAll);
    console.log('clicked SELECT box');

    if (selectedMessageCount < messages.length) {
      onSelectAllMessages();
    } else {
      onDeselectAllMessages();
    }
  }

  function handleApplyLabel(event) {
    const $applyLabel = event.target;
    console.log($applyLabel.value);
    console.log('clicked APPLY LABEL box');
    let label = $applyLabel.value;
    onApplyLabelSelectedMessages(label);
    $applyLabel.value = 'Apply label';
  }

  function handleRemoveLabel(event) {
    const $removeLabel = event.target;
    console.log($removeLabel.value);
    console.log('clicked REMOVE LABEL box');
    let label = $removeLabel.value;
    onRemoveLabelSelectedMessages(label);
    $removeLabel.value = 'Remove label';
  }

  function handleTrash(event) {
    const $trashButton = event.target;
    console.log($trashButton);
    console.log('touched TRASH button');
    onDeleteSelectedMessages();
  }

  function handleClickPlus(event) {
    const $plus = event.target;
    console.log($plus);
    console.log('touched PLUS button');
    onOpenComposeForm();
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessages(messages)}</span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus" onClick={handleClickPlus} />
        </a>

        <button className="btn btn-default">
          <i
            className={theSquare(messages, selectedMessageCount)}
            onClick={handleSelectAllMessages}
          />
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

        <select
          className="form-control label-select"
          onChange={handleApplyLabel}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          onChange={handleRemoveLabel}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={handleTrash}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
}
