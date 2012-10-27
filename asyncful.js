/*
 * Asyncful v0.6 2012-06-11 03:30:14 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by-sa/3.0
 * more on http://github.com/haggen/asyncful
 */
(function($) {
  $.fn.asyncful = function(options) {
    return this.each(function() {
      var form;

      form = $(this);

      // Form's native method does not trigger submit event,
      // so let's replace it with another one that does.
      this.submit = function() {
        form.submit();
      };

      form.on('submit', function(e) {
        var enctype, frame, frameName;

        enctype = form.attr('enctype') || '';

        if(enctype.toLowerCase() === 'multipart/form-data') {
          frame = $('<iframe></iframe>');

          frameName = 'frame-' + Math.random().toString(36).slice(2);

          frame
            .attr('name', frameName)
            .attr('style', 'width:0;height:0;margin:0;border:0;padding:0;float:left')
            .on('load', function() {
              var contents = $(this).contents().find('body').text();

              if(options && options.complete) {
                options.complete.apply(form[0], [contents]);
              } else {
                try {
                  eval(contents);
                } catch(e) {}
              }
            });

          form
            .before(frame)
            .attr('target', frameName);
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
})(window.jQuery);
