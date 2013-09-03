$(document).ready(function()
{
	var header = '<header>' +
					'<div class="container narrow">' +
						'<h1><img src="img/logo.png" width=30/> Justin Scott</h1>' +
						'<nav>' +
							'<a href="http://www.google.ca">Home</a> / ' +
							'<a href="http://www.google.ca">About</a> / ' +
							'<a href="http://www.google.ca">Projects</a>' +
						'</nav>' +
					'</div>' +
				'</header>';
	$('body').prepend(header);
});