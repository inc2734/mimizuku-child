# Mimizuku Child Starter Theme

This is a WordPress starter theme of Mimizuku child theme.

* GitHub: https://github.com/inc2734/mimizuku-child/
* Mimizuku: https://github.com/inc2734/mimizuku/

## Requirements
* WordPress 4.7
* PHP 5.6+
* WP-CLI
* Composer
* Node.js
* Yarn

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
├── .editorconfig            # → Configulation for editors and IDEs
├── .gitignore               # → Ignored file lists for Git
├── assets                   # → Built theme assets (never edit)
├── composer.json            # → Composer configuration
├── composer.lock            # → Composer lock file (never edit)
├── functions.php            # → The theme setup file.
├── gulpfile.js              # → Gulp configuration
├── node_modules             # → Node.js packages (never edit)
├── package.json             # → Node.js dependencies and scripts
├── README.md
├── src                      # → Front-end assets
├── style.css                # → Theme meta information
├── vendor                   # → Composer packages (never edit)
├── yarn.lock                # → Yarn lock file (never edit)
└── templates
    ├── layout
    │   ├── wrapper          # → Layout templates
    │   ├── header           # → Header templates
    │   ├── sidebar          # → Sidebar templates
    │   └── footer           # → Footer templates
    └── view                 # → View templates
        └── static           # → Static view templates
```

## Layout template

The lyout template requires `<?php $this->view(); ?>`.

## View templates

### In singular page

Mimizuku loading `/templates/view/content-{post-type}.php` for the view template.
Loading `/templates/view/content.php` when `/templates/view/content-{post-type}.php` isn't exists.

### In archive page

Mimizuku loading `/templates/view/archive-{post-type}.php` for the view template.
Loading `/templates/view/archive.php` when `/templates/view/archive-{post-type}.php` isn't exists.

### Static view templates

Mimizuku tries to load the view template according to the URL. For example when URL is http://example.com/foo/bar, tries to laod from `/templates/view/static/foo/bar.php`.

## Using view controller
```
$controller = new Mimizuku_Controller();
$controller->layout( 'right-sidebar' );
$controller->render( 'content', 'news' );
```

## Template tags

### mimizuku_get_template_part()

This is a function which to pass the variables to WordPress's `get_template_part()`.

```
// The caller
mimizuku_get_template_part( 'path/to/template-parts', [
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

## Composer Scripts

### Start up built-in server
```
$ composer server
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

### Run WordPress Coding Standards check, PHPMD, PHPUnit tests
```
$ composer test
```
