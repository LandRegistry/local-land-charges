var cookies_options = cookies_options || {};

/** Defines functionality for cookie options */
(function (cookies_options) {
  var COOKIES_BANNER = '#cookies-banner'
  var ACCEPTED_COOKIES_BANNER = '#selected-cookies-banner'
  var COOKIE_ACCEPT_BUTTON = '#cookie-accept-button'
  var COOKIE_REJECT_BUTTON = '#cookie-reject-button'
  var COOKIE_BAR_HIDE_BUTTON = '#cookie-bar-hide-button'
  var SELECTED_OPTION = '#selected-option'

  /**
   * Initialises the cookies_options namespace. Should be called prior to use.
   * @public
   */
  cookies_options.initialise = function () {
    registerEvents()
    setVisibility()
  }

  cookies_options.enable_analytics = function () {
    $(COOKIES_BANNER).hide()
    $(ACCEPTED_COOKIES_BANNER).hide()
    setCookie('cookie_options', 'enable_analytics=true,hide_cookie_bar=true', 365);
  }

  cookies_options.disable_analytics = function () {
    $(COOKIES_BANNER).hide()
    $(ACCEPTED_COOKIES_BANNER).hide()
    setCookie('cookie_options', 'enable_analytics=false,hide_cookie_bar=true', 365);
  }

  cookies_options.options_status = function () {
    return analytics_enabled()
  }

  function cookie_bar_hidden () {
    var options_cookie = getCookie('cookie_options');
    if (options_cookie == null) {
      return false
    }
    var match = options_cookie.match(/hide_cookie_bar=(\w+)/);
    return match[1] === 'true'
  }

  function analytics_enabled () {
    var options_cookie = getCookie('cookie_options');
    if (options_cookie == null) {
      return null
    }
    var match = options_cookie.match(/enable_analytics=(\w+)/);
    if (match[1] === "true"){
      return 'accepted'
    } else {
      return 'rejected'
    }
  }

  /**
   * Set cookie value.
   * @private
   */
  function setCookie(cookieName, cookieValue, expiryDays) {
    const expiryDate = new Date()
    expiryDate.setTime(expiryDate.getTime() + (expiryDays*24*60*60*1000))
    let expires = "expires=" + expiryDate.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";"
  }

   /**
   * Get cookie value.
   * @private
   */
  function getCookie(cookieName) {
    return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop() || null
  }

  /**
   * Set initial visibility.
   * @private
   */
  function setVisibility () {
    analytics = analytics_enabled()
    startGATracking(analytics === 'accepted')

    if (cookie_bar_hidden()) {
      $(COOKIES_BANNER).hide()
      $(ACCEPTED_COOKIES_BANNER).hide()
    } else {
      if (analytics === 'accepted' || analytics === 'rejected') {
        $(COOKIES_BANNER).hide()
        $(ACCEPTED_COOKIES_BANNER).show()
        $(SELECTED_OPTION).html(`You’ve ${analytics} analytics cookies. You can <a href="cookies">change your cookie settings</a> at any time.`)
      } else {
        $(COOKIES_BANNER).show()
        $(ACCEPTED_COOKIES_BANNER).hide()
      }
    }
  }

  /**
   * Registers all cookie events.
   * @private
   */
   function registerEvents () {
    $(COOKIE_ACCEPT_BUTTON).click(function () {
      $(COOKIES_BANNER).hide()
      $(ACCEPTED_COOKIES_BANNER).show()
      $(SELECTED_OPTION).html('You’ve accepted analytics cookies. You can <a href="cookies">change your cookie settings</a> at any time.')
      setCookie('cookie_options', 'enable_analytics=true,hide_cookie_bar=false', 365)
      startGATracking(true)
    });
    $(COOKIE_REJECT_BUTTON).click(function () {
      $(COOKIES_BANNER).hide()
      $(ACCEPTED_COOKIES_BANNER).show()
      $(SELECTED_OPTION).html('You’ve rejected analytics cookies. You can <a href="cookies">change your cookie settings</a> at any time.')
      setCookie('cookie_options', 'enable_analytics=false,hide_cookie_bar=false', 365)
    });
    $(COOKIE_BAR_HIDE_BUTTON).click(function () {
      $(COOKIES_BANNER).hide()
      $(ACCEPTED_COOKIES_BANNER).hide()
      setCookie('cookie_options', `enable_analytics=${analytics_enabled()},hide_cookie_bar=true`, 365)
    });
    
  }

})(cookies_options);

window.onload = function() {
  cookies_options.initialise()
}
