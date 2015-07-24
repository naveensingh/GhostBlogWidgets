# GhostBlogWidgets

A collection of most common widgets used in a blog.

## How it works:

##### Related Posts:
ghost.relatedposts.js parses your blog's rss feed and matches the current post with posts from your blog that have any
tags in common. You will need to attach the plugin to an unordered or ordered list in your template to output the
related posts.

##### Latest Posts:
ghost.latestposts.js is also derived from the same thing but instead of matching tags we do no matching at all, we
just parse the RSS and pull in title and url for the latest post to be displayed in sidebar, footer or any other place
you prefer.

##### Tag Cloud:
ghost.tagcloud.js also based on same concept, in this we parse RSS to pull in only the tags from the posts and build a
url pattern for those tags and display them as a list/cloud whichever way you prefer.



## Credits

* Built over [jquery.ghostrelated](https://github.com/danecando/jquery.ghostrelated) - *simple plugin to get related
 posts*
* [Dane Grant](https://github.com/danecando)