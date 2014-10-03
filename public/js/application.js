$(document).ready(function() {

  $('#searchbar').on('submit', function(evt){
    evt.preventDefault();
    $.ajax({
      url: '/artists/info',
      type: 'get',
      data: $(this).serialize()
    }).done(function(artist_info){
      $('#similar-artist-header').text('Similar Artists');
      $('#top-albums-header').text('Top Albums');
      returnArtistBackground(artist_info);
      returnSimilarArtists(artist_info);
      returnTopAlbums(artist_info);
    })
  })
});

function returnArtistBackground(artist_info){
  // displays artist image
  var imageUrl = artist_info.background.artist.image[4]["#text"]
  $('#artist-image').html('<img src="'+ imageUrl +'"/>')
  // displays artist info/bio
  var artistInfo = artist_info.background.artist.bio.content
  $('#artist-info').html(artistInfo)
  // displays artist lastFM link
  var listenFmUrl = artist_info.background.artist.url
  $('#artist-listen-url').html('<a href="' + listenFmUrl + '" target="_blank">LastFM</a>')
};

function returnSimilarArtists(artist_info){
  var artists = artist_info.similar.similarartists.artist;
  $('#similar-artists').empty();
  for(var i = 1; i <= 5; i++){
    $('#similar-artists').append('<li class="poop">' + artists[i].name + '</li>')
  }

};

function returnTopAlbums(artist_info){
  var albums = artist_info.albums.topalbums.album;
  $('#top-albums').empty();
  for(var i = 1; i <= 5; i++){
    $('#top-albums').append('<li class="poop">' + albums[i].name + '</li>')
  }
};