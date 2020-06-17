import React from 'react';

class EditContactTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name
    };

    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="manage-contact-types">
        <h1>Add Contact Type</h1>
        <input type="text"
          placeholder="Enter Contact Type"
          onChange={this.update}
          value={this.props.name} />
        <button onClick={() => this.props.updateContactType(this.state)}>Submit</button>
      </div>
    )
  }
};

export default EditContactTypes;