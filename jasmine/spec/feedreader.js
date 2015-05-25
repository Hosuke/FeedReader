/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('and every URL is defined and not empty', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('and each feed has a non-empty name', function(){
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });
    });


    /* a new test suite named "The menu" */
    describe('The menu', function() {
        var body = $('body');
        var icon = $('a.menu-icon-link');
        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('and it toggles visibility when the icon is clicked', function () {
            // make sure it hides initially
            expect(body.hasClass('menu-hidden')).toBe(true);
            // first click shows the menu
            icon.trigger('click');
            expect(body.hasClass('menu-hidden')).not.toBe(true);
            // and second click hide the menu
            icon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {


        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            // spy will still track all calls to loadFeed
            spyOn(window, 'loadFeed').and.callThrough();
            // and pass done as callback to loadFeed
            loadFeed(0, done);
        });

        it('the loadFeed function is called', function() {
            expect(window.loadFeed).toHaveBeenCalled();
        });

        it('and there is at least one .entry within the .feed', function() {
            // ensure .feed exist
            expect($('.feed').length === 0).not.toBe(true);
            // there is at least an entry under feed
            expect($.contains($('.feed')[0], $('.entry-link')[0])).toBe(true);
            // there is at least one .entry
            expect($('.entry').length === 0).not.toBe(true);
        });
    });

    /* a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var self = this;
        self.udacityBlogFeeds = '';
        self.cssTrickFeeds = '';

        beforeEach(function(done) {
            spyOn(window, 'loadFeed').and.callThrough();
            // This time is loads the feeds from Udacity blog
            loadFeed(0, done);
        });

        it('loadFeed(0) has been called and feeds are loaded', function() {
            expect(window.loadFeed).toHaveBeenCalledWith(0, jasmine.any(Function));
            // store the feeds to udacityBlogFeeds
            self.udacityBlogFeeds = $('.feed').html();
            // and it is not empty
            expect(self.udacityBlogFeeds).not.toBe('');
        });

        // now we load another feed
        describe('Another new feed', function() {

            beforeEach(function (done) {
                // This time is loads the feeds from CSS Tricks
                loadFeed(1, done);
            });

            it('is loaded', function() {
                expect(window.loadFeed).toHaveBeenCalledWith(1, jasmine.any(Function));
                // store the feeds to cssTrickFeeds
                self.cssTrickFeeds = $('.feed').html();
                // and it is not empty
                expect(self.cssTrickFeeds).not.toBe('');

            });

            it('and is different from the first one', function () {
                expect(self.udacityBlogFeeds).not.toEqual(self.cssTrickFeeds);
            });
        });
    });
}());
