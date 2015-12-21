var Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },

  onUpdate() {
    if (this.state.editable) {
      let skill   = { id: this.props.skill.id,
                      name: this.refs.name.value,
                      details: this.refs.details.value,
                      level: this.props.skill.level }

      this.props.handleUpdate(skill);
    }

    this.setState({ editable: !this.state.editable })
  },

  updatedSkill(action, index) {
    let id       = this.props.skill.id;
    let name     = this.props.skill.name;
    let details  = this.props.skill.details;

    let newLevel = getNewLevel(action, index);

    return {id: id, name: name, details: details, level: newLevel}
  },

  getNewLevel(action, index) {
    let levels   = ['bad', 'halfbad', 'fantastic'];
    let level  = levels.indexOf(this.props.skill.level);
    let change   = action === 'up' ? 1 : - 1;

    return action ? levels[level + change] : this.props.skill.level;
  },

  onUpdateLevel(action) {
    if (this.levelCanBeChanged(action)) {
      let level = this.getNewLevel(action)
      let skill = {id: this.props.skill.id, level: level }

      this.props.handleUpdate(skill);
    }
  },

  levelCanBeChanged(action) {
    let levels  = ['bad', 'halfbad', 'fantastic'];
    let index   = levels.indexOf(this.props.skill.level);

    return action === 'up' && index < 2 ||  action === 'down' && index > 0;
  },

  render() {
    var name = this.state.editable ? <input type='text'
                                        ref='name'
                                        defaultValue={this.props.skill.name} />
                                  : <h3>{this.props.skill.name}</h3>

    let details = this.state.editable ? <textarea type='text'
                                              ref='details'
                                              defaultValue={this.props.skill.details}>
                                        </textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div>
        {name}

        <div className='skill-level'>
          <button type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.onUpdateLevel.bind(this, 'down')}>
            <span className="glyphicon glyphicon-triangle-bottom"></span>
          </button>

            <p><strong>Level:</strong> {this.props.skill.level}</p>

          <button type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.onUpdateLevel.bind(this, 'up')}>
            <span className="glyphicon glyphicon-triangle-top"></span>
          </button>
        </div>

        {details}

        <button onClick={this.props.handleDelete}>Delete</button>

        <button onClick={this.onUpdate}>{this.state.editable ? 'Submit' : 'Edit'}</button>
      </div>
    )
  }
});