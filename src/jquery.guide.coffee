(($) ->
	$.guide = (options) ->
		guide = new jQueryGuide()
		guide.addAction action for action in options.actions if options.actions != undefined
		guide.buildLayout()
		
		guide.layout.bg.click => guide.next()
		$(window).resize => guide.draw()
		$(window).scroll => guide.draw()
		guide.execAction()
		guide

	class jQueryGuide
		constructor: ->
			this.layout = {container: '', bg: '', content: ''}
			this.step = {current: 0, status: 0}
			this.actionList = []

		buildLayout: ->
			layoutId = Math.round(Math.random()*10000)
			layout = $('<div class="jquery-guide" id="jQueryGuide' + layoutId + '"><div class="jquery-guide-bg"></div><div class="jquery-guide-content"></div></div>')
			$('html>body').append(layout)
			this.layout.container = $('#jQueryGuide' + layoutId)
			this.layout.bg = this.layout.container.find('>.jquery-guide-bg')
			this.layout.content = this.layout.container.find('>.jquery-guide-content')

		addAction: (action) ->
			this.action.content = "" if action.content == undefined
			action.offsetX = 0  if action.offsetX == undefined
			action.offsetY = 0  if action.offsetY == undefined
			action.isBeforeFuncExec = false if action.isBeforeFuncExec == undefined
			this.actionList.push(action)

		execAction: ->
			action = this.actionList[this.step.current]
			if this.step.status == 0
				this.step.status = 1
				action.beforeFunc(this) if action.beforeFunc != undefined
				return if action.isBeforeFuncExec
			this.step.status = 2
			this.animate()
			if action.successFunc != undefined
				this.step.status = 3
				action.successFunc(this)

		back: ->
			if his.step.current == 0
				this.exit()
				return false
			this.step = {current: --this.step.current, status: 0}
			this.execAction()
			return true

		next: ->
			if this.step.current + 1 == this.actionList.length
				this.exit()
				return false
			this.step = {current: ++this.step.current, status: 0}
			this.execAction()
			return true

		exit: ->
			this.layout.container.remove()

		animate: ->
			action = this.actionList[this.step.current]
			scrollTop = $(window).scrollTop()
			bgScrollTop = action.element.offset().top - scrollTop
			bgTopWidth = if bgScrollTop > 0 then bgScrollTop else 0
			bgBottomWidth = if (bgScrollTop + action.element.innerHeight()) > 0 then $(window).innerHeight() - (action.element.innerHeight() + bgScrollTop) else $(window).innerHeight()
			this.layout.bg.animate({
				width: action.element.innerWidth(),
				height: action.element.innerHeight() + (if bgScrollTop < 0 then bgScrollTop else 0),
				borderTopWidth: bgTopWidth,
				borderRightWidth: $(window).innerWidth() - action.element.offset().left - action.element.innerWidth() + 1,
				borderBottomWidth: bgBottomWidth,
				borderLeftWidth: action.element.offset().left
			}, =>
				this.layout.content.html(action.content)
				this.layout.content.css({top: action.element.offset().top + action.offsetY, left: action.element.offset().left + action.offsetX})
			)

		draw: ->
			action = this.actionList[this.step.current]
			scrollTop = $(window).scrollTop()
			bgScrollTop = action.element.offset().top - scrollTop
			bgTopWidth =  if bgScrollTop > 0 then bgScrollTop else 0
			bgBottomWidth = if (bgScrollTop + action.element.innerHeight()) > 0 then $(window).innerHeight() - (action.element.innerHeight() + bgScrollTop) else $(window).innerHeight()
			this.layout.bg.css({
				width: action.element.innerWidth(),
				height: action.element.innerHeight() + (if bgScrollTop < 0 then bgScrollTop else 0),
				borderTopWidth: bgTopWidth,
				borderRightWidth: $(window).innerWidth() - action.element.offset().left - action.element.innerWidth(),
				borderBottomWidth: bgBottomWidth,
				borderLeftWidth: action.element.offset().left
			})
			this.layout.content.css({top: action.element.offset().top + action.offsetY, left: action.element.offset().left + action.offsetX})

) jQuery

