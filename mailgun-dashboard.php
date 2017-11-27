<?php
/*
Plugin Name: Mailgun&#174; Dashboard
Plugin URI: https://wordpress.org/plugins/mailgun-dashboard/
Description: Mailgun&#174; Dashboard for WordPress
Version: 0.1
Author: Konstantinos Galanakis
Author URI: https://github.com/kmgalanakis
Text Domain: mailgun-dashboard
Domain Path: /languages
*/

if (
	defined( 'MAILGUN_DASHBOARD_VERSION' )
	|| ! is_admin()
	|| (
		defined( 'DOING_AJAX' )
		&& DOING_AJAX
	)
) {
	return;
}

define( 'MAILGUN_DASHBOARD_VERSION', '0.1' );

define( 'MAILGUN_DASHBOARD_PATH', dirname( __FILE__ ) );

define( 'MAILGUN_DASHBOARD_URL', plugin_dir_url( __FILE__ ) );

define( 'MAILGUN_DASHBOARD_VIEWS_PATH', dirname( __FILE__ ) . '/application/views' );

define( 'MAILGUN_DASHBOARD_CONTEXT', 'mailgun-dashboard' );

require_once MAILGUN_DASHBOARD_PATH . '/application/bootstrap.php';