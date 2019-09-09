import React from "react";
import { connect } from "react-redux";
import { updateFavoritest } from "../Redux/Reducers";
import { Link } from "react-router-dom";

class ReduxExample extends React.Component {
  constructor() {
    super();
    this.state = {
      newWord: ""
    };
  }

  onSubmit = () => {
    this.props.updateFavoritest(this.state.newWord);
  };

  render() {
    return (
      <div>
        <input
          placeholder="New Favorite Word"
          onChange={e => {
            this.setState({ newWord: e.target.value });
          }}
        />
        <button
          onClick={() => {
            this.onSubmit();
          }}
        >
          update favorite word using redux
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2>Login to see your favorite color</h2>
        <Link to="/auth">
          <button>Click here to Login</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    favoritestWord: reduxState.favoritestWord
  };
}

export default connect(
  mapStateToProps,
  { updateFavoritest }
)(ReduxExample);
