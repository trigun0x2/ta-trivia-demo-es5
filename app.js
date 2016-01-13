var TA = window.TA;
var answer;
var trivaStarted = false;

// Initiate listener on Twitch chat messages
TA.twitch.chat.on('say', function(data){
  // Check if a new trivia is initiated
  if (data.message == '!trivia' && !trivaStarted){
    $.get("http://jservice.io/api/random")
      .done(function(res){
        // Clear current question and also winner
        question = res[0].question;
        answer   = res[0].answer;
        $(".question-text").text(question);
        $(".winner-cont").slideUp(function(){
          $(".question-cont").slideDown();
        });
        // Announce new trivia
        TA.twitch.chat.say(question);
        trivaStarted = true;
      });
  }else if (data.message == answer){
    // Announce winner!
    $(".winner-name").text(data.from);
    $(".winner-img").attr("src", data.image);
    $(".question-cont").slideUp(function(){
      $(".winner-cont").slideDown();
    });
    setTimeout(function(){$(".winner-cont").slideUp()}, 10001);
    trivaStarted = false;
  }
})

function TriviaDebugger (){
  this.start = function(){
    TA.twitch.chat.emit('say', { message: "!trivia", from: "TestUser" });
  }
  this.answer = function(){
    console.warn(answer);
    TA.twitch.chat.emit('say', { message: answer, from: "TestUser", image: "https://pbs.twimg.com/profile_images/557227374236794881/7qhBtYpT.png" });
  }
}

var triviadebugger = new TriviaDebugger;

// TO ADD:
// - Chat can intiate questions multiple times
// - Add winner's image
// - Clear question and winner after 10s
// - Check for close answers
