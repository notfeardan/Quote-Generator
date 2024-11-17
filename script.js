const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBin = document.getElementById("twitter");
const newQuotesBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

function loadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completeLoadingSpinner() {
  setTimeout(() => {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }, 250);
}

function newQuotes() {
  loadingSpinner();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  completeLoadingSpinner();
}

async function getQuotes() {
  loadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    newQuotes();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuotesBtn.addEventListener("click", newQuotes);
twitterBin.addEventListener("click", tweetQuote);

getQuotes();
