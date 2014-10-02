$(document).ready(function() {
  $('#searchbar').on('submit', function(evt){
    evt.preventDefault();
// this is just so shit will be commited you can delete this after
    $.ajax({
      url: '/artists/info',
      type: 'get',
      data: $(this).serialize()
    }).done(function(response){
      console.log(response)
      var imageUrl = response.artist.image[3]["#text"]
      $('#artist-image').html('<img src="'+ imageUrl +'"/>')
      console.log(response.artist.bio.content);
      var artistInfo = response.artist.bio.content
      $('#artist-info').html('<p>'+ imageUrl +'</p>')
      console.log(response.artist.url)
      var listenFmUrl = response.artist.url
      $('#artist-listen-url').html("listenFmUrl")
    })
  })
});
