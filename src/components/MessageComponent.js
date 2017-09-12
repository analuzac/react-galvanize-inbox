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

export default function MessageComponent({
  selected,
  message,
  messageId,
  onMarkAsReadMessage,
  onSelectMessage,
  onDeselectMessage,
  onStarMessage,
  onUnstarMessage
}) {
  function handleChangeCheckbox(event) {
    // event.preventDefault();
    const $checkbox = event.target;
    console.log($checkbox);
    if ($checkbox.checked) {
      onSelectMessage(message.id);
      console.log('turned check ON');
    } else {
      onDeselectMessage(message.id);
      console.log('turned check OFF');
    }
  }

  function handleClickRead(event) {
    event.preventDefault();
    // const $read = event.target;
    // console.log($read);
    if (message.read !== true) {
      onMarkAsReadMessage(message.id);
      console.log('became READ');
    }
  }

  function handleClickStar(event) {
    event.preventDefault();
    //const $star = event.target;
    //console.log($star.class);
    if (message.starred !== true) {
      onStarMessage(message.id);
      console.log('turned star ON');
    } else {
      onUnstarMessage(message.id);
      console.log('turned star OFF');
    }
  }

  return (
    <div>
      <div
        className={
          message.read === true
            ? `row message read${selected ? ' selected' : ''}`
            : `row message unread${selected ? ' selected' : ''}`
        }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                className="something"
                type="checkbox"
                checked={selected === true}
                onChange={handleChangeCheckbox}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={
                  message.starred === true
                    ? 'star fa fa-star'
                    : 'star fa fa-star-o'
                }
                onClick={handleClickStar}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={handleClickRead}>
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
