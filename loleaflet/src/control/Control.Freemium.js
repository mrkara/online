/* -*- js-indent-level: 8; fill-column: 100 -*- */
/*
 * Freemium handler
 */

/* global $ vex */
L.Map.include({

	_freemiumBlacklistUNO: [
		'.uno:DataDataPilotRun',
		'.uno:RecalcPivotTable',
		'.uno:DeletePivotTable',
		'.uno:SamplingDialog',
		'.uno:DescriptiveStatisticsDialog',
		'.uno:AnalysisOfVarianceDialog',
		'.uno:CorrelationDialog',
		'.uno:CovarianceDialog',
		'.uno:ExponentialSmoothingDialog',
		'.uno:MovingAverageDialog',
		'.uno:RegressionDialog',
		'.uno:TTestDialog',
		'.uno:FTestDialog',
		'.uno:ZTestDialog',
		'.uno:ChiSquareTestDialog',
		'.uno:FourierAnalysisDialog',
		'.uno:Validation',
		'.uno:DataFilterSpecialFilter',
		'.uno:TrackChanges',
		'.uno:AcceptTrackedChanges',
		'.uno:InsertReferenceField',
		'.uno:Watermark',
		'.uno:InsertIndexesEntry',
		'.uno:InsertAuthoritiesEntry',
		'.uno:InsertMultiIndex',
	],

	_freemiumBlacklistActionId: [
		'downloadas-epub',
		'downloadas-rtf',
	],


	// We mark the element disabled for the freemium
	// and add overlay on the element
	disableFreemiumItem: function(item, DOMParentElement) {
		if (this['wopi']._isFreemiumUser()
		&& (this._freemiumBlacklistUNO.includes(item.uno)
		|| this._freemiumBlacklistActionId.includes(item.id))) {
			$(DOMParentElement).data('freemiumBlocked', true);
			$(DOMParentElement).addClass('freemium-disabled');

			var overlay = L.DomUtil.create('div', 'freemium-overlay', DOMParentElement);
			var lock = L.DomUtil.create('img', 'freemium-overlay-lock', overlay);

			lock.src = 'images/lc_freeemiumlock.svg';

			var that = this;
			$(overlay).click(function(event) {
				event.stopPropagation();
				that.openSubscriptionPopup();
			});
		}
	},

	disableFreemiumNote: function(item, DOMParentElement, buttonToDisable) {
		if (this['wopi']._isFreemiumUser()
		&& (this._freemiumBlacklistUNO.includes(item.command)
		|| this._freemiumBlacklistActionId.includes(item.id))) {
			$(DOMParentElement).data('freemiumBlocked', true);
			$(DOMParentElement).addClass('freemium-disabled');
			$(buttonToDisable).off('click');

			var overlay = L.DomUtil.create('div', 'freemium-overlay-notebookbar', DOMParentElement);
			var lock = L.DomUtil.create('img', 'freemium-overlay-lock-notebookbar', overlay);
			lock.src = 'images/lc_freeemiumlock.svg';

			var that = this;
			$(overlay).click(function(event) {
				event.stopPropagation();
				that.openSubscriptionPopup();
			});
		}
	},

	openSubscriptionPopup: function() {
		vex.dialog.open({
			message: 'Select Subscription plan'
		});
	}

});
