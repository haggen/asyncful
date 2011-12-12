/*
 * Asyncful v1.0
 * by Arthur Corenzan <arthur@corenzan.com>
 * license under http://creativecommons.org/licenses/by-sa/3.0
 * more on http://github.com/haggen/asyncful
 */
(function($) {
  $.fn.asyncful = function(settings) {

    //let it chainable
    return this.each(function() {

      //replace regular submit with ajax
      $(this).bind('submit', function(e) {
        e.preventDefault();

        settings = $.extend(settings, {
          url: this.action, 
          type: this.method, 
          data: $(this).serialize(),
          context: this,
        });

        $.ajax(settings);
      });
    });
  };

  //enable AJAX for <form> with data-async attribute
  $(function() {
    $('form[data-async]').asyncful();
  });
})(jQuery);
