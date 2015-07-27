;(function($) {

    var get_tag_cloud_defaults = {
        feed: '/rss',
        titleClass: '.post-title',
        tagsClass: '.post-meta',
        limit: 5,
        debug: false
    };


    function GetTagsForAllPosts(element, options) {

        this.element = element;
        this.options = $.extend({}, get_tag_cloud_defaults, options);
        this.parseRss();
    }

    GetTagsForAllPosts.prototype.displayRelated = function(posts) {
        for (var i = 0; i < posts.length; i++) {
            var get_slugged_tag = convertToSlug(posts[i]);
            var temp_string = '<li><a href="'+"http://" + window.location.host + "/tag/" + get_slugged_tag + '">' + posts[i] + '</a></li>';
            $(this.element).append(temp_string);
        }
    };
    function convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    }
    GetTagsForAllPosts.prototype.parseRss = function(pageNum, prevId, feeds) {

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

    GetTagsForAllPosts.prototype.getCurrentPostTags = function(tagsClass) {

        if (tagsClass[0] != '.') {
            tagsClass = '.' + tagsClass;
        }

        var tags = [];
        $(tagsClass + ' a').each(function() {
            tags.push($(this).text());
        });

        if (tags.length < 1) {
            this.reportError("Couldn't find any tags in this post");
        }

        return tags;
    };


    GetTagsForAllPosts.prototype.getPosts = function(feeds) {

        var posts = [], items = [];
        feeds.forEach(function(feed) {
            items = $.merge(items, $(feed).find('item'));
        });

        for (var i = 0; i < items.length; i++) {

            var item = $(items[i]);
            posts.push({
                tags: $.map(item.find('category'), function(elem) {
                    return $(elem).text();
                })
            });
        }
        if (posts.length < 1) {
            this.reportError("Couldn't find any posts in feed");
        }
        var get_all_tags = [];
        $.each(posts, function(index, item){
            var post_tags = item["tags"];
            for (var i = 0; i < post_tags.length; i++) {
                if($.inArray(i, get_all_tags) === -1) get_all_tags.push(post_tags[i]);
            }

        });
        var unique_tags = [];
        $.each(get_all_tags, function(i, el){
            if($.inArray(el, unique_tags) === -1) unique_tags.push(el);
        });
        return unique_tags;
    };

    GetTagsForAllPosts.prototype.reportError = function(error) {
        if (this.options.debug) {
            $(this.element).append($('<li>' + error + '</li>'));
        }
    };


    $.fn.ghostTags = function(options) {

        return this.each(function() {
            new GetTagsForAllPosts(this, options);
        });
    };


})(jQuery);