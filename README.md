Ajaxius - AJAX forms made easy
==============================

jQuery plugin to validate forms, and make them work with AJAX, by Arthur Corenzan <arthur@corenzan.com>, and licensed under Creative Commons-Attribution-Share Alike [http://creativecommons.org/licenses/by-sa/3.0]

Usage
-----

    <form method="post" action="awesome.php">
      ...
    </form>

    <script>
      $('form').ajaxius(function(response) {
        alert(response);
      });
    </script>

Options
-------

- `enabled`: `boolean`, tell whether to use ajax, default is true
- `validations`: `hash`, where keys are the input names, and values are arrays with pattern, message and, optionally, pre sanitization
- `success`: `function`, success callback function, will receive ajax response as only argument
- `error`: `function`, error event callback, will receive status error code
- `message`: `function`, error message placement callback, will receive invalid input and error message