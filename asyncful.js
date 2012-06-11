/*
 * Asyncful v0.6 2012-06-11 03:30:14 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by-sa/3.0
 * more on http://github.com/haggen/asyncful
 */
(function($) {
  $.fn.asyncful = function(options) {
    return this.each(function() {
      var self;

      self = $(this);

      // Form's native submit method does not trigger the event,
      // so let's replace it with another that does
      this.submit = function() {
        self.submit();
      }

      self.on('submit', function(e) {
        var enctype, frame, frameName;

        enctype = self.attr('enctype') || '';

        if(enctype.toLowerCase() === 'multipart/form-data') {
          frame = $('<iframe></iframe>');

          frameName = 'frame-' + Math.random().toString(36).slice(2);

          frame
            .attr('name', frameName)
            .attr('style', 'width:0;height:0;margin:0;border:0;padding:0;float:left')
            .on('load', function() {
              try {
                eval($(this).contents().find('body').text());
              } catch(e) {}
            });

          self.before(frame);

          self.attr('target', frameName)
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

          return false;
        }
      });
    });
  };
})(jQuery);
