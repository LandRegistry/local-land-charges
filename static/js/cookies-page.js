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

if (options_status == 'accepted') {
    $('#analytics-yes').prop('checked', true);
} else {
    $('#analytics-no').prop('checked', true);
}
