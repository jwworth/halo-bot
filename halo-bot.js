module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var players = req.body.text.split(' ');
  players.shift();

  // Prevent endless loops
  if (userName === 'slackbot') {
    return res.status(200).end();
    }
  // Require at least two players
  else if (players.length < 2) {
    return res.status(200).json({ text: 'Two players required!' });
  }
  // Return the teams
  else {
    return res.status(200).json(botPayload(players));
  };

  function botPayload(players) {
    var shuffledPlayers = shuffle(players);
    var mid = shuffledPlayers.length / 2
    var teamA = shuffledPlayers.slice(0, mid).join(' ');
    var teamB = shuffledPlayers.slice(mid, shuffledPlayers.length).join(' ');
    return { text : 'Team A: ' + teamA + "\nTeam B: " + teamB };
  }

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
