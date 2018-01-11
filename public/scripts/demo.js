(function(){
  ogt = window.ogt || {};

  var logBuffer = [],
      logWindow = undefined,
      eventCode = undefined;

  tagDemo = window.tagDemo || {};

  window.onload = function(){
    logWindow = document.getElementById('logWindow');
    eventCode = document.getElementById('eventCode');
    tagDemo.flushLogBuffer();
    tagDemo.bufferLogs = false;
  };

  tagDemo.bufferLogs = true;

  tagDemo.displayCall = function(){
    var args = arguments.callee.caller.arguments;
    var cmd = args[0];
    var eventName = args[1];
    var eventParameters = args[2];

    if(typeof(eventName) !== "string"){
      eventParameters = eventName;
      eventName = undefined;
    }

    var invocation = "gtag(";

    invocation += "'" + cmd + "'";

    if(eventName !== undefined){
      invocation += ", '" + eventName + "'";
    }

    if(eventParameters !== undefined && Object.getOwnPropertyNames(eventParameters).length > 0){
      invocation += ", " + JSON.stringify(eventParameters, undefined, 2);
    }

    invocation += ");";

    if(tagDemo.bufferLogs){
      logBuffer.push(invocation);
      return;
    }
    _displayInvocation(invocation);
  };

  tagDemo.flushLogBuffer = function(){
    // Clear out previous content
    _displayInvocation('');

    for(var i = logBuffer.length-1; i >= 0; i--){
      _displayInvocation(logBuffer[i], true);
    }
    logBuffer = [];
  };

  tagDemo.init = function(){
    // Hijack gtag for logging
    var ogtag = gtag;
    gtag = function(){
      tagDemo.displayCall();
      ogtag.apply(ogtag, Array.prototype.slice.call(arguments));
    };
  };

  tagDemo.navigate = function(url){
    gtag('event', 'select_content', {
      'content_type': 'button',
      'content_id': url
    });

    window.location.href = url;

    return false;
  };

  tagDemo.download = function(querySelector, filename){
    const textarea = document.querySelector(querySelector);
    const blob = new Blob([textarea.value], {type: 'text/plain;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename + '.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  tagDemo.copyToClipboard = function(querySelector){
    // Copy the contents of the text area.
    const textarea = document.querySelector(querySelector);
    textarea.select();
    document.execCommand('copy');

    // Flash the background of the text area to indicate something happened.
    textarea.style.backgroundColor = '#fff9c4';  // yellow-2
    setTimeout(function() {
      textarea.style.backgroundColor = '';
    }, 100);
  };

  function _displayInvocation(invocation, preserve){
    if(!eventCode) return;

    if(preserve){
      invocation += "\n\n" + eventCode.value;
    }

    eventCode.value = invocation;

    // Make sure the window is displayed
    if(logWindow && invocation !== '') {
      logWindow.style.display = "block";
    }

    // Resize the code box to match content
    eventCode.style.height = '5px';
    eventCode.style.height = (eventCode.scrollHeight + 2) + 'px';
  }

  function generateGUID(){
    var base = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    return base.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  tagDemo.showAdditionalTests = function(){
    var offscreen = document.querySelector('.additional-content')
        .classList
        .toggle('card--offscreen');

    localStorage.setItem('show_additional_content', !offscreen);
  };

  tagDemo.helper = {
    generateRandomInteger: function(min, max){
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    generateTransactionId: function(){
      return generateGUID();
    },
    generateSessionId: function(){
      return generateGUID();
    },
    addProductParameters: function(parameters, singleProduct){
      var products = tagDemo.helper.getProducts();

      if(singleProduct) products = [products[0]];

      parameters.items = products;
    },
    addPurchaseParameters: function(parameters){
      parameters.transaction_id = tagDemo.helper.generateTransactionId();
      parameters.affiliation = 'Google online store';
      parameters.value = 23.07;
      parameters.currency = 'USD';
      parameters.tax = 1.24;
      parameters.shipping = 0;
      parameters.list_name = 'Search Results';
    },
    addRoutingParameters: function(parameters, options){
      parameters = parameters || {};

      var routing = [],
          options = options || {};

      // Multi routing checkboxes
      var defaultGroup = document.getElementById('ogt_event_default'),
          ga = document.getElementById('ogt_ga'),
          awrmkt = document.getElementById('ogt_awrmkt'),
          awct = document.getElementById('ogt_awct'),
          dc = document.getElementById('ogt_dc');

      if(options.defaultGroup || (defaultGroup && defaultGroup.checked)){
        routing.push('default');
      }

      if(options.ga || (ga && ga.checked)){
        routing.push(ogt.ga.trackingId);
      }

      if(options.awct || (awct && awct.checked)){
        routing.push(ogt.aw.getTargetId(true));
      } else if(options.awrmkt || (awrmkt && awrmkt.checked)){
        routing.push(ogt.aw.getTargetId());
      }

      if(options.dc || (dc && dc.checked)){
        var countingMethod = options.isPurchase ? 'transactions' : 'standard';
        routing.push(ogt.dc.getTargetId(countingMethod));
      }

      if(routing && routing.length > 0) {
        if(routing.length == 1){
          parameters.send_to = routing[0];
        } else {
          parameters.send_to = routing;
        }
      }

      return parameters;
    },
    getProducts: function(){
      return [
        {
          'id': 'P12345',                   // Product ID (string).
          'name': 'Android Warhol T-Shirt', // Product name (string).
          'brand': 'Google',                // Product brand (string).
          'category': 'Apparel/T-Shirts',   // Product category (string).
          'variant': 'Black',               // Product variant (string).
          'list_position': 1,               // Product position (number).
          'quantity': 2,                    // Product quantity (number).
          'price': 2                        // Price of the product
        },
        {
          'id': 'P67890',                   // Product ID (string).
          'name': 'Flame challenge TShirt', // Product name (string).
          'brand': 'MyBrand',               // Product brand (string).
          'category': 'Apparel/T-Shirts',   // Product category (string).
          'variant': 'Red',                 // Product variant (string).
          'list_position': 2,               // Product position (number).
          'quantity': 1,                    // Product quantity (number).
          'price': 3                        // Price of the product
        },
      ];
    },
    getPromotions: function(){
      return [
        {'id': 'abc123', 'name': 'summer_promo'},
        {'id': 'xyz987', 'name': 'spring savings'}
      ];
    }
  };
})();
