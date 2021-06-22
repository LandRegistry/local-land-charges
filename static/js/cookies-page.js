$('#save-cookie-setting-button').click(function() {
  var selectedCookie = $('input:radio[name=analytics]:checked').val();
  if (selectedCookie === 'yes') {
      cookies_options.enable_analytics()
      $(location).attr('href', 'index');
  }
  if (selectedCookie === 'no') {
      cookies_options.disable_analytics()
      $(location).attr('href', 'index');
  }
});
var options_status = cookies_options.options_status();
$('#analytics-yes').prop('checked', options_status);
$('#analytics-no').prop('checked', !options_status);
