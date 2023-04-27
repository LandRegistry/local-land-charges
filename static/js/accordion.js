function initialise(type, hideButtonLocation) {
  let selector = `.${type}-item`
  let hiddenContentSelector = `.${type}-content`
  showAllSuffix = type === 'accordion' ? 'sections': 'steps'
  
  let showAllDiv = document.createElement('div')
  let showAllButton = document.createElement('button')
  let showAllIcon = document.createElement('span')
  let showAllContent = document.createElement('span')
  let showAllContentWrapper = document.createElement('span')

  showAllIcon.setAttribute('class', 'show-hide-icon show')
  showAllContent.textContent = `Show all ${showAllSuffix}`
  showAllContent.setAttribute('class', 'show-all-content')
  showAllButton.setAttribute('class', 'show-all-button')
  showAllContentWrapper.setAttribute('class', 'accordion-content-wrapper')

  showAllButton.addEventListener('click', () => {
    if (showAllContent.textContent.startsWith('Show')) {
      showAllContent.textContent = `Hide all ${showAllSuffix}`
      $(selector).each(function () {
        let sectionHeading = $(hideButtonLocation, this).text().toLowerCase().replace('show', '')
        $(hiddenContentSelector, this).show()
        $('.show-hide-content', this).html('Hide')
        $('show-hide-icon', this).removeClass('show')
        $('show-hide-icon', this).addClass('hide')
        $('button', this).attr('aria-label', `Hide ${sectionHeading}`)
      })
    } else {
      showAllContent.textContent = `Show all ${showAllSuffix}`
      $(selector).each(function () {
        let sectionHeading = $(hideButtonLocation, this).text().toLowerCase().replace('hide', '')
        $(hiddenContentSelector, this).hide()
        $('.show-hide-content', this).html('Show')
        $('show-hide-icon', this).removeClass('hide')
        $('show-hide-icon', this).addClass('show')
        $('button', this).attr('aria-label', `Show ${sectionHeading}`)
      })
    }
  })

  showAllContentWrapper.append(showAllIcon, showAllContent)
  showAllButton.append(showAllContentWrapper)
  showAllDiv.append(showAllButton)

  if (type === 'accordion') {
    $('.accordion-container').prepend(showAllDiv)
    $('.accordion-container').addClass('js-enabled')
  }
  else {
    $('.step-by-step').before(showAllDiv)
  }

  $(selector).each(function () {
    let hideShowContent = document.createElement('span')
    let hideShowIcon = document.createElement('span')
    let hideShowText = document.createElement('span')
    let hiddenContent = $(hiddenContentSelector, this)
    let sectionHeading = $(hideButtonLocation, this).text().toLowerCase()

    hideShowIcon.setAttribute('class', 'show-hide-icon show')
    hideShowText.textContent = 'Show'
    hideShowText.setAttribute('class', 'show-hide-content')
    hideShowContent.setAttribute('class', 'accordion-content-wrapper')
    hideShowContent.append(hideShowIcon, hideShowText)
    accordionButton = document.createElement('button')
    accordionButton.setAttribute('aria-label', `Show ${sectionHeading}`)
    hiddenContent.hide()

    $(hideButtonLocation, this).wrapInner(accordionButton)
    $(`${hideButtonLocation} button`, this).append(hideShowContent)

    $('button', this).on('click', (event) => {
      if (hideShowText.textContent == 'Show') {
        hiddenContent.show()
        hideShowText.textContent = 'Hide'
        hideShowIcon.setAttribute('class', 'show-hide-icon hide')
        $('button', this).attr('aria-label', `Hide ${sectionHeading}`)
        $('.show-all-content').html(calculate_all_sections_content($(selector)))
      } else {
        hiddenContent.hide()
        hideShowText.textContent = 'Show'
        $('button', this).attr('aria-label', `Show ${sectionHeading}`)
        hideShowIcon.setAttribute('class', 'show-hide-icon show')
        $('.show-all-content').html(calculate_all_sections_content($(selector)))
      }         
    })
  })
}

function calculate_all_sections_content(elements) {
  let hide_number = 0
  elements.each( function () {
    if ($('.show-hide-content', this).html() === 'Hide'){
      hide_number ++
    }
  })
  return (hide_number == elements.length ? `Hide all ${showAllSuffix}`: `Show all ${showAllSuffix}`)
}