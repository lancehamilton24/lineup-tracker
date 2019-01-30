import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
// import lineupShape from '../../../helpers/propz/lineupShape';
import authRequests from '../../../helpers/data/authRequests';
import lineupRequests from '../../../helpers/data/lineupRequests';
import './SingleLineup.scss';

const defaultLineupName = {
  name: '',
  uid: '',
};

class SingleLineup extends React.Component {
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

  lineupChange = e => this.formFieldStringAndNumberState('event', e);

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
        .then((event) => {
          this.setState({ newListing: event.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    const { newLineupName } = this.state;
    const { isEditing } = this.props;
    // const title = () => {
    //   if (isEditing) {
    //     return <h2>Edit Event:</h2>;
    //   }
    //   return <h2>New Event:</h2>;
    // };
    if (isEditing) {
      return (
      <div className="event-form col">
        {/* {title()} */}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="event">Lineup Name:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              aria-describedby="addressHelp"
              placeholder="Mardi Gras"
              value={newLineupName.lineup}
              onChange={this.lineupChange}
            />
          </div>
          <Button className="btn btn-danger">Save Lineup Name</Button>
        </form>
      </div>
      );
    }
    return <h2>Hello</h2>;
  }
}

export default SingleLineup;
