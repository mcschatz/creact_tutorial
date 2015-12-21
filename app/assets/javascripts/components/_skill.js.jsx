var Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },

  handleEdit() {
    if (this.state.editable) {
      let name = this.refs.name.value;
      let details = this.refs.details.value;
      console.log('in handleEdit', this.state.editable, name, details);
    }

    this.setState({ editable: !this.state.editable })
  },

  render() {
    var name = this.state.editable ? <input type='text'
                                            ref='name'
                                            defaultValue={this.props.skill.name} />
                                   : <h3>{this.props.skill.name}</h3>

    let details = this.state.editable ? <textarea type='text'
                                                  refs='details'
                                                  defaultValue={this.props.skill.details}>
                                        </textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div>
      {name}

      <p><strong>Level:</strong> {this.props.skill.level}</p>
      {details}

      <button onClick={this.props.handleDelete}>
        Delete
      </button>

      <button onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit'</button>
    </div>
    )
  }
});