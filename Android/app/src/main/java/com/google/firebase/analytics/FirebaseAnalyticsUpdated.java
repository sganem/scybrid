package com.google.firebase.analytics;

import android.content.Context;
import android.os.Bundle;
import android.os.Parcelable;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;

public class FirebaseAnalyticsUpdated {
    public static final String WEBTAG = "AnalyticsWebInterface";
    private static FirebaseAnalytics mAnalytics;
    private static FirebaseAnalyticsUpdated mAnalyticsUpdated;

    public static FirebaseAnalyticsUpdated getInstance(Context context) {
        if( mAnalyticsUpdated == null ) {
            mAnalyticsUpdated = new FirebaseAnalyticsUpdated();
            mAnalytics = FirebaseAnalytics.getInstance(context);
        }
        return mAnalyticsUpdated;
    }

    public void bindToWebView(WebView webView) {
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface( this, WEBTAG);
    }

    @JavascriptInterface
    public void logEvent( String event, String jsonParams ) {
        Log.d(WEBTAG, "logEvent: " + event + " params: " + jsonParams );
        Bundle eventParams = bundleFromJson( jsonParams );
        mAnalytics.logEvent( event, eventParams );
    }

    @JavascriptInterface
    public void setUserProperty( String key, String value ) {
        Log.d(WEBTAG, "setUserProperty: " + key + ":" + value );
        mAnalytics.setUserProperty( key, value );
    }

    private Bundle bundleFromJson(String json) {
        // [START_EXCLUDE]
        if (TextUtils.isEmpty(json) || json.equals( "undefined")) {
            return new Bundle();
        }

        Bundle result = new Bundle();
        try {
            JSONObject jsonObject = new JSONObject(json);
            Iterator<String> keys = jsonObject.keys();

            while (keys.hasNext()) {
                String key = keys.next();
                Object value = jsonObject.get(key);

                if (value instanceof String) {
                    result.putString(key, (String) value);
                } else if (value instanceof Integer) {
                    result.putInt(key, (Integer) value);
                } else if (value instanceof Double) {
                    result.putDouble(key, (Double) value);
                } else if (value instanceof JSONObject) {
                    result.putBundle(key, (Bundle) bundleFromJson(value.toString()));
                } else if (value instanceof JSONArray) {
                    ArrayList<Parcelable> bundleArray = new ArrayList<Parcelable>();
                    JSONArray jsonArray = (JSONArray) value;
                    for(int i = 0; i < jsonArray.length(); i++) {
                        bundleArray.add( (Bundle) bundleFromJson(jsonArray.get(i).toString()));
                    }
                    result.putParcelableArrayList(key, bundleArray);
                } else {
                    Log.w(WEBTAG, "Value for key " + key + " not one of [String, Integer, Double, JSONObject, JSONArray]");
                }
            }
        } catch (JSONException e) {
            Log.w(WEBTAG, "Failed to parse JSON, returning empty Bundle.", e);
            return new Bundle();
        }

        return result;
        // [END_EXCLUDE]
    }
}
