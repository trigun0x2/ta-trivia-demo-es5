var TA = window.TA;
var answer;

// Initiate listener on Twitch chat messages
TA.twitch.chat.on('say', function(data){
  // Check if a new trivia is initiated
  if (data.message == '!trivia'){
    $.get("http://jservice.io/api/random")
      .done(function(res){
        // Clear current question and also winner
        question = res[0].question;
        answer   = res[0].answer;
        $(".question-text").text(question);
        // Announce new trivia
        TA.twitch.chat.say(question);
      });
  }else if (data.message == answer){
    // Announce winner!
    $(".winner-name").text(data.from);
  }
})

function TriviaDebugger (){
  this.start = function(){
    console.log("asdas");
    TA.twitch.chat.emit('say', {message: "!trivia", from: "TestUser"});
  }
  this.answer = function(){
    console.warn(answer);
    TA.twitch.chat.emit('say', {message: answer, from: "TestUser"});
  }
}
// TO ADD:
// - Chat can intiate questions multiple times
// - Add winner's image
// - Clear question and winner after 10s
// - Check for close answers
