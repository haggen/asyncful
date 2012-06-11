# Asyncful

Make AJAX capable forms with ease.

## Features

Asyncful does one thing and does it well. It works with `multipart` forms (for uploading files) and supports even IE6. Asyncful is lightweight and easy to use. Take a look.

## Usage

    <form method="post" action="/submit"></form>

    $('form').asyncful({ ... });

Options are plain AJAX jQuery settings, see the docs: http://api.jquery.com/jQuery.ajax/

But wait, you don't really have to set any options because Asyncful will use values set for `action` and `method` automagically. Also, it will assume that the response is a script and will evaluate it, so you don't have to worry with callbacks.

Just one thing; if your form has `enctype` attribute set to `multipart/form-data` it will **NOT** use AJAX settings, since it will rely on the old trick of using an `<iframe>` to submit the data (for compatibility).