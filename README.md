# Simple site generator

This is a tiny little site generator built on Node.js.  I wanted something simple, flexible and hackable, but that would also make authoring content and building web assets straightforward and easy.

* [Handlebars](http://handlebarsjs.com/) for templating, with [multiple helpers](https://github.com/helpers/handlebars-helpers) included.
* Markdown for content, either inline via the [{{markdown}}](https://github.com/helpers/handlebars-helpers#markdown) helper, or from a file using the [{{md}}](https://github.com/helpers/handlebars-helpers#md) helper.
* [Less](http://lesscss.org/) for compiling CSS
* [Browserify](http://browserify.org/) for bundling JS, with [babelify](https://github.com/babel/babelify)
* [Imagemin](https://github.com/imagemin/imagemin) for compressing images
* [Express](http://expressjs.com/) server for static files and Handlebars rendering.  Gzip automatically enabled
* A simple dev script which watches source files for changes and rebuilds
* Production mode which minifies CSS and JS

The app uses Express to render templates at request time (which are then cached).  If you would prefer to build static html, that could be accomplished easily - just look at the page iteration step in index.js.

## Config
Application-wide config vars are set in `config.yaml`.  Any constants that want to share across the app can go here.  They also get passed into every page template when it is rendered.

## Building pages
To create a page, simply add a .hbs file in the `src/views` directory.  The path of the .hbs file relative to the `src/views` directory will correspond to its route.  You can nest pages inside subfolders as well.  So a template that lives at `src/views/about/team.hbs` will be accessible via the `/about/team` url.  There are directories in place for partials and layouts.  Handlebars + the powerful helpers library that is included makes for powerful templating, but also allows you to use html if you so choose.

#### Page metadata
At the top of each .hbs page is a Handlebars block comment, inside of which is the page data in yaml format.  For example:
```yaml
{{!--
pageTitle: Tim and Eric Awesome Show
pageSubtitle: Great job
title: Home
sectionName: home
pageIndex: 0
hideInNav: true
--}}
```
All of the page metadata variables get passed into the templating engine.  You can add whichever metadata variables you want.  A special piece of metadata is the `route` variable, which if used will override the route that is used to match a URL to that template.  It gets passed directly to the express router, so you can use wildcards like `about/*` for example.

#### Other rendering data
All pages templates are also passed a `page` array, which contains all of the page objects in the site, including their route and metadata.  This is handy if you want to, say, build a navigation component with all of your pages.

In addition to the page metadata in the yaml block of each file, the rendering engine is passed the global application config variables, along with any query string params on the request or matching route params.

## Developing
In order to keep things simple, there is no build system like Webpack or Gulp, just a simple dev script that watches source files and rebuilds on change.  You can run that via:

```
npm run dev
```

## Production
To build the assets, minify the CSS and JS, and start the server as a [forever](https://github.com/foreverjs/forever) process, run:
```
npm run production
```
