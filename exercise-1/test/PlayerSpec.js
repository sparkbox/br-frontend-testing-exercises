
describe("Player", () => {
  var player;
  var song;

  beforeEach(() => {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", () => {
    player.play(song);
    expect(player.currentlyPlayingSong).to.equal(song);
  });

  describe("when song has been paused", () => {
    beforeEach(() => {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", () => {
      expect(player.isPlaying).to.equal(false);
    });

    it("should be possible to resume", () => {
      player.resume();
      expect(player.isPlaying).to.equal(true)
      expect(player.currentlyPlayingSong).to.equal(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", () => {
    let called = false;
    song.persistFavoriteStatus = () => called = true;

    player.play(song);
    player.makeFavorite();

    expect(called).to.equal(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", () => {
    it("should throw an exception if song is already playing", () => {
      player.play(song);

      expect(() => player.resume()).to.throw("song is already playing");
    });
  });

  describe("#stop", () => {
    xit("should indicate that no song is currently playing", () => {
      player.play(song);
      player.stop();

      // Verify no song is playing
    });

    xit("should have no current song", () => {
      player.play(song);
      player.stop();

      // Verify that there is no current song
    });
  });
});
