
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $NYT = $('#nytimes-articles');
    var $street = $('#street').val();
    var $city = $('#city').val();
    var address = $street + ", " + $city;
    $greeting.text('so, you want to live at ' + address + '?');
    var streetViewURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address;
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');


    //NYT Article AJAX Request
          // var key = "88c70572bb494f2f902a210e016ba09d";

      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
        'api-key': "88c70572bb494f2f902a210e016ba09d",
        'q': $city
      });
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        $nytHeaderElem.text('New Yourk Times Articels about ' + $city);
        result.response.docs.forEach(function(element) {
          $NYT.append('<li class="article"><a href="'+element.web_url+'">' + element.headline.main + '</a><p>'+element.snippet+'</p></li>');
        });

      }).error(function() {
        $nytHeaderElem.text('New Yourk Times Articels Could Not Be Loaded !');
      }).fail(function(err) {
        throw err;
        $nytHeaderElem.text('New Yourk Times Articels Could Not Be Loaded !');
      });

      // // wikipedia AJAX request

      var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('faild to get wikipedia resources !');
      });

      var wikiUrl = 'http://en.wikipedia.org/w/api.php';
      wikiUrl += '?' + $.param({
          'action' : "opensearch",
          'search' : $city,
          'format' : "json",
          'callback' : "wikiCallback"

      });

      $.ajax({
          url: wikiUrl,
          dataType:"jsonp",
          success : function(response){
              var articleList = response[1];

              for (var i =0; i< articleList.length; i++){
                  articleStr = articleList[i];
                  var url  = 'http://en.wikipedia.org/wiki/' + articleStr;
                  $wikiElem.append('<li><a href="'+url+'">'+ articleStr+'</a></li>');
              };
              clearTimeout(wikiRequestTimeout);
          }
      });
    return false;
};

$('#form-container').submit(loadData);
