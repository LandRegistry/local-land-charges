var a = null
function initialise() {
  let showAllDiv = document.createElement('div')
  let showAllButton = document.createElement('button')
  let showAllIcon = document.createElement('span')
  let showAllContent = document.createElement('span')
  let showAllContentWrapper = document.createElement('span')

  showAllIcon.setAttribute('class', 'accordion-icon show')
  showAllContent.textContent = 'Show all sections'
  showAllContent.setAttribute('class', 'show-all-content')
  showAllButton.setAttribute('class', 'show-all-button')
  showAllContentWrapper.setAttribute('class', 'accordion-content-wrapper')

  showAllButton.addEventListener('click', () => {
    if (showAllContent.textContent.startsWith('Show')) {
      showAllContent.textContent = 'Hide all sections'
      $('.accordion-item').each(function () {
        $('.accordion-content', this).show()
        $('.show-hide-content', this).html('Hide')
        $('accordion-icon', this).removeClass('show')
        $('accordion-icon', this).addClass('hide')
      })
    } else {
      showAllContent.textContent = 'Show all sections'
      $('.accordion-item').each(function () {
        $('.accordion-content', this).hide()
        $('.show-hide-content', this).html('Show')
        $('accordion-icon', this).removeClass('hide')
        $('accordion-icon', this).addClass('show')
      })
    }
  })

  showAllContentWrapper.append(showAllIcon, showAllContent)
  showAllButton.append(showAllContentWrapper)
  showAllDiv.append(showAllButton)

  $('.accordion-container').prepend(showAllDiv)
  $('.accordion-container').addClass('js-enabled')

  $('.accordion-item').each(function () {
    let hideShowContent = document.createElement('span')
    let hideShowIcon = document.createElement('span')
    let hideShowText = document.createElement('span')
    let hiddenContent = $('.accordion-content', this)

    hideShowIcon.setAttribute('class', 'accordion-icon show')
    hideShowText.textContent = 'Show'
    hideShowText.setAttribute('class', 'show-hide-content')
    hideShowContent.setAttribute('class', 'accordion-content-wrapper')
    hideShowContent.append(hideShowIcon, hideShowText)
    accordionButton = document.createElement('button')
    hiddenContent.hide()

    $('h3', this).after(hideShowContent)
    $('.button-wrapper' ,this).wrapInner(accordionButton)

    $('button', this).on('click', (event) => {
      if (hideShowText.textContent == 'Show') {
        hiddenContent.show()
        hideShowText.textContent = 'Hide'
        hideShowIcon.setAttribute('class', 'accordion-icon hide')
        $('.show-all-content').html(calculate_all_sections_content($('.accordion-item')))
      } else {
        hiddenContent.hide()
        hideShowText.textContent = 'Show'
        hideShowIcon.setAttribute('class', 'accordion-icon show')
        $('.show-all-content').html(calculate_all_sections_content($('.accordion-item')))
      }         
    })
  })
}


window.onload = function() {
  initialise()
}

function calculate_all_sections_content(elements) {
  let hide_number = 0
  elements.each( function () {
    if ($('.show-hide-content', this).html() === 'Hide'){
      hide_number ++
    }
  })
  return (hide_number == elements.length ? 'Hide all sections': 'Show all sections')
}