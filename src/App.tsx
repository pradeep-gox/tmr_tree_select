import React, { useState } from "react";
import TMRTreeSelect from "./components/TMRTreeSelect";

const treeData = [
  {
    label: "Basic",
    value: "BASIC",
    children: [
      {
        value: "active_users",
        label: "Active users",
        description:
          "The number of distinct users who visited your site or app",
        children: [
          {
            value: "active_users_v1",
            label: "Active users V1",
            description: "",
          },
        ],
      },
      {
        value: "active_1day_users",
        label: "1-day active users",
        description:
          "The number of distinct active users on your site or app within a 1 day period. The 1 day period includes the last day in the report's date range. Note: this is the same as Active Users.",
        providerParam: "active1DayUsers",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "active_7day_users",
        label: "7-day active users",
        description:
          "The number of distinct active users on your site or app within a 7 day period. The 7 day period includes the last day in the reports date range",
        providerParam: "active7DayUsers",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "active_28day_users",
        label: "28-day active users",
        description:
          "The number of distinct active users on your site or app within a 28 day period. The 28 day period includes the last day in the reports date range",
        providerParam: "active28DayUsers",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "new_users",
        label: "New users",
        description:
          "The number of users who interacted with your site or launched your app for the first time (event triggered: first_open or first_visit)",
        providerParam: "newUsers",
        providerEndpoint: "runReport",
        isDefault: true,
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "total_users",
        label: "Total users",
        description:
          "The number of distinct users who have logged at least one event, regardless of whether the site or app was in use when that event was logged",
        providerParam: "totalUsers",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "sessions",
        label: "Sessions",
        description:
          "The number of sessions that began on your site or app (event triggered: session_start)",
        providerParam: "sessions",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "sessions_per_user",
        label: "Sessions per user",

        description:
          "The average number of sessions per user (Sessions divided by Active Users)",
        providerParam: "sessionsPerUser",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          { value: "sessions", aggregation: "sum" },
          { value: "active_users", aggregation: "sum" },
        ],
      },
      {
        value: "average_session_duration",
        label: "Average session duration",

        description: "The average duration (in seconds) of users sessions.",
        providerParam: "averageSessionDuration",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "AVG",
      },
      {
        value: "engaged_sessions",
        label: "Engaged sessions",
        description:
          "The number of sessions that lasted longer than 10 seconds, or had a conversion event, or had 2 or more screen views",
        providerParam: "engagedSessions",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "engagement_rate",
        label: "Engagement rate",
        description:
          "The percentage of engaged sessions (Engaged sessions divided by Sessions)",
        providerParam: "engagementRate",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          { value: "engaged_sessions", aggregation: "sum" },
          { value: "sessions", aggregation: "sum" },
        ],
      },
      {
        value: "user_engagement_duration",
        label: "Total user engagement duration (sec)",

        description:
          "The total amount of time (in seconds) your website or app was in the foreground of users devices",
        providerParam: "userEngagementDuration",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "screen_page_views",
        label: "Views",
        description:
          "The number of app screens or web pages your users viewed. Repeated views of a single page or screen are counted. (screen_view + page_view events)",
        providerParam: "screenPageViews",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "bounce_rate",
        label: "Bounce rate",

        description:
          "The percentage of sessions that were not engaged ((Sessions Minus Engaged sessions) divided by Sessions). This metric is returned as a fraction; for example, 0.2761 means 27.61% of sessions were bounces",
        providerParam: "bounceRate",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          [
            "subtraction",
            {
              value: "sessions",
              aggregation: "sum",
            },
            {
              value: "engaged_sessions",
              aggregation: "sum",
            },
          ],
          {
            value: "sessions",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "crash_affected_users",
        label: "Crash affected users",

        description:
          "The number of users that logged a crash in this row of the report. For example if the report is time series by date, this metrics reports total users with at least one crash on this date. Crashes are events with the name ('app_exception')",
        providerParam: "crashAffectedUsers",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "AVG",
      },
      {
        value: "crash_free_users_rate",
        label: "Crash free users rate",

        description:
          "The number of users without crash events (in this row of the report) divided by the total number of users. This metric is returned as a fraction; for example, 0.9243 means 92.43% of users were crash-free",
        providerParam: "crashFreeUsersRate",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          [
            "subtraction",
            {
              value: "total_users",
              aggregation: "sum",
            },
            {
              value: "crash_affected_users",
              aggregation: "sum",
            },
          ],
          {
            value: "total_users",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "dau_per_mau",
        label: "DAU / MAU",

        description:
          "The rolling percent of 30-day active users who are also 1-day active users. This metric is returned as a fraction; for example, 0.113 means 11.3% of 30-day active users were also 1-day active users",
        providerParam: "dauPerMau",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "dau_per_wau",
        label: "DAU / WAU",

        description:
          "The rolling percent of 7-day active users who are also 1-day active users. This metric is returned as a fraction; for example, 0.082 means 8.2% of 7-day active users were also 1-day active users.",
        providerParam: "dauPerWau",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "wau_per_mau",
        label: "WAU / MAU",

        description:
          "The rolling percent of 30-day active users who are also 7-day active users. This metric is returned as a fraction; for example, 0.234 means 23.4% of 30-day active users were also 7-day active users",
        providerParam: "wauPerMau",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "screen_page_views_per_session",
        label: "Screen page views per session",

        description:
          "The number of app screens or web pages your users viewed per session. Repeated views of a single page or screen are counted. (screen_view + page_view events) / sessions",
        providerParam: "screenPageViewsPerSession",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "screen_page_views",
            aggregation: "sum",
          },
          {
            value: "sessions",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "screen_page_views_per_user",
        label: "Screen page views per user",

        description:
          "The number of app screens or web pages your users viewed per user. Repeated views of a single page or screen are counted. (screen_view + page_view events) / sessions",
        providerParam: "screenPageViewsPerUser",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "screen_page_views",
            aggregation: "sum",
          },
          {
            value: "active_users",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "scrolled_users",
        label: "Scrolled users",

        description:
          "The number of unique users who scrolled down at least 90% of the page.",
        providerParam: "scrolledUsers",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
    ],
  },
  {
    label: "Event",
    value: "event_metrics",
    children: [
      {
        value: "conversions",
        label: "Conversions",
        description:
          "The count of conversion events. Events are marked as conversions at collection time; changes to an events conversion marking apply going forward. You can mark any event as a conversion in Google Analytics, and some events (i.e. first_open, purchase) are marked as conversions by default.",
        providerParam: "conversions",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "key_events",
        label: "Key events",
        description:
          "The count of key events. Marking an event as a key event affects reports from time of creation. It doesn't change historic data. You can mark any event as key in Google Analytics, and some events (such as first_open or purchase) are marked as key events by default.",
        providerParam: "keyEvents",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "event_count",
        label: "Event count",
        description: "The count of events",
        providerParam: "eventCount",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "event_count_per_user",
        label: "Events count per user",
        description:
          "The average number of events per user (Event count divided by Active users)",
        providerParam: "eventCountPerUser",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "events_per_session",
        label: "Events per session",
        description:
          "The average number of events per session (Event count divided by Sessions)",
        providerParam: "eventsPerSession",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "event_value",
        label: "Event value",
        description: 'The sum of the event parameter named "value"',
        providerParam: "eventValue",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "purchase_revenue",
        label: "Purchase revenue",
        description:
          "The sum of revenue from purchases made in your app or site. Purchase revenue sums the revenue for these events: purchase, ecommerce_purchase, in_app_purchase, app_store_subscription_convert, and app_store_subscription_renew",
        providerParam: "purchaseRevenue",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "gross_purchase_revenue",
        label: "Gross purchase revenue",
        description:
          "The count of transaction events with purchase revenue. Transaction events are in_app_purchase, ecommerce_purchase, purchase, app_store_subscription_renew, app_store_subscription_convert, and refund",
        providerParam: "grossPurchaseRevenue",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "transactions",
        label: "Transactions",
        description:
          "The count of transaction events with purchase revenue. Transaction events are in_app_purchase, ecommerce_purchase, purchase, app_store_subscription_renew, app_store_subscription_convert, and refund",
        providerParam: "transactions",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "average_revenue_per_user",
        label: "Average revenue per user",
        description:
          "Average revenue per user (ARPU) is the total purchase revenue per active user. The summary metric is for the time period selected",
        providerParam: "averageRevenuePerUser",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "average_purchase_revenue_per_paying_user",
        label: "Average revenue per paying user",
        description:
          "Average revenue per paying user (ARPPU) is the total purchase revenue per active user that logged a purchase event. The summary metric is for the time period selected",
        providerParam: "averagePurchaseRevenuePerPayingUser",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "average_purchase_revenue_per_user",
        label: "Average purchase revenue per user",
        description:
          "The average purchase revenue per active user is the total purchase revenue per active user that logged any event. The summary metric is for the time period selected.",
        providerParam: "averagePurchaseRevenuePerUser",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "AVG",
      },
      {
        value: "total_ad_revenue",
        label: "Ad revenue",
        description:
          "The total advertising revenue from both Admob and third-party sources",
        providerParam: "totalAdRevenue",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "total_revenue",
        label: "Revenue",
        description:
          "The sum of revenue from purchases, subscriptions, and advertising (Purchase revenue plus Subscription revenue plus Ad revenue)",
        providerParam: "totalRevenue",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "first_time_purchaser_conversion_rate",
        label: "First time purchaser conversion rate",

        description:
          "The percentage of active users who made their first purchase. This metric is returned as a fraction; for example, 0.092 means 9.2% of active users were first time purchasers",
        providerParam: "firstTimePurchaserConversionRate",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "first_time_purchasers",
            aggregation: "sum",
          },
          {
            value: "total_users",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "first_time_purchasers_per_new_user",
        label: "First time purchasers per new user",

        description: "The average number of first time purchasers per new user",
        providerParam: "firstTimePurchasersPerNewUser",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "first_time_purchasers",
            aggregation: "sum",
          },
          {
            value: "new_users",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "purchaser_conversion_rate",
        label: "Purchaser conversion rate",

        description:
          "The percentage of active users who made 1 or more purchase transactions. This metric is returned as a fraction; for example, 0.412 means 41.2% of users were purchasers",
        providerParam: "purchaserConversionRate",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "total_purchasers",
            aggregation: "sum",
          },
          {
            value: "total_users",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "session_conversion_rate",
        label: "Session conversion rate",
        description:
          "The percentage of sessions in which any conversion event was triggered",
        providerParam: "sessionConversionRate",
        providerEndpoint: "runReport",
        isAggregatable: false, // No formula, field for sessions in in which any conversion event was triggered was not found.
        aggregationType: "SUM",
      },
      {
        value: "session_key_event_rate",
        label: "Session key event rate",
        description:
          "The percentage of sessions in which any key event was triggered.",
        providerParam: "sessionKeyEventRate",
        providerEndpoint: "runReport",
        isAggregatable: false, // No formula, field for sessions in in which any conversion event was triggered was not found.
        aggregationType: "SUM",
      },
      {
        value: "transactions_per_purchaser",
        label: "Transactions per purchaser",

        description: "The average number of transactions per purchaser",
        providerParam: "transactionsPerPurchaser",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "transactions",
            aggregation: "sum",
          },
          {
            value: "total_purchasers",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "user_conversion_rate",
        label: "User conversion rate",
        description:
          "The percentage of users who triggered any conversion event",
        providerParam: "userConversionRate",
        providerEndpoint: "runReport",
        isAggregatable: false, // No formula, field for user Who rigger conversion event.
        aggregationType: "AVG",
      },
      {
        value: "user_key_event_rate",
        label: "User key event rate",
        description: "The percentage of users who triggered any key event.",
        providerParam: "userKeyEventRate",
        providerEndpoint: "runReport",
        isAggregatable: false, // No formula, field for user Who rigger conversion event.
        aggregationType: "AVG",
      },
      {
        value: "purchase_to_view_rate",
        label: "Purchase to view rate",

        description:
          "The number of users who purchased a product(s) divided by the number of users who viewed the same product(s). This metric is returned as a fraction; for example, 0.128 means 12.8% of users that viewed a product(s) also purchased the same product(s)",
        providerParam: "purchaseToViewRate",
        providerEndpoint: "runReport",
        isAggregatable: false, // No formula, no fields found for user purchased a same product
        aggregationType: "SUM",
      },
      {
        value: "return_on_ad_spend",
        label: "Return on ad spend",

        description:
          "Return On Ad Spend (ROAS) is total revenue divided by advertiser ad cost",
        providerParam: "returnOnAdSpend",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          {
            value: "total_revenue",
            aggregation: "sum",
          },
          {
            value: "advertiser_ad_cost",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "average_purchase_revenue",
        label: "Average purchase revenue",
        description:
          "The average purchase revenue in the transaction group of events",
        providerParam: "averagePurchaseRevenue",
        providerEndpoint: "runReport",
        isAggregatable: false, // NO field for total number of users on your site/app during that time.
        aggregationType: "AVG",
      },
      {
        value: "promotion_clicks",
        label: "Promotion clicks",

        description:
          "The number of times an item promotion was clicked. This metric counts the occurrence of the 'select_promotion' event.",
        providerParam: "promotionClicks",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "promotion_views",
        label: "Promotion views",

        description:
          "The number of times an item promotion was viewed. This metric counts the occurrence of the 'select_promotion' event.",
        providerParam: "promotionViews",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
    ],
  },
  {
    label: "Ads",
    value: "ads_metrics",
    children: [
      {
        value: "ad_unit_exposure",
        label: "Ad unit exposure",
        description:
          "The time that an ad unit was exposed to a user, in milliseconds",
        providerParam: "adUnitExposure",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "publisher_ad_clicks",
        label: "Publisher ad clicks",
        description: "The number of ad_click events",
        providerParam: "publisherAdClicks",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "publisher_ad_impressions",
        label: "Publisher ad impressions",
        description: "The number of ad_impression events",
        providerParam: "publisherAdImpressions",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "advertiser_ad_clicks",
        label: "Advertiser Ad Clicks",

        description:
          "Total number of times users have clicked on an ad to reach the property. Includes clicks from linked integrations like linked Search Ads 360 advertisers. Also includes uploaded clicks from data import",
        providerParam: "advertiserAdClicks",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "advertiser_ad_cost",
        label: "Advertiser ad cost",
        description:
          "The total amount you paid for your ads. Includes costs from linked integrations like linked Google Ads accounts. Also includes uploaded cost from data import",
        providerParam: "advertiserAdCost",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "advertiser_ad_cost_per_click",
        label: "Advertiser ad cost per click",
        description:
          "Ads cost per click is ad cost divided by ad clicks and is often abbreviated CPC",
        providerParam: "advertiserAdCostPerClick",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          { value: "advertiser_ad_cost", aggregation: "sum" },
          {
            value: "advertiser_ad_clicks",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "advertiser_ad_cost_per_conversion",
        label: "Advertiser ad cost per conversion",
        description: "Cost per conversion is ad cost divided by conversions",
        providerParam: "advertiserAdCostPerConversion",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          { value: "advertiser_ad_cost", aggregation: "sum" },
          {
            value: "conversions",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "advertiser_ad_cost_per_key_event",
        label: "Advertiser ad cost per key event",
        description: "Cost per key event is ad cost divided by key events.",
        providerParam: "advertiserAdCostPerKeyEvent",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          { value: "advertiser_ad_cost", aggregation: "sum" },
          {
            value: "key_events",
            aggregation: "sum",
          },
        ],
      },
      {
        value: "advertiser_ad_impressions",
        label: "Advertiser ad impressions",

        description:
          "The total number of impressions. Includes impressions from linked integrations like linked Display & Video 360 advertisers. Also includes uploaded impressions from data import.",
        providerParam: "advertiserAdImpressions",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "organic_google_search_average_position",
        label: "Organic google search average position",

        description:
          "The average ranking of your website URLs for the query reported from Search Console. For example, if your site's URL appears at position 3 for one query and position 7 for another query, the average position would be 5 (3+7/2). This metric requires an active Search Console link",
        providerParam: "organicGoogleSearchAveragePosition",
        providerEndpoint: "runReport",
        isAggregatable: false,
        aggregationType: "SUM",
      },
      {
        value: "organic_google_search_click_through_rate",
        label: "Organic google search click through rate",

        description:
          "The organic Google Search click through rate reported from Search Console. Click through rate is clicks per impression. This metric is returned as a fraction; for example, 0.0588 means about 5.88% of impressions resulted in a click. This metric requires an active Search Console link",
        providerParam: "organicGoogleSearchClickThroughRate",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "CUSTOM",
        formula: [
          "division",
          { value: "organic_google_search_clicks", aggregation: "sum" },
          { value: "organic_google_search_impressions", aggregation: "sum" },
        ],
      },
      {
        value: "organic_google_search_clicks",
        label: "Organic google search clicks",

        description:
          "The number of organic Google Search clicks reported from Search Console. This metric requires an active Search Console link",
        providerParam: "organicGoogleSearchClicks",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
      {
        value: "organic_google_search_impressions",
        label: "Organic google search impressions",

        description:
          "The number of organic Google Search impressions reported from Search Console. This metric requires an active Search Console link",
        providerParam: "organicGoogleSearchImpressions",
        providerEndpoint: "runReport",
        isAggregatable: true,
        aggregationType: "SUM",
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div style={{ width: 300, margin: "0 auto" }}>
      <h1>Tree Select Component</h1>
      <TMRTreeSelect treeData={treeData} value={value} onChange={setValue} />
    </div>
  );
};

export default App;
