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

export default function ToolbarComponent({ messages, selectedMessageCount }) {
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">2</span>
          unread messages
        </p>

        <a className="btn btn-danger">
          <i className="fa fa-plus" />
        </a>

        <button className="btn btn-default">
          <i className={theSquare(messages, selectedMessageCount)} />
        </button>

        <button
          className="btn btn-default"
          disabled={theBtn(selectedMessageCount)}>
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={theBtn(selectedMessageCount)}>
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
