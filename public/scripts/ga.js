(function(){
  ogt = window.ogt || {};
  ogt.ga = ogt.ga || {};

  ogt.ga.trackingId = 'UA-106123012-2';
  ogt.ga.config = {
    'custom_map': {
      'dimension1': 'color',
      'dimension22': 'size'
    }
  };

  ogt.ga.customEvent = function(){
    var parameters = {
      'value': 'mycustom_value'
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'mycustomevent', parameters);
  };

  ogt.ga.customEventOverrideFields = function(){
    var parameters = {
      'value': 33322,
      'event_category': 'custom_category',
      'event_action': 'custom_action',
      'event_label': 'custom_label'
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'customevent2', parameters);
  };

  ogt.ga.customEventCustomDimension = function(){
    var parameters = {
      'value': 44,

      'color': 'red',
      'size': 'medium'
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'customevent3', parameters);
  };

  ogt.ga.timing = function(){
    var parameters = {
      'name': 'Load Time',
      'value': 4305
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'timing_complete', parameters);
  };

  ogt.ga.exception = function(){
    var parameters = {
      'description': 'An internal server error has occurred.',
      'fatal': true
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'exception', parameters);
  };

  ogt.ga.eecImpression = function(){
    var parameters = {
      'items': tagDemo.helper.getProducts()
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'view_item_list', parameters);
  };

  ogt.ga.eecClick = function(){
    var parameters = {
      'content_type': 'product',
      'items': [tagDemo.helper.getProducts()[0]]
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'select_content', parameters);
  };

  ogt.ga.eecAddToCart = function(){
    var parameters = {
      'items': [tagDemo.helper.getProducts()[0]]
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'add_to_cart', parameters);
  };

  ogt.ga.eecBeginCheckout = function(){
    var parameters = {
      'items': [tagDemo.helper.getProducts()[0]]
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'begin_checkout', parameters);
  };

  ogt.ga.eecPurchase = function(){
    var params = {};

    tagDemo.helper.addRoutingParameters(params, {isPurchase: true});

    tagDemo.helper.addPurchaseParameters(params);
    tagDemo.helper.addProductParameters(params);

    gtag('event', 'purchase', params);
  };

  ogt.ga.eecViewPromotion = function(){
    var parameters = {
      'promotions': tagDemo.helper.getPromotions()
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'view_promotion', parameters);
  };

  ogt.ga.eecClickPromotion = function(){
    var parameters = {
      'promotions': [tagDemo.helper.getPromotions()[0]]
    };

    tagDemo.helper.addRoutingParameters(parameters);

    gtag('event', 'select_content', parameters);
  };
})();
