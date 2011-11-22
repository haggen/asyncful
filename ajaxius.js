/**
* Ajaxius v0.1.8
* jQuery plugin to validate forms, and make them work with AJAX
* by Arthur Corenzan <arthur@corenzan.com>
* Creative Commons-Attribution-Share Alike
* http://creativecommons.org/licenses/by-sa/3.0
*
* Usage:
*
* <form method="post" action="awesome.php">
*   ...
* </form>
*
* <script>
*   $('form').ajaxius(function(response) {
*     alert(response);
*   });
* </script>
*
* Options:
*
* enabled: boolean, tell whether to use ajax, default is true
* validations: hash of arrays where key in the input name, and value is an array: pattern, message[, sanitize]
* success: function, success callback function, will receive ajax response as only argument
* error: function, error event callback, will receive status error code
* message: function, error message placement callback, will receive invalid input and error message
*/
(function($) {
  'use strict';

  $.fn.ajaxius = function(options) {

    //accept one singular argument as success callback
    if(typeof(options) === 'function') {
      options = {success: options}; 
    }

    //or a hash of options
    options = $.extend({

      //set false to skip ajax
      enabled: true,

      //success callback
      success: $.noop,

      //error callback
      error: $.noop,

      //hash for validation
      validations: null,

      //error message placement callback
      message: function($input, message) {
        $input.after('<span class="error-message">' + message + '</span>');
      }

    }, options); 

    //validate given form and build error collection
    var validate = function($form) {

      //error messages collection
      var errors = {}, 

      i, rule, value, $element;

      //build validations from HTML if null is given
      if(options.validations === null) {
        options.validations = {};
        
        $form.find('[pattern]').each(function(i, element) {
          var $element = $(element);
          
          options.validations[element.name] = [
            $element.attr('pattern'),
            $element.data('message'),
            $element.data('sanitize')
          ];
        });
      }

      for(i in options.validations) {
        if(options.validations.hasOwnProperty(i)) {

          rule = options.validations[i];

          //retrive invalid input by name
          $element = $form.find('*[name="' + i + '"]');

          //set input value
          value = $element.val();

          //optional pre sanitization
          if(2 in rule && rule[2] && rule[2].exec) {
            value = value.replace(rule[2], '');
          }

          //apply validation
          if(!value.match(new RegExp(rule[0]))) {
            errors[i] = rule[1];
          }
        }
      }

      return errors;
    },

    ajaxius = function(event) {
      event.preventDefault();

      var i,

      //target form
      $form = $(this), 

      //submit button
      $submit = $form.find(':submit'),

      //validate form
      errors = validate($form);

      //remove previous errors
      $form.find('span.error-message').remove();

      //if no error was found
      if($.isEmptyObject(errors)) {

        //disable submit button
        $submit.attr('disabled', true);

        //use ajax, if it's enabled
        if(options.enabled) {

          //post form
          $.ajax({
            
            //retrieve form method
            type: $form.attr('method'),
            
            //retrieve form action for ajax
            url: $form.attr('action'),
            
            //serialize form inputs
            data: $form.serialize(),
            
            //call success callback, passing the target form and ajax response
            success: function(response) {
              options.success.call($form[0], [response]);
            },
            
            //call error callback, passing the target form and ajax status code
            error: function(jxhr, status) {
              options.error.call($form[0], [status]);
            },
            
            //re-enable submit button
            complete: function() {
              $submit.removeAttr('disabled');
            }
          });
        } else {

          //simply submit the form if ajax is disabled
          $form.submit();

        }
      } else {
        for(i in errors) {
          if(errors.hasOwnProperty(i)) {

            //for each error, call error message placement callback
            options.message($form.find('*[name="' + i + '"]'), errors[i]);
          }
        }

        //set focus on first input with error
        $form.find('.error-message').eq(0).prev('input, select, textarea').focus();
      }
    };

    return this.each(function() {
      $(this).bind('submit.ajaxius', ajaxius); 
    });
  };
})(jQuery);

