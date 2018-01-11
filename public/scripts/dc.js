(function(){
  ogt = window.ogt || {};
  ogt.dc = ogt.dc || {};

  var floodlightConfig = '6545157', // src
      floodlightGroup = 'group1', // type
      floodlightActivity = 'activity1'; // cat

  function _addRoutingParameters(parameters, countingMethod){
    var ic = document.getElementById('dc_include_custom');
    if(ic && ic.checked) {
      parameters.u1 = 'shirt';
      parameters.u3 = 'medium';
    }

    parameters.send_to = ogt.dc.getTargetId(countingMethod);
  }

  ogt.dc.getTargetId = function(countingMethod){
    if(!countingMethod) countingMethod = 'standard';

    return 'DC-' + floodlightConfig +
        '/' + floodlightGroup +
        '/' + floodlightActivity +
        '+' + countingMethod;
  };

  ogt.dc.counterStandard = function() {
    var parameters = {};

    _addRoutingParameters(parameters, 'standard');

    gtag('event', 'conversion', parameters);
  };

  ogt.dc.counterUnique = function(){
    var parameters = {};

    _addRoutingParameters(parameters, 'unique');

    gtag('event', 'conversion', parameters);
  };

  ogt.dc.counterPerSession = function(){
    var parameters = {
      session_id: tagDemo.helper.generateSessionId()
    };

    _addRoutingParameters(parameters, 'per_session');

    gtag('event', 'conversion', parameters);
  };

  ogt.dc.salesTransactions = function(){
    var parameters = {};

    tagDemo.helper.addPurchaseParameters(parameters);
    tagDemo.helper.addProductParameters(parameters);

    _addRoutingParameters(parameters, 'transactions');

    gtag('event', 'purchase', parameters);
  };

  ogt.dc.salesItemsSold = function(){
    var parameters = {};

    tagDemo.helper.addPurchaseParameters(parameters);
    tagDemo.helper.addProductParameters(parameters);

    _addRoutingParameters(parameters, 'items_sold');

    gtag('event', 'purchase', parameters);
  };
})();
