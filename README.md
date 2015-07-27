# GhostBlogWidgets

## A collection of most common widgets used in a blog.

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

#### Installation

1. Download the js files and save whichever plugin you want to use it in your theme directory.
2. Include the script below `{{ghost_foot}}` in your themes default.hbs file `<script src="/assets/js/jquery.ghostrelated.min.js"></script>`
```html
{{! Ghost outputs important scripts and data with this tag (jquery is included in ghost_foot) }}
{{ghost_foot}}
```


3. Add an ordered or unordered list with a class identifier (related-posts is the default class identifier) in your post.hbs template file.
```html
    <ul class="related-posts">
    </ul>
    <ul class="mytag-class">
    </ul>
    <ul class="latest-posts">
    </ul>
</footer>
{{/post}}
```

4. Call the ghostrelated plugin on the list class identifier that you created in step 3 somewhere in your main js file
```javascript
$('.related-posts').ghostRelated();
$('.mytag-class').ghostTags();
$('.latest-posts').ghostGetAllPosts();
```


5. Limit:

Limit amount of related posts to be displayed

#### Credits

* Built over [jquery.ghostrelated](https://github.com/danecando/jquery.ghostrelated) - *simple plugin to get related
 posts*
* [Dane Grant](https://github.com/danecando)