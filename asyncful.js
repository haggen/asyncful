/*
 * Asyncful v0.6 2012-06-11 01:36:10 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by-sa/3.0
 * more on http://github.com/haggen/asyncful
 */
(function($) {
  $.fn.asyncful = function(options) {
    return this.on('submit', function(e) {
      var self, iframe, uid;

      self = $(this);

      if(self.attr('enctype').toLowerCase() === 'multipart/form-data') {
        iframe = $('<iframe></iframe>');

        uid = Math.random().toString(36).slice(2);

        iframe.attr('name', 'frame' + uid);
        iframe.attr('style', 'width:0;height:0;margin:0;border:0;padding:0');

        iframe.on('load', function() {
          try {
            eval(this['document'] !== undefined ?
              this.document.body.innerHTML : this.contentDocument.body.innerHTML);
          } catch(e) {}
        });

        self.before(iframe);

        self.attr('target', 'frame' + uid)
      } else {
        options = $.extend(options, {
          url: this.action, 
          type: this.method, 
          dataType: 'script',
          data: $(this).serialize(),
          context: this
        });

        e.preventDefault();
        $.ajax(options);
      }
    });
  };
})(jQuery);
