
(function() {
    // Initialize storage objects
    if (!localStorage.offlineAnalytics) {
        localStorage.offlineAnalytics = JSON.stringify({
            totalViews: 0,
            pages: {},
            lastVisit: null
        });
    }

    let analytics = JSON.parse(localStorage.offlineAnalytics);

    // Increment total pageviews
    analytics.totalViews += 1;

    // Increment page-specific views
    let page = location.pathname;
    if (!analytics.pages[page]) analytics.pages[page] = 0;
    analytics.pages[page] += 1;

    // Save last visit timestamp
    analytics.lastVisit = new Date().toISOString();

    // Save back to localStorage
    localStorage.offlineAnalytics = JSON.stringify(analytics);

    // Optional: Log to console
    console.log("=== Offline Analytics ===");
    console.log("Total Pageviews: " + analytics.totalViews);
    console.log("This Page (" + page + ") Views: " + analytics.pages[page]);
    console.log("Last Visit: " + analytics.lastVisit);
})();
