document.addEventListener('DOMContentLoaded', function() {
  var Photo = function(fileName) {
    this.path = 'images/kittens/' + fileName;
    this.votes = 1;
  }

  Photo.prototype.vote = function() {
    return ++this.votes;
  }

  var Tracker = function() {
    this.photos = [];

    for (var i = 0; i < 14; i++) {
      this.photos.push(new Photo(i + '.jpg'));
    }

    var context = document.getElementById('middle').getContext('2d');
    this.chart = new Chart(context).Doughnut([
      {
        color: '#e74c3c',
        highlight: '#c0392b',
        label: 'Red'
      },
      {
        color: '#3498db',
        highlight: '#2980b9',
        label: 'Blue'
      }
    ]);
  }

  Tracker.prototype.isVoting = function() {
    return this.state === 'voting';
  }

  Tracker.prototype.isProclaiming = function() {
    return this.state === 'proclaiming';
  }

  Tracker.prototype.voting = function() {
    this.state = 'voting';
    this.selectKittens();
    this.drawKittens();
    this.resetResults();
    this.updateChart();
  }

  Tracker.prototype.proclaiming = function(winner) {
    this.state = 'proclaiming';
    this.declareResults(this.castVote(winner));
    this.updateChart();
  }

  Tracker.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  Tracker.prototype.selectKittens = function() {
    var left = this.getRandomInt(0, this.photos.length);
    var right = this.getRandomInt(0, this.photos.length);

    while (left === right) {
      right = this.getRandomInt(0, this.photos.length);
    }

    this.left = this.photos[left];
    this.right = this.photos[right];
  }

  Tracker.prototype.drawKittens = function() {
    var left = document.getElementById('left');
    left.style.borderColor = '#3498db';
    left.style.cursor = 'pointer';
    left.style.backgroundImage = 'url(' + this.left.path + ')';

    var right = document.getElementById('right');
    right.style.borderColor = '#e74c3c';
    right.style.cursor = 'pointer';
    right.style.backgroundImage = 'url(' + this.right.path + ')';
  }

  Tracker.prototype.updateChart = function() {
    this.chart.segments[1].value = this.left.votes;
    this.chart.segments[0].value = this.right.votes;
    this.chart.update();
  }

  Tracker.prototype.resetResults = function() {
    document.getElementById('winner').style.display = 'none';
    document.getElementById('next').style.display = 'none';
  }

  Tracker.prototype.castVote = function(winner) {
    var left = document.getElementById('left');
    var right = document.getElementById('right');

    if (winner === 'left') {
      this.left.vote();

      left.style.borderColor = '#3498db';
      left.style.cursor = 'auto';

      right.style.borderColor = 'white';
      right.style.cursor = 'auto';

      return 'Blue wins!';
    } else {
      this.right.vote();

      right.style.borderColor = '#e74c3c';
      right.style.cursor = 'auto';

      left.style.borderColor = 'white';
      left.style.cursor = 'auto';

      return 'Red wins!';
    }
  }

  Tracker.prototype.declareResults = function(message) {
    var winner = document.getElementById('winner');
    winner.style.display = 'block';
    winner.textContent = message;

    var next = document.getElementById('next');
    next.style.display = 'inline-block';
  }

  var tracker = new Tracker();
  tracker.voting();

  var vote = function() {
    if (tracker.isProclaiming()) {
      return;
    }

    tracker.proclaiming(this.id);
  }

  var declare = function() {
    if (tracker.isVoting()) {
      return;
    }

    tracker.voting();
  }

  document.getElementById('left').addEventListener('click', vote);
  document.getElementById('right').addEventListener('click', vote);
  document.getElementById('next').addEventListener('click', declare);
});
