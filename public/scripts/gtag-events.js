(function(){
  ogt = window.ogt || {};

  ogt.addPaymentInfo = function(){
    var params = tagDemo.helper.addRoutingParameters();

    gtag('event', 'add_payment_info', params);
  };

  ogt.addToCart = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    gtag('event', 'add_to_cart', params);
  };

  ogt.addToWishlist = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    gtag('event', 'add_to_wishlist', params);
  };

  ogt.beginCheckout = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    params.coupon = '';

    gtag('event', 'begin_checkout', params);
  };

  ogt.checkoutProgress = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    params.coupon = 'SUMMER_DISCOUNT';
    params.checkout_step = 2;

    gtag('event', 'checkout_progress', params);
  };

  ogt.exception = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.description = 'A fatal exception occurred while processing your request to "checkout"';
    params.fatal = true;

    gtag('event', 'exception', params);
  };

  ogt.generateLead = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.value = 34;
    params.transaction_id = '1ax34TG';

    gtag('event', 'generate_lead', params);
  };

  ogt.login = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.method = 'Google';

    gtag('event', 'login', params);
  };

  ogt.pageView = function(){
    var params = tagDemo.helper.addRoutingParameters();

    gtag('event', 'page_view', params);
  };

  ogt.purchase = function(){
    var params = {};

    tagDemo.helper.addRoutingParameters(params, {isPurchase: true});

    tagDemo.helper.addPurchaseParameters(params);
    tagDemo.helper.addProductParameters(params);

    gtag('event', 'purchase', params);
  };

  ogt.refund = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addPurchaseParameters(params);
    tagDemo.helper.addProductParameters(params);

    gtag('event', 'refund', params);
  };

  ogt.removeFromCart = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    gtag('event', 'remove_from_cart', params);
  }

  ogt.search = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.search_term = "Douglas Adams";

    gtag('event', 'search', params);
  };

  ogt.selectContent = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.content_type = 'article';
    params.content_id = 'shopping-1203';

    gtag('event', 'select_content', params);
  };

  ogt.selectContentProduct = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    gtag('event', 'select_content', params);
  };

  ogt.selectContentPromotion = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.promotions = [tagDemo.helper.getPromotions()[0]];

    gtag('event', 'select_content', params);
  };

  ogt.setCheckoutOption = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.checkout_step = 1;
    params.checkout_option = "USPS";

    gtag('event', 'set_checkout_option', params);
  };

  ogt.share = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.method = 'Google';
    params.content_id = 'http://news.google.com';

    gtag('event', 'share', params);
  };

  ogt.signUp = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.method = 'Google';

    gtag('event', 'sign_up', params);
  };

  ogt.timingComplete = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.name = "JS Load Time";
    params.value = tagDemo.helper.generateRandomInteger(20, 2450);

    gtag('event', 'timing_complete', params);
  };

  ogt.viewItem = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params, true);

    gtag('event', 'view_item', params);
  };

  ogt.viewItemList = function(){
    var params = tagDemo.helper.addRoutingParameters();

    tagDemo.helper.addProductParameters(params);

    gtag('event', 'view_item_list', params);
  };

  ogt.viewPromotion = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.promotions = tagDemo.helper.getPromotions();

    gtag('event', 'view_promotion', params);
  };

  ogt.viewSearchResults = function(){
    var params = tagDemo.helper.addRoutingParameters();

    params.search_term = "Douglas Adams";

    gtag('event', 'view_search_results', params);
  };

  ogt.customEvent = function(){
    var params = tagDemo.helper.addRoutingParameters();

    gtag('event', 'MyCustomEventName', params);
  };
})();
