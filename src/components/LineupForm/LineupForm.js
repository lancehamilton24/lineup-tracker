import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import lineupRequests from '../../helpers/data/lineupRequests';
import './LineupForm.scss';

const defaultLineupName = {
  name: '',
  uid: '',
};

class LineupForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newLineupName: defaultLineupName,
  }

  formFieldStringAndNumberState = (name, e) => {
    e.preventDefault();
    const tempLineup = { ...this.state.newLineupName };
    tempLineup[name] = e.target.value;
    this.setState({ newLineupName: tempLineup });
  }

  lineupChange = e => this.formFieldStringAndNumberState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myLineup = { ...this.state.newLineupName };
    myLineup.uid = authRequests.getCurrentUid();
    onSubmit(myLineup);
    this.setState({ newLineupName: defaultLineupName });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      lineupRequests.getSingleLineup(editId)
        .then((lineup) => {
          this.setState({ newLineup: lineup.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    const { newLineupName } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <form onSubmit={this.formSubmit}>
        <h2>Edit Your Lineup Here</h2>
          <div className="input-group editLineupForm">
            <input
              type="text"
              className="form-control"
              placeholder="Lineup Name"
              value={newLineupName.lineup}
              onChange={this.lineupChange}
            />
            <div class="input-group-append">
            <button type="button" class="btn btn-outline-warning">Submit</button>
            </div>
          </div>
        </form>;
      }
      return <form className="lineupAddition" onSubmit={this.formSubmit}>
          <h2>Add New Lineup Here</h2> 
          <div className="input-group newLineupForm">
            <input
              type="text"
              className="form-control"
              placeholder="Lineup Name"
              value={newLineupName.lineup}
              onChange={this.lineupChange}
            />
            <div class="input-group-append">
            <button type="button" class="btn btn-outline-warning">Submit</button>
            </div>
          </div>
        </form>;
    };
    return (
      <div className="addEditLineup">
        {title()}
      </div>
    );
  }
}

export default LineupForm;
