import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getFavoritest } from "../Redux/Reducers";

export class Greeting extends Component {
  constructor() {
    super();
    this.state = {
      userName: "friend",
      favoriteWords: [],
      word: ""
    };
  }

  componentDidMount() {
    this.props.getFavoritest();
    axios
      .all([axios.get("/api/name"), axios.get("api/words")])
      .then(([res1, res2]) => {
        this.setState({ userName: res1.data[0].name });
        this.setState({ favoriteWords: res2.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWords = () => {
    this.setState({ word: "" });
    axios.get("/api/words").then(res => {
      this.setState({ favoriteWords: res.data });
    });
  };

  saveName = () => {
    axios.put(`/api/new-name?name=${this.state.userName}`).then(() => {
      console.log(this.state.userName);
      window.location.reload();
    });
  };

  updateuserName = e => {
    this.setState({ userName: e.target.value });
  };

  updateAddword = e => {
    this.setState({ word: e.target.value });
  };

  handleDelete = id => {
    axios.delete(`/api/words/${id}`).then(setTimeout(this.updateWords(), 1000));
    // console.log(id);
  };

  handleAddWord = () => {
    const body = {
      word: this.state.word
    };

    axios.post("/api/words", body).then(setTimeout(this.updateWords(), 1000));
  };

  handleUpdateFavoritest = () => {
    this.props.getFavoritest();
  };

  render() {
    console.log(this.Memo);
    const favoriteWords = this.state.favoriteWords.map(word => {
      return (
        <div key={word.word_id}>
          <h3>{word.word}</h3>
          <button
            onClick={() => {
              this.handleDelete(word.word_id);
            }}
          >
            delete
          </button>
        </div>
      );
    });
    return (
      <div>
        <h1>
          Hello {this.state.userName}! Your favoritest word is "
          {this.props.favoritestWord}"
        </h1>
        <button
          onClick={() => {
            this.handleUpdateFavoritest();
          }}
        >
          update redux state
        </button>
        <br />
        <input placeholder="name" onChange={this.updateuserName} />
        <button onClick={this.saveName}>edit</button>
        <br />
        <br />
        <br />
        <br />
        <input placeholder="add word here" onChange={this.updateAddword} />
        <button
          onClick={() => {
            this.handleAddWord();
          }}
        >
          Add Word
        </button>
        <h2>Your favorite words are:</h2>
        {favoriteWords}
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
  { getFavoritest }
)(Greeting);
