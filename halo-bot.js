module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var players = req.body.text.split(' ');
  players.shift();

  var shuffled_players = shuffle(players);
  var team_a = shuffled_players.slice(0, shuffled_players.length / 2).join(' ');
  var team_b = shuffled_players.slice(shuffled_players.length / 2, shuffled_players.length).join(' ');

  if (shuffled_players.length < 2) {
    var botPayload = {
      text : 'Two players required'
    };
  }
  else {
    var botPayload = {
      text : 'Team A: ' + team_a + "\nTeam B: " + team_b
    };
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  };


  // Adapted from: http://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
      var counter = array.length, temp, index;

      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      return array;
  };
}
