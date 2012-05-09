(function($) {


b.Dashboard = b.Base.extend({

	$alerts: null,
	$container: null,
	$widgets: null,

	cols: null,
	colWidth: null,
	widgetIds: null,
	loadingWidget: -1,

	init: function(widgetIds)
	{
		this.$alerts = $('#alerts');
		this.$container = $('#widgets');
		this.$widgets = $();

		// Set the columns
		this.setCols();

		// Start loading the widgets
		this.widgetIds = widgetIds;
		this.loadNextWidget();

		// setup events
		this.addListener(b.$window, 'resize', 'setCols');

		// do the version check
		if (typeof window.getAlerts != 'undefined' && window.getAlerts)
			$.getJSON(getAlertsUrl, $.proxy(this, 'displayAlerts'));
	},

	loadNextWidget: function()
	{
		this.loadingWidget++;
		if (typeof this.widgetIds[this.loadingWidget] != 'undefined')
		{
			var widgetId = this.widgetIds[this.loadingWidget];
			$.get(b.actionUrl+'dashboard/getWidgetHtml', 'widgetId='+widgetId, $.proxy(function(response) {
				var $widget = $(response).css('opacity', 0);
				this.placeWidget($widget);
				$widget.animate({opacity: 1}, 'fast');
				this.$widgets = this.$widgets.add($widget);
				this.loadNextWidget();
			}, this));
		}
	},

	setCols: function()
	{
		var totalCols = Math.floor(this.$container.width() / b.Dashboard.minColWidth);

		if (totalCols !== this.totalCols)
		{
			this.totalCols = totalCols;
			this.refreshCols();
			return true;
		}

		return false;
	},

	refreshCols: function()
	{
		// Detach the widgets before we remove the columns so they keep their events
		this.$widgets.detach();

		// Remove the old columns
		if (this.cols)
		{
			for (var i = 0; i < this.cols.length; i++)
			{
				this.cols[i].remove();
			}
		}

		// Create the new columns
		this.cols = [];
		this.colWidth = Math.floor(10000 / this.totalCols) / 100;

		for (var i = 0; i < this.totalCols; i++)
		{
			this.cols[i] = new Col(this, i);
		}

		// Place the widgets
		for (var i = 0; i < this.$widgets.length; i++)
		{
			this.placeWidget(this.$widgets[i]);
		}
	},

	placeWidget: function(widget)
	{
		var shortestCol = this.getShortestCol();
		shortestCol.addWidget(widget);
	},

	getShortestCol: function()
	{
		var shortestCol, shortestColHeight;

		for (var i = 0; i < this.cols.length; i++)
		{
			var col = this.cols[i],
				colHeight = this.cols[i].getHeight();

			if (typeof shortestCol == 'undefined' || colHeight < shortestColHeight)
			{
				shortestCol = col;
				shortestColHeight = colHeight;
			}
		}

		return shortestCol;
	},

	onWidgetMove: function()
	{
		// update $widgetHandles
		this.getWidgetHandles();

		// Update the z-index's
		for (var i = 0; i < this.dom.$widgetHandles.length; i++)
		{
			// add it to the shortest column
			var widget = this.getWidget(i);
			if (widget)
				widget.elem.css('zIndex', i+1);
		}

		var widget = this.getWidget(this.widgetSort.draggeeIndex);
		if (widget)
		{
			this.refreshCols(true);
		}
	},

	onWidgetRemove: function(event)
	{
		// fade out the handle, and then remove it
		var $handle = $(event.currentTarget).parent(),
			handleHeight = $handle.outerHeight();

		$handle.animate({opacity: 0, marginBottom: -handleHeight}, function() {
			$handle.remove();
		});

		// fade out the widget, and then remove it
		var widget = this.getWidgetFromHandle($handle);
		if (widget)
		{
			var containerOffset = this.$container.offset(),
				widgetOffset = widget.$elem.offset(),
				width = widget.$elem.width();
			widget.$elem.appendTo(this.$container);
			widget.$elem.css({
				position: 'absolute',
				display: 'block',
				zIndex: 0,
				top: widgetOffset.top - containerOffset.top,
				left: widgetOffset.left - containerOffset.left,
				width: width
			});
			widget.$elem.fadeOut($.proxy(function() {
				widget.$elem.remove();
			}, this));
		}

		// remove the handle from $widgetHandles and reset the columns
		var index = $.inArray($handle[0], this.dom.$widgetHandles);
		this.dom.$widgetHandles.splice(index, 1);
		this.refreshCols(true);
	},

	displayAlerts: function(data, textStatus)
	{
		if (data && textStatus == 'success' && data.alerts.length)
		{
			var startHeight = this.$alerts.height(),
				alerts = [];

			// add the alerts w/ opacity:0
			for (var i = 0; i < data.alerts.length; i++)
			{
				var $alert = $('<div class="alert"><p>'+data.alerts[i]+'</p></div>');
				this.$alerts.append($alert);
				$alert.css({opacity: 0});
				$alert.delay((i+1)*b.fx.delay).animate({opacity: 1});
			}

			// make room for them
			var endHeight = this.$alerts.height() + 20;
			this.$alerts.height(startHeight);
			this.$alerts.animate({height: endHeight}, $.proxy(function() {
				this.$alerts.height('auto');
			}, this));
		}
	}
},
{
	minColWidth: 325,
	sidebarWidth: 240
});


var Col = b.Base.extend({

	dashboard: null,
	index: null,

	$outerContainer: null,
	$innerContainer: null,

	init: function(dashboard, index)
	{
		this.dashboard = dashboard;
		this.index = index;

		this.$outerContainer = $('<div class="col" style="width: '+this.dashboard.colWidth+'%"/>').appendTo(this.dashboard.$container);
		this.$innerContainer = $('<div class="col-inner">').appendTo(this.$outerContainer);
	},

	getHeight: function()
	{
		return this.$outerContainer.height();
	},

	addWidget: function(widget)
	{
		this.$innerContainer.append(widget);
	},

	remove: function()
	{
		this.$outerContainer.remove();
	}

});


})(jQuery);
