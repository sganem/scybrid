(function(){
  ogt = window.ogt || {};
  ogt.aw = ogt.aw || {};

  var accountId = 953774234,
      conversionLabel = 'PbLfCND1qm4QmuHlxgM',
      remarketingLabel = 'rfEhCNSi2HYQmuHlxgM';

  function _addRoutingParameters(parameters, isConversion, includeRemarketingLabel){
    var er = document.getElementById('ogt_event_routing'),
        eventRouting = er && er.checked;

    if(!eventRouting && !isConversion && !includeRemarketingLabel) return;

    parameters.send_to = ogt.aw.getTargetId(isConversion, includeRemarketingLabel);

    if(includeRemarketingLabel) parameters.aw_remarketing_only = true;
  }

  ogt.aw.getTargetId = function(isConversion, includeRemarketingLabel){
    var targetId = 'AW-' + accountId;

    if(isConversion) return targetId += '/' + conversionLabel;

    if(!includeRemarketingLabel) return targetId;

    return targetId += '/' + remarketingLabel;
  };

  ogt.aw.conversion = {
    website: function(){
      var parameters = {
        currency: 'USD',
        language: 'en_US',
        transaction_id: tagDemo.helper.generateTransactionId(),
        value: 55
      }

      _addRoutingParameters(parameters, true);

      gtag('event', 'user_sign_up', parameters);
    }
  };

  ogt.aw.remarketing = {
    static: function(){
      var parameters = {};

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    customParameters: function(){
      var parameters = {
        color: 'red',
        size: 'medium'
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    tagBasedAudience: function(){
      var parameters = {};

      _addRoutingParameters(parameters, false, true);

      gtag('event', 'view_item', parameters);
    }
  };

  ogt.aw.remarketing.dynamic = {
    education: function(){
      var parameters = {
        edu_pid: '1255',
        edu_plocid: 'NYC',
        edu_pagetype: 'searchresults',
        edu_totalvalue: 1000.00
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    flights: function(){
      var parameters = {
        flight_destid: 'PAR',
        flight_originid: 'LON',
        flight_pagetype: 'offerdetail',
        flight_startdate: '2018-05-01',
        flight_enddate: '2018-05-08',
        flight_totalvalue: 100
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    hotels: function(){
      var parameters = {
        hrental_id: 52639,
        hrental_pagetype: 'offerdetail',
        hrental_startdate: '2018-05-01',
        hrental_enddate: '2018-05-08',
        hrental_totalvalue: 100
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    jobs: function(){
      var parameters = {
        job_id: 52639,
        job_locid: 'NYC',
        job_pagetype: 'offerdetail',
        job_totalvalue: 100
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    local: function(){
      var parameters = {
        local_id: 52639,
        local_pagetype: 'offerdetail',
        local_totalvalue: 100
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    real_estate: function(){
      var parameters = {
        listing_id: 52639,
        listing_pagetype: 'offerdetail',
        listing_totalvalue: 600000.00
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    retail: function(){
      var parameters = {
        ecomm_prodid: 52639,
        ecomm_pagetype: 'offerdetail',
        ecomm_totalvalue: 49.99
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    travel: function(){
      var parameters = {
        travel_destid: 'PAR',
        travel_originid: 'LON',
        travel_pagetype: 'offerdetail',
        travel_startdate: '2018-05-01',
        travel_enddate: '2018-05-08',
        travel_totalvalue: 100
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    },
    custom: function(){
      var parameters = {
        dynx_itemid: 52639,
        dynx_itemid: 'Red',
        dynx_pagetype: 'offerdetail',
        dynx_totalvalue: 20000
      };

      _addRoutingParameters(parameters);

      gtag('event', 'view_item', parameters);
    }
  }

  ogt.aw.dynamicRemarketing = function(){
    alert('Example code coming soon');
  };
})();
