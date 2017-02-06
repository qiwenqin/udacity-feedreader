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

        it('have URLs defined', function() {
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeTruthy();
			});
        });

        it('have names defined', function() {
			allFeeds.forEach(function(feed){
				expect(feed.name).toBeTruthy();
			});
        });
    });


    describe("The menu", function() {

        it('is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        it('is displayed/hidden when the menu icon is click', function() {
            function click() {
                $('.menu-icon-link').trigger('click');
            }

            //In the case of the menu is hidden when the menu icon is clicked
            if ($("body").hasClass("menu-hidden")) {
                click();
                expect($("body").hasClass("menu-hidden")).toBe(false);
            }

            //In the case of the menu is displayed whenm the menu icon is clicked
            if (!$("body").hasClass("menu-hidden")) {
                click();
                expect($("body").hasClass("menu-hidden")).toBe(true);
            }
        });

    });

   
    describe("Initial Entries", function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('have at least a single .entry within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    describe("New Feed Selection", function() {

		/*Define 2 variables 'contentBefore' and 'contentAfter' to compare difference after selecting new feed selection in the .feed-list */
		var contentBefore,
			contentAfter;
		
        beforeEach(function(done) {
			loadFeed(0, function(){
				contentBefore = $('.entry').html();
				loadFeed(1, function(){
					contentAfter = $('.entry').html();
					done();
				});
			});        
        });

        it('makes content of the .feed container changed', function() {
            expect(contentAfter).not.toBe(contentBefore);
        });

    });

}());