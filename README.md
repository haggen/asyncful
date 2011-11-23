Ajaxius - AJAX forms made easy
==============================

jQuery plugin to validate forms, and make them work with AJAX.

Licensed under Creative Commons-Attribution-Share Alike.
http://creativecommons.org/licenses/by-sa/3.0

Example
-------

    <form method="post" action="awesome.php">
      <input type="text" pattern="\d+" data-message="You should use only numbers.">
    </form>

    <script>
      $('form').ajaxius(function(response) {
        alert(response);
      });
    </script>

Parameters
----------

You can pass only one function, to act as success callback, receiving the AJAX response as only argument. Or you can pass a hash of options, as follow:

- `enabled`: `boolean`, tell whether to use ajax, default is true
- `validations`: `hash`, where keys are the input names, and values are arrays with pattern, message and, optionally, pre sanitization
- `success`: `function`, success callback function, will receive ajax response as only argument
- `error`: `function`, error event callback, will receive status error code
- `message`: `function`, error message placement callback, will receive invalid input and error message

Every parameter fall back to default value if not given.