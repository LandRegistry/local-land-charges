var a = null
function initialise() {
  let showAllDiv = document.createElement('div')
  let showAllButton = document.createElement('button')
  let showAllIcon = document.createElement('span')
  let showAllContent = document.createElement('span')

  showAllIcon.setAttribute('class', 'accordian-icon show')
  showAllContent.textContent = 'Show all sections'
  showAllContent.setAttribute('class', 'show-all-content')

  showAllButton.addEventListener('click', () => {
    if (showAllContent.textContent.startsWith('Show')) {
      showAllContent.textContent = 'Hide all sections'
      $('.accordian-item').each(function () {
        $('.accordian-content', this).show()
        $('.show-hide-content', this).html('Hide')
        $('accordian-icon', this).removeClass('show')
        $('accordian-icon', this).addClass('hide')
      })
    } else {
      showAllContent.textContent = 'Show all sections'
      $('.accordian-item').each(function () {
        $('.accordian-content', this).hide()
        $('.show-hide-content', this).html('Show')
        $('accordian-icon', this).removeClass('hide')
        $('accordian-icon', this).addClass('show')
      })
    }
  })

  showAllButton.append(showAllIcon, showAllContent)
  showAllDiv.append(showAllButton)

  $('.accordian-container').prepend(showAllDiv)
  $('.accordian-container').addClass('js-enabled')

  $('.accordian-item').each(function () {
    let hideShowContent = document.createElement('span')
    let hideShowIcon = document.createElement('span')
    let hideShowText = document.createElement('span')
    let hiddenContent = $('.accordian-content', this)

    hideShowIcon.setAttribute('class', 'accordian-icon show')
    hideShowText.textContent = 'Show'
    hideShowText.setAttribute('class', 'show-hide-content')
    hideShowContent.append(hideShowIcon, hideShowText)
    accordianButton = document.createElement('button')
    hiddenContent.hide()

    $('h3', this).after(hideShowContent)
    $('.button-wrapper' ,this).wrapInner(accordianButton)

    $('button', this).on('click', (event) => {
      if (hideShowText.textContent == 'Show') {
        hiddenContent.show()
        hideShowText.textContent = 'Hide'
        hideShowIcon.setAttribute('class', 'accordian-icon hide')
        $('.show-all-content').html(calculate_all_sections_content($('.accordian-item')))
      } else {
        hiddenContent.hide()
        hideShowText.textContent = 'Show'
        hideShowIcon.setAttribute('class', 'accordian-icon show')
        $('.show-all-content').html(calculate_all_sections_content($('.accordian-item')))
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