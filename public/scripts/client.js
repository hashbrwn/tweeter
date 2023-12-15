/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  const onSubmit = function (event) {
    event.preventDefault();
    const tweet = $(`#tweet-text`).val();

    if (tweet === "" || null) {
      error("can not be empty");
      return;
    }

    if (tweet.length > 140) {
      error("these texts exceed the text limits");
      return;
    }

    //grab input values from the form and save to variables
    //validations(maybe)
    //if data is valid send ajax request with serialized input values
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function () {
        $("#error").hide();
        loadTweets();
      },
    });
    this.reset();
  };

  $("#submitform").on("submit", onSubmit);

  // renderTweets(data);
  $("#error").hide();
  loadTweets();
});

const renderTweets = function (tweets) {
  $("#tweet-container").empty();
  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $("#tweets-container").prepend(element);
  }
};

const error = function (message) {
  $("#error").text(message);
  $("#error").slideDown("slow");
};

const createTweetElement = function (tweet) {
  let $tweet = `<article class="head">
  <header class="tweet-header">
    <div class="image-name">
      <img src="${tweet.user.avatars}" />
      <p> ${tweet.user.name}</p>

    </div>
    <div>
      <p class="tag">
      ${tweet.user.handle}
      </p>
    </div>
  </header>
  <div class="message">
     ${$("<p>").text(tweet.content.text).html()}
     <!-- <p>${tweet.content.text}</p> -->
  </div>
  <footer class="tweet-footer">
    <div>
      <p> ${timeago.format(tweet.created_at)}</p>
    </div>
    <div class="icons">
      <p><i class="fas fa-flag"></i></p>
      <p><i class="fas fa-retweet"></i></p>
      <p><i class="fas fa-heart"></i></p>
    </div>
  </footer>
</article>`;
  return $tweet;
};

const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).then(function (tweets) {
    renderTweets(tweets);
  });
};