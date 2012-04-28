/**
 * jQuery emoticons plugin (inspired by Texy! emoticons module)
 * -----------------------
 * Displays clickable emoticons next to the textarea
 *
 * Usage:
 * $('textarea.editor').emoticons([options])
 *
 * Available options (defaults set):
 *
 * {
 *	basePath: '/',,
	container: '<div class="emoticons">',
 *	emoticons: {
 *		':-)': 'smile.gif',
 *		':-(': 'sad.gif',
 *		';-)': 'wink.gif',
 *		':-D': 'biggrin.gif',
 *		'8-O': 'eek.gif',
 *		'8-)': 'cool.gif',
 *		':-?': 'confused.gif',
 *		':-x': 'mad.gif',
 *		':-P': 'razz.gif',
 *		':-|': 'neutral.gif'
 *	}
 * }
 *
 * @version 1.0
 * @author  kesspess
 * @see     http://texy.info
 */
(function ($) {

$.fn.extend({
	emoticons: function (o) {
		var $this = $(this),
			$thisDom = $this[0],
			emoticons = {
				':-)': 'smile.gif',
				':-(': 'sad.gif',
				';-)': 'wink.gif',
				':-D': 'biggrin.gif',
				'8-O': 'eek.gif',
				'8-)': 'cool.gif',
				':-?': 'confused.gif',
				':-x': 'mad.gif',
				':-P': 'razz.gif',
				':-|': 'neutral.gif'
			},
			options = $.extend({
				basePath: '/',
				container: '<div class="emoticons">',
				emoticons: emoticons
			}, o),
			$cont = $( options.container );

		$.each(emoticons, function (key, val) {
			$cont.append( $('<img>', {
				src: options.basePath + '/' + val,
				click: function (event) {
					// selection handling
					if (document.selection) {
						$this.focus();
						var selection = document.selection.createRange();
						selection.text = key;
						$this.focus();

					} else if ($thisDom.selectionStart || $thisDom.selectionStart == '0') {
						var startPos = $thisDom.selectionStart,
							endPos = $thisDom.selectionEnd,
							scrollTop = $thisDom.scrollTop;

						$this.val( $this.val().substring(0, startPos) + key + $this.val().substring(endPos, $this.val().length) );
						$this.focus();
						$thisDom.selectionStart = startPos + key.length;
						$thisDom.selectionEnd = startPos + key.length;
						$thisDom.scrollTop = scrollTop;

					} else {
						$this.val( $this.val() + key );
						$this.focus();
					}
				}
			}) );
		});

		$this.after($cont);
		return $this;
	}
});

})(jQuery);