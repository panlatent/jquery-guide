JQuery Guide
============
[![Build Status](https://travis-ci.org/panlatent/jquery-guide.svg)](https://travis-ci.org/panlatent/jquery-guide)

A jQuery plugin that new layout or new features using guide

### View the demo

[http://panlatent.github.io/jquery-guide/](http://panlatent.github.io/jquery-guide/)

### How to use

```html
<script src="jquery.guide.js"></script>
```

```javascript
var guide = $.guide({
	actions: [
		{
			element: $('#domeStartGuideBtn'),
			content: '<p>Welcome, click on the screen at any position to enter the next step</p>',
			offsetX: -140,
			offsetY: 60
		},
		{
			element: $('#domeUsingPanel'),
			content: '<p>How to using...</p>',
			offsetX: -140,
			offsetY: 0,
			beforeFunc: function(g) {
				$('#domeUsingPanel').fadeIn();
			}
		},
		{
			element: $('#domeGithubBtn'),
			content: '<p>Click here to access the project for Github</p>',
			offsetX: 0,
			offsetY: 50,
			isBeforeFuncExec: true,
			beforeFunc: function(g) {
				$('#domeGithubBtn').slideDown(function() {
					g.execAction();
				});
			}
		}
	]
});
```


