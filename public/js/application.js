$(document).ready(function() {
  $('#searchbar').on('submit', function(evt){
    evt.preventDefault();
// this is just so shit will be commited you can delete this after
    $.ajax({
      url: '/artists/info',
      type: 'get',
      data: $(this).serialize()
    }).done(function(response){
      // displays image
      var imageUrl = response.artist.image[3]["#text"]
      $('#artist-image').html('<img src="'+ imageUrl +'"/>')

      // displays artists bio
      var artistInfo = response.artist.bio.content
      $('#artist-info').html('<p>'+ artistInfo +'</p>')

      // displays artist lastfm url
      var listenFmUrl = response.artist.url
      console.log(listenFmUrl)
      $('#artist-listen-url').html("<a href='" + listenFmUrl + "'>Artist's LastFM</a>")
    })
  })
});
