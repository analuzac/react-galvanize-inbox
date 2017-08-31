import React from 'react';

export default function ComposeFormComponent({
  onComposeFormSubmit,
  onComposeFormCancel
}) {
  function handleOnSubmit(event) {
    const $onSubmit = event.target;
    console.log($onSubmit);
    console.log('touched SUBMIT button');
    let subject = 'Aloha';
    let body = 'Wish I was in Hawaii';
    onComposeFormSubmit(subject, body);
  }

  function handleOnCancel(event) {
    const $onCancel = event.target;
    console.log($onCancel);
    console.log('touched CANCEL button');
    onComposeFormCancel();
  }

  return (
    <form className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label for="subject" className="col-sm-2 control-label">
          Subject
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter a subject"
            name="subject"
          />
        </div>
      </div>
      <div className="form-group">
        <label for="body" className="col-sm-2 control-label">
          Body
        </label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control" />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input
            type="submit"
            value="Send"
            className="btn btn-primary"
            onClick={handleOnSubmit}
          />
          <input
            type="submit"
            value="Cancel"
            className="btn btn-primary"
            onClick={handleOnCancel}
          />
        </div>
      </div>
    </form>
  );
}
