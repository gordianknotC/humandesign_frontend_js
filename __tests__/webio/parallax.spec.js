
/**
 * Created by gordianknot on 7/12/2017.
 */

var webdriverio = require('webdriverio');

console.log('---------------------------------')
describe('my webdriverio tests', function() {
   
   var client;
   jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;
   
   beforeEach(function() {
      console.log('beforeEach')
      client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
      console.log(client)
      return client.init();
   });
   
   it('test it', function() {
      return client
         .url('https://github.com/')
         .getElementSize('.header-logo-invertocat .octicon.octicon-mark-github2').then(function (result) {
            expect(result.height).toBe(32);
            expect(result.width).toBe(32);
         })
         .getTitle().then(function (title) {
            expect(title).toBe('How people build software · GitHub2');
         })
         .getCssProperty('a[href="/pricing"]', 'color').then(function (color) {
            expect(color).toBe('rgba(60,65,70,1)2');
         });
   });
   
   afterEach(function(done) {
      console.log('after')
      return client.end(  );
   });
});
console.log('--------------------------------------')