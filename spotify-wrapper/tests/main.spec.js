import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { beforeEach } from 'mocha';
import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/main';
chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fechtedStub;
  let promise;
  beforeEach(() => {
    fechtedStub = sinon.stub(global, 'fetch');
    promise = fechtedStub.resolves({ json: () => ({ body: 'json' }) });
  });
  afterEach(() => {
    fechtedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {expect(search).to.exist });
    it('should exist the searchArtists method', () => { expect(searchArtists).to.exist; });
    it('should exist the searchAlbums method', () => { expect(searchAlbums).to.exist; });
    it('should exist the searchTracks method', () => { expect(searchTracks).to.exist; });
    it('should exist the searchPlaylists method', () => { expect(searchPlaylists).to.exist; });
  });

  describe('search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fechtedStub).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Queen','artist');
        const albums = search('Queen','album');
        expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist');
        expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=album');
      });
      context('passing more than one type', () => {
        const artists = search('Queen',['artist','album']);
        expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist,album');
      });
    });
    it('should return the JSON Data from the Promise', () => {
      const artists = search('Queen','artist');
      artists.then((data) => {
        expect(data).to.be.eql({ body: 'json'});
      });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Queen');
      expect(fechtedStub).to.have.been.calledOnce;
    });
    it('should receive the correct URL', () => {
      const artists = searchArtists('Queen');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist');
      const artists2 = searchArtists('Muse');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Queen');
      expect(fechtedStub).to.have.been.calledOnce;
    });
    it('should receive the correct URL', () => {
      const albums = searchAlbums('Queen');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=album');
      const albums2 = searchAlbums('Muse');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Queen');
      expect(fechtedStub).to.have.been.calledOnce;
    });
    it('should receive the correct URL', () => {
      const tracks = searchTracks('Queen');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=track');
      const tracks2 = searchTracks('Muse');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Queen');
      expect(fechtedStub).to.have.been.calledOnce;
    });
    it('should receive the correct URL', () => {
      const playlists = searchPlaylists('Queen');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=playlist');
      const playlists2 = searchPlaylists('Muse');
      expect(fechtedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });

});
