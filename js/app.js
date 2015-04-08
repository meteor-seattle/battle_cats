$(document).ready(function() {
  var context = $('#middle')[0].getContext('2d');
  var chart = new Chart(context).Doughnut([
    {
      value: 1,
      color: '#e74c3c',
      highlight: '#c0392b',
      label: 'Red'
    },
    {
      value: 1,
      color: '#3498db',
      highlight: '#2980b9',
      label: 'Blue'
    }
  ]);

  var vote = function(event) {
    this.id === 'left' ? chart.segments[1].value++ : chart.segments[0].value++;
    chart.update();
  }

  $('#left, #right').on('click', vote);
});
