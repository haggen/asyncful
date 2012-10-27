# Asyncful

Make AJAX capable forms with ease.

## Features

Asyncful does one thing and does it well. It even works with `multipart` forms (for uploading files) in IE6. Asyncful is lightweight and easy to use.

## Usage

    <form method="post" action="/submit"></form>

    $('form').asyncful({ ... });

Options are plain AJAX jQuery settings, see the docs: http://api.jquery.com/jQuery.ajax/

But you don't really have to set any option because Asyncful will, automagically, guess those from form attributes. Plus, it will assume that the response is javascript and will evaluate it, so you don't have to worry with callbacks. Of course you can disable this feature by overwriting the `dataType` option and providing a callback such as `complete` or `success`.

Beware that if your form has `enctype` set to `multipart/form-data` (as for uploading files) it will **NOT** use AJAX settings, since it will rely on the old trick of using an `<iframe>` to submit the data (for compatibility purposes). Once again it will assume that the response is javascript and you can disable it but simply providing a `complete` callback in options - in this case the response from the iframe with be given to the callback.
