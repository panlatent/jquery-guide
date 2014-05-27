/**
 * jQuery.Guide.js
 *
 * @link    https://github.com/panlatent/jquery-guide
 * @author  panlatent@gmail.com
 * @version 1.0.1
 */

;(function($) {

$.guide = function(options) {
	var guide = new jQueryGuide();
	if (options.actions !== undefined) {
		for (i in options.actions) {
			guide.addAction(options.actions[i]);
		}
	}

	guide.buildLayout();
	
	$(guide.layout.bg).on('click', function() {
		guide.next();
	});
	$(window).on('resize', function() {
		guide.draw();
	}).on('scroll', function() {
		guide.draw();
	});

	guide.execAction();
	return guide;
};

function jQueryGuide() {

	this.layout = {
		container: '',
		bg: '',
		content: ''
	};

	this.step = {
		current: 0,
		status: 0
	}

	this.actionList = new Array();
};

jQueryGuide.prototype.buildLayout = function() {
	var layoutId = Math.round(Math.random()*10000);
	var layout = $('<div class="jquery-guide" id="jQueryGuide' + layoutId + '"><div class="jquery-guide-bg"></div><div class="jquery-guide-content"></div></div>');
	$('html>body').append(layout);
	this.layout.container = $('#jQueryGuide' + layoutId);
	this.layout.bg = this.layout.container.find('>.jquery-guide-bg');
	this.layout.content = this.layout.container.find('>.jquery-guide-content');
};

jQueryGuide.prototype.addAction = function(action) { //element, content, offsetX, offsetY, beforeFunc, isBeforeFuncExec, successFunc
	if (action.content === undefined) {
		action.content = "";
	}
	if (action.offsetX === undefined) {
		action.offsetX = 0;
	}
	if (action.offsetY === undefined) {
		action.offsetY = 0;
	}
	if (action.isBeforeFuncExec === undefined) {
		action.isBeforeFuncExec = false;
	}
	this.actionList.push(action);
};

jQueryGuide.prototype.execAction = function() {
	var action = this.actionList[this.step.current];
	if (this.step.status == 0) {
		this.step.status = 1;
		if (action.beforeFunc !== undefined) {
			action.beforeFunc(this);
		}
		if (action.isBeforeFuncExec == true)
			return;
	}

	this.step.status = 2;
	this.animate();
	if (action.successFunc !== undefined) {
		this.step.status = 3;
		action.successFunc(this);
	}
};

jQueryGuide.prototype.back = function() {
	if (this.step.current == 0) {
		this.exit();
		return false;
	}
	this.step = {
		current: --this.step.current,
		status: 0
	};
	this.execAction();
	return true;
};

jQueryGuide.prototype.next = function() {
	if (this.step.current + 1 == this.actionList.length) {
		this.exit();
		return false;
	}
	this.step = {
		current: ++this.step.current,
		status: 0
	};
	this.execAction();
	return true;
};

jQueryGuide.prototype.exit = function() {
	this.layout.container.remove();
};

jQueryGuide.prototype.animate = function() {
	var guide = this;
	var action = this.actionList[this.step.current];
	var scrollTop = $(window).scrollTop();
	var bgScrollTop = action.element.offset().top - scrollTop;
	var bgTopWidth =  bgScrollTop > 0 ?  bgScrollTop : 0;
	var bgBottomWidth = (bgScrollTop + action.element.innerHeight()) > 0 ? $(window).innerHeight() - (action.element.innerHeight() + bgScrollTop) : $(window).innerHeight();
	this.layout.bg.animate({
		width: action.element.innerWidth(),
		height: action.element.innerHeight() + (bgScrollTop < 0 ? bgScrollTop : 0),
		borderTopWidth: bgTopWidth,
		borderRightWidth: $(window).innerWidth() - action.element.offset().left - action.element.innerWidth() + 1, //Add 1 to prevent the screen right edge jitter
		borderBottomWidth: bgBottomWidth,
		borderLeftWidth: action.element.offset().left
	}, function() {
		guide.layout.content.html(
			action.content
		);
		guide.layout.content.css({
			top: action.element.offset().top + action.offsetY,
			left: action.element.offset().left + action.offsetX
		});
	});
};

jQueryGuide.prototype.draw = function() {
	var action = this.actionList[this.step.current];
	var scrollTop = $(window).scrollTop();
	var bgScrollTop = action.element.offset().top - scrollTop;
	var bgTopWidth =  bgScrollTop > 0 ?  bgScrollTop : 0;
	var bgBottomWidth = (bgScrollTop + action.element.innerHeight()) > 0 ? $(window).innerHeight() - (action.element.innerHeight() + bgScrollTop) : $(window).innerHeight();
	this.layout.bg.css({
		width: action.element.innerWidth(),
		height: action.element.innerHeight() + (bgScrollTop < 0 ? bgScrollTop : 0),
		borderTopWidth: bgTopWidth,
		borderRightWidth: $(window).innerWidth() - action.element.offset().left - action.element.innerWidth(),
		borderBottomWidth: bgBottomWidth,
		borderLeftWidth: action.element.offset().left
	});
	this.layout.content.css({
		top: action.element.offset().top + action.offsetY,
		left: action.element.offset().left + action.offsetX
	});
};

})(jQuery);