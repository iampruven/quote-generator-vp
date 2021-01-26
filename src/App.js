import React from "react";
import "./App.css";
// const {
//   randomQuote,
//   authorQuotes,
//   getQuotes,
//   searchQuotes,
// } = require("quotegarden");

class App extends React.Component {
  state = {
    displayQuote: "",
    author: "",
    mainQuoteGenre:'',
    allQuotes: [],
    moreQuotes: false,
  };
  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((quote) => {
        this.setState({
          displayQuote: quote.data[0].quoteText,
          mainQuoteGenre: quote.data[0].quoteGenre,
          author: quote.data[0].quoteAuthor,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  showAllQuoteByAuthor = (quoteAuthor) => {
    fetch(
      `https://quote-garden.herokuapp.com/api/v3/quotes?author=${quoteAuthor}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((allQuotes) => {
       
        this.setState({ allQuotes: allQuotes.data, moreQuotes: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  render() {

 
    return (
      <>
        <div className="notepaper">
          <figure className="quote">
            <blockquote className="curly-quotes">
              {this.state.displayQuote}
            </blockquote>
            <a
              href="#"
              onClick={() => this.showAllQuoteByAuthor(this.state.author)}
              className="quote-by"
            >
              — {this.state.author}
            </a>
            <figcaption className="quote-by">{this.state.mainQuoteGenre}</figcaption>
          </figure>
        </div>

        {this.state.moreQuotes &&
          this.state.allQuotes.map((quote, id) => {
            // console.log(quote.quoteText)
            return <div key={id} className="notepaper">
              <figure className="quote">
                <blockquote className="curly-quotes">
                  {quote.quoteText}
                </blockquote>
                <figcaption
                  className="quote-by"
                >
                  — {this.state.author}
                </figcaption>
                <figcaption className="quote-by">{quote.quoteGenre}</figcaption>
              </figure>
            </div>
          })}
      </>
    );
  }
}

export default App;
