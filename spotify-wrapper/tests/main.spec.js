import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { beforeEach } from 'mocha';
import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/main';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('search', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.resolves({ json: () => ({ body: 'json' }) });
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call fetch function', () => {
      const artists = search();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Queen','artist');
        const albums = search('Queen','album');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=album');
      });
      context('passing more than one type', () => {
        const artists = search('Queen',['artist','album']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist,album');
      });
    });
    it('should return the JSON Data from the Promise', () => {
      const artists = search('Queen','artist');
      artists.then((data) => {
        expect(data).to.be.eql({ body: 'json'});
      });
    });
  });


});
