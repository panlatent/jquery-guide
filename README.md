jquery-guide
============

A jQuery plugin that new layout or new features using guide

### Version

v1.0.0

### Dome

[http://panlatent.github.io/jquery-guide/](http://panlatent.github.io/jquery-guide/)

### Using

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


