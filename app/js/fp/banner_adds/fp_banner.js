(function() {
  'use strict';
  // AdColony App ID: appebca32855ff94faa9f
  // Zone ID: vz68a1938b539d45c89c
  // /////////////////////////////
  // Inmobi - Property ID: cb256abcd3dc4c469a4483e91d74ebce
  // /////////////////////////////
  // AdMob Ad unit ID: ca-app-pub-4533218344268526/6186038294
  // Ad unit name: fp banner ad bottom
  // Ad unit ID: ca-app-pub-4533218344268526/7523170695
  // Ad unit name: full screen banner
  // /////////////////////////////
 
  module.exports = function() {
   
    var banner_android_params = {
      bannerAdUnit: "6bec6903bc57450d9f82a2004bb154e5",
      refresh: 20
    };
   
    var fullscreen_android_arams = {
      fullscreenAdUnit: "e4f4f24356ff4416aa94755c5f9196ef",
      refresh: 20
    };
   
    var x = 0;
    var y = 0;
    var banner1 = CocoonJS.Ad.createBanner(banner_android_params);
    console.log(banner1); 
    banner1.onBannerShown.addEventListener(function() {
      console.log("banner1 onBannerShown");
    });

    banner1.onBannerHidden.addEventListener(function() {
      console.log("banner1 onBannerHidden");
    });

    banner1.onBannerReady.addEventListener(function(width, height) {
      console.log("banner1 onBannerReady (" + width + ", " + height + ")");
      x = window.innerWidth/2 - width/2;
      if (y === 0)
        y = window.innerHeight - height;
      else
        y = 0;
      var rect = new CocoonJS.Ad.Rectangle(x, y, width, height);
      banner1.setRectangle(rect);
      banner1.showBanner();
    });
    return banner1;
  };

})();
