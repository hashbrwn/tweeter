$(document).ready(function () {
  // --- your code goes here ---

  $("#tweet-text").keyup(function () {
    let remaining = 140 - this.value.length;
    const counter = $(this).siblings("div").children(".counter");
    counter.text(remaining);

    if (remaining < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});



