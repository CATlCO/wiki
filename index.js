$(document).ready(function() {
  var searchTerm;
  function searchFor(term) {
    $.ajax({
      url: "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json",
      data: "&srsearch=" + term,
      dataType: 'jsonp',
      type: 'GET',
      success: function(data) {
        var result = data.query.search;
        if(result.length >0){
          result.map(function(page) {
            $(".result").append("<a class='item' target ='_blank' href='https://en.wikipedia.org/wiki/"+ page.title +"'><h2 class='title'>" + page.title + "</h2><p class='snippet'>" + page.snippet + "</p></a>");
          })
        }
          else { $(".result").html("<p>Sorry, no results.</p>");}
        },
      error: function(){
        $(".result").html("<p>Ups, something went wrong.</p>");
      }
    })
  }

  $("#search").focusin(function() {
    $('.fa-search').css('opacity', 1);
    $('.search-form').css('box-shadow', '0 0 5px #fff');
  }).focusout(function(){
    $('.fa-search').css('opacity', 0.5);
    $('.search-form').css('box-shadow', 'none');
  });
  $("#search").keypress(function() {
    $(".result").html("");
    searchTerm = $("#search").val();
    searchFor(searchTerm);
  });

}); 