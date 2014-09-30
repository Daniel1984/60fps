(function() {
    /***
    This demo only Works on the CocoonJS environment.
    */
    if(!CocoonJS.nativeExtensionObjectAvailable) return;

    var demo = {
        isHidden: false,
        position: CocoonJS.Ad.BannerLayout.BOTTOM_CENTER,
        x : 0,
        y : 0,
        width : 0,
        height : 0,
        ctx:null,
        fullScreenAdvertisement : null,
        fullScreenAlreadyDownloaded: false,
        params: {
            banner : {
                "status" : null
            },
            fullscreen : {
                "status" : null
            }
        }
    };

    demo.layoutBanner = function() {
        var rect = banner1.getRectangle();
        console.log("rect.x: " + rect.x + ", rect.y: " + rect.y + ", rect.width: " + rect.width + ", rect.height: " + rect.height);
        var dpr = window.devicePixelRatio;
        if (demo.position == CocoonJS.Ad.BannerLayout.TOP_CENTER) {
            rect.x = window.innerWidth * dpr/2 - rect.width/2;
            rect.y = 0;

        } else {
            rect.x = window.innerWidth * dpr/2 - rect.width/2;
            rect.y = window.innerHeight * dpr - rect.height;
        }

        banner1.setRectangle(rect);
        if (!demo.isBannerHidden)
            banner1.showBanner();
    };

    var banner1Params = {
        "bannerAdUnit": "1367a17794114e00acbf38b48eb4cc49",
//        "bannerAdUnit-iPad": "agltb3B1Yi1pbmNyDQsSBFNpdGUYk8vlEww",
//        "bannerAdUnit-iPhone": "agltb3B1Yi1pbmNyDQsSBFNpdGUY5dDoEww",
        "refresh": 20
    };

    /**
    * Multi instance
    */
    function onBannerShown() {
        console.log("onBannerShown");
        demo.params.banner.status = "onBannerShown";
        demo.isBannerHidden = false;
    }

    function onBannerHidden() {
        console.log("onBannerHidden");
        demo.params.banner.status = "onBannerHidden";
        demo.isBannerHidden = true;
    }

    function onBannerReady(width, height) {
        console.log("onBannerReady " + width, height);
        demo.layoutBanner();
    }

    var banner1 = CocoonJS.Ad.createBanner(banner1Params);
    banner1.onBannerShown.addEventListener(onBannerShown);
    banner1.onBannerHidden.addEventListener(onBannerHidden);
    banner1.onBannerReady.addEventListener(onBannerReady);
    banner1.refreshBanner();

    demo.init = function(ctx){
      demo.ctx = ctx;
      banner1.showBanner();
      banner1.refreshBanner();
    };

    module.exports = demo;

})();
