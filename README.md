# Mimizuku Child Starter Theme

This is a WordPress starter theme of Mimizuku child theme.

* GitHub: https://github.com/inc2734/mimizuku-child/
* Mimizuku: https://github.com/inc2734/mimizuku/

## Requirements
* PHP 5.6+
* WP-CLI
* Composer
* Node.js

## Get started
### Install
```
$ cd /PATH/TO/wp-content/themes
$ git clone https://github.com/inc2734/mimizuku-child.git your-theme-name
$ cd your-theme-name
$ composer install (and auto building)
$ wp theme activate your-theme-name
```

### Update
```
$ cd /PATH/TO/wp-content/themes/your-theme-name
$ composer update inc2734/mimizuku
```

## Directory structure
```
themes/your-theme-name/
├── assets                 # → Built theme assets (never edit)
│   └── js
├── layout
│   ├── wrapper            # → Layout templates
│   ├── header             # → Header templates
│   ├── sidebar            # → Sidebar templates
│   └── footer             # → Footer templates
├── src                    # → Front-end assets
│   ├── js
│   └── stylus
├── composer.json
├── functions.php
├── views
│   ├── archive            # → View templates for archive page
│   ├── content            # → View templates for singular page
│   └── static             # → Static view templates
├── .gitignore
├── gulpfile.js
├── package.json
├── style.css              # → (never edit)
├── style.min.css          # → (never edit)
├── editor-style.css       # → (never edit)
├── editor-style.min.css   # → (never edit)
├── node_modules           # → (never edit)
└── vendor                 # → (never edit)
```

## Layout template

The lyout template requires `<?php $this->view(); ?>`.

## View templates

### In singular page

Mimizuku loading `/views/content/content-{post-type}.php` for the view template.
Loading `/views/content/content.php` when `/views/content/content-{post-type}.php` isn't exists.

### In archive page

Mimizuku loading `/views/archive/archive-{post-type}.php` for the view template.
Loading `/views/content/archive.php` when `/views/archive/archive-{post-type}.php` isn't exists.

### Static view templates

Mimizuku tries to load the view template according to the URL. For example when URL is http://example.com/foo/bar, tries to laod from `/views/static/foo/bar.php`.

## Using view controller
```
$controller = new \Mimizuku\App\Controllers\Controller();
$controller->layout( 'right-sidebar' );
$controller->render( 'content/content', 'news' );
```

## Template tags

### \\Mimizuku\\App\\Tags\\get_template_part()

This is a function which to pass the variables to WordPress's `get_template_part()`.

```
// The caller
\Mimizuku\App\Tags\get_template_part( 'path/to/template-parts', [
	'_foo' => 'bar',
	'_baz' => 'qux',
] );

// The called template. path/to/template-parts.php
<ul>
	<li><?php echo esc_html( $_foo ); // bar ?></li>
	<li><?php echo esc_html( $_baz ); // qux ?></li>
</ul>
```

## Filter hooks

### mimizuku_layout

Filtering layout file.

```
add_filter( 'mimizuku_layout', function( $layout ) {
	return $layout;
} );
```

### mimizuku_view

Filtering view file.

```
add_filter( 'mimizuku_view', function( $view ) {
	return $view;
} );
```

### mimizuku_header

Filtering header layout file.

```
add_filter( 'mimizuku_header', function( $header ) {
	return $header;
} );
```

### mimizuku_sidebar

Filtering sidebar layout file.

```
add_filter( 'mimizuku_sidebar', function( $sidebar ) {
	return $sidebar;
} );
```

### mimizuku_footer

Filtering footer layout file.

```
add_filter( 'mimizuku_footer', function( $footer ) {
	return $footer;
} );
```

### mimizuku_content_width

Filtering `$content_width` of WordPress.

```
add_filter( 'mimizuku_content_width', function( $content_width ) {
	return $content_width;
} );
```

### mimizuku_support_ie9

Filtering loading `basis-ie9.css`.

```
add_filter( 'mimizuku_support_ie9', function( $boolean ) {
	return $boolean;
} );
```

## Shell Scripts

**You need to enable this theme!**

### Start up built-in server
```
# pwd → /PATH/TO/wp-content/themes/your-theme-name
$ bash ../mimizuku/app/bin/server.sh
```

### Import theme unit test data
```
$ composer theme-unit-test
```

### Generate files needed for running PHPUnit tests.
```
$ composer scaffold-tests
```

### Run PHPUnit tests
#### Generate WordPress tests environment and run phpunit
```
$ composer wpphpunit
```

#### Run phpunit only (If WordPress tests environment, auto generating)
```
$ composer phpunit
```
