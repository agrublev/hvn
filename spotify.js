const SpotifyWebHelper = require('spotify-web-helper');

const helper = SpotifyWebHelper();
var nodeSpotifyWebHelper = require('node-spotify-webhelper');
var spotify = new nodeSpotifyWebHelper.SpotifyWebHelper();

// get the name of the song which is currently playing
spotify.getStatus(function (err, res) {
    if (err) {
        return console.error(err);
    }

    console.info('currently playing:',
        res.track.artist_resource.name, '-',
        res.track.track_resource.name);
});

helper.player.on('error', err => {
    if (err.message.match(/No user logged in/)) {
        // also fires when Spotify client quits
    } else {
        // other errors: /Cannot start Spotify/ and /Spotify is not installed/
    }
    console.warn(err);

});
helper.player.on('ready', () => {
    console.warn('@#@#');
    // Playback events
    helper.player.on('end', () => { });
    // helper.player.on('pause', () => { });
    // helper.player.on('seek', newPosition => {});
    // helper.player.on('end', () => { });
    // helper.player.on('track-will-change', track => {});
    // helper.player.on('status-will-change', status => {});
    //
    // // Playback control. These methods return promises
    // helper.player.play('spotify:track:4uLU6hMCjMI75M1A2tKUQC');
    // helper.player.pause();
    // helper.player.seekTo(60); // 60 seconds

    // Get current playback status, including up to date playing position
    console.log(helper.status);
    // 'status': {
    //    'track': ...,
    //    'shuffle': ...,
    //    'playing_position': ...
    //  }
});
