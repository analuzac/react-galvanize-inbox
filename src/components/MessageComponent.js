import React from 'react';

function renderLabels(labels) {
  return labels.map(label => {
    return (
      <span className="label label-warning">
        {label}
      </span>
    );
  });
}

// //For the expanded case
// function renderExpanded(expanded) {
//   return expanded.map(bodyMessage => {
//     return (
//       <div className="row message-body">
//         <div className="col-xs-11 col-xs-offset-1">
//           {bodyMessage}
//         </div>
//       </div>
//     );
//   });
// }
//for this: MessageComponent({ expanded, selected, message })

export default function MessageComponent({ selected, message }) {
  return (
    <div>
      <div
        className={
          message.read === true
            ? 'row message read selected'
            : 'row message unread selected'
        }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                checked={selected === true ? 'checked' : null}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={
                  message.starred === true
                    ? 'star fa fa-star'
                    : 'star fa fa-star-o'
                }
              />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {renderLabels(message.labels)}
          <a href="www.hi.com">
            {message.subject}
          </a>
        </div>
      </div>
      {/* {expanded === true ? renderExpanded(message.expanded) : null} */}
    </div>
  );
}
