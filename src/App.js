import React, { useState } from "react";
import { QUOTE_API_URL } from "./config";
import { Button, Grid } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);

  const [quote, setQuote] = React.useState({
    quote: "",
    author: "",
    tweetLink: "",
  });

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 500);
    changeQuote();
  }, []);

  const changeQuote = () => {
    fetch(QUOTE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const tweetURL = new URL("https://twitter.com/intent/tweet");
        tweetURL.searchParams.append("text", data.content);
        const newQuote = {
          quote: data.content,
          author: data.author,
          tweetLink: tweetURL.href,
        };

        setQuote(newQuote);
      });
  };

  if (loading) return <h1>Loading.....</h1>;
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ marginTop: "20px" }}
    >
      <Grid item>
        <h3 id="text">{quote.quote}</h3>
        <p id="author">{quote.author}</p>
      </Grid>

      <Grid item style={{ marginTop: "20px" }}>
        <Button variant="contained" id="new-quote" onClick={changeQuote}>
          Change Quote
        </Button>
      </Grid>
      <Grid item style={{ marginTop: "20px" }}>
        <a
          id="tweet-quote"
          href={quote.tweetLink}
          target="_blank"
          rel="noreferrer"
        >
          Tweet this quote
        </a>
      </Grid>
    </Grid>
  );
}

export default App;
