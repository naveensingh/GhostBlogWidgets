/*!
 * @package ghost.latestposts.js
 * @version 0.1.0
 * @Copyright (C) 2015 Naveen Singh (contact@naveensingh.net)
 * @License MIT
 */
;(function($) {

    var get_latest_post_defaults = {
        feed: '/rss',
        titleClass: '.post-title',
        tagsClass: '.post-meta',
        limit: 5,
        debug: false
    };


    function GetLatestPosts(element, options) {
        this.element = element;
        this.options = $.extend({}, get_latest_post_defaults, options);
        this.parseRss();
    }

    GetLatestPosts.prototype.displayRelated = function(posts) {
        var self = this, count = 0;

        posts.forEach(function(post) {
            if (count < self.options.limit) {
                $(self.element).append($('<li><a href="' + post.url +'">' + post.title + '</a></li>'));
            }
            count++;
        });
    };

    GetLatestPosts.prototype.parseRss = function(pageNum, prevId, feeds) {

        var page = pageNum || 1,
            prevId = prevId || '',
            feeds = feeds || [],
            self = this;

        $.ajax({
            url: this.options.feed + '/' + page,
            type: 'GET'
        })
            .done(function(data) {

                var curId = $(data).find('item > guid').text();

                if (curId != prevId) {
                    feeds.push(data);
                    self.parseRss(page+1, curId, feeds);
                } else {
                    var posts = self.getPosts(feeds);
                    self.displayRelated(posts);
                }

            })
            .fail(function(e) {
                self.reportError(e);
            });

    };

    GetLatestPosts.prototype.getCurrentPostTitle = function(titleClass) {

        if (titleClass[0] != '.') {
            titleClass = '.' + titleClass;
        }

        var postTitle = $(titleClass).text();

        if (postTitle.length < 1) {
            this.reportError("Couldn't find the post title with class: " + titleClass);
        }

        return postTitle;
    };

    GetLatestPosts.prototype.getPosts = function(feeds) {

        var posts = [], items = [];

        feeds.forEach(function(feed) {
            items = $.merge(items, $(feed).find('item'));
        });

        for (var i = 0; i < items.length; i++) {

            var item = $(items[i]);

            if (item.find('title').text() !== this.getCurrentPostTitle(this.options.titleClass)) {

                posts.push({
                    title: item.find('title').text(),
                    url: item.find('link').text()
                });
            }
        }

        if (posts.length < 1) {
            this.reportError("Couldn't find any posts in feed: " + feed);
        }

        console.log(posts);
        return posts;
    };

    GetLatestPosts.prototype.reportError = function(error) {
        if (this.options.debug) {
            $(this.element).append($('<li>' + error + '</li>'));
        }
    };


    $.fn.ghostGetAllPosts = function(options) {
        return this.each(function() {
            new GetLatestPosts(this, options);
        });
    };


})(jQuery);