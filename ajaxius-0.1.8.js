(function(e){e.fn.ajaxius=function(b){"function"===typeof b&&(b={success:b});var b=e.extend({enabled:!0,success:e.noop,error:e.noop,validations:null,message:function(b,e){b.after('<span class="error-message">'+e+"</span>")}},b),h=function(c){var f={},a,d,g;if(null===b.validations)b.validations={},c.find("[pattern]").each(function(a,d){var c=e(d);b.validations[d.name]=[c.attr("pattern"),c.data("message"),c.data("sanitize")]});for(a in b.validations)b.validations.hasOwnProperty(a)&&(d=b.validations[a],
g=c.find('*[name="'+a+'"]'),g=g.val(),2 in d&&d[2]&&d[2].exec&&(g=g.replace(d[2],"")),g.match(RegExp(d[0]))||(f[a]=d[1]));return f},i=function(c){c.preventDefault();var f,a=e(this),d=a.find(":submit"),c=h(a);a.find("span.error-message").remove();if(e.isEmptyObject(c))d.attr("disabled",!0),b.enabled?e.ajax({type:a.attr("method"),url:a.attr("action"),data:a.serialize(),success:function(c){b.success.call(a[0],[c])},error:function(c,d){b.error.call(a[0],[d])},complete:function(){d.removeAttr("disabled")}}):
a.submit();else{for(f in c)c.hasOwnProperty(f)&&b.message(a.find('*[name="'+f+'"]'),c[f]);a.find(".error-message").eq(0).prev("input, select, textarea").focus()}};return this.each(function(){e(this).bind("submit.ajaxius",i)})}})(jQuery);