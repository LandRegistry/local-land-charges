window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date())

function startGATracking(enabled) {
  if (enabled){
    gtag('config', 'UA-93698222-5', {'anonymize_ip': true})
  }
}

function linkClicked(){
  elementText = $(event.target).text()
  gtag('event', 'Link clicked', {
      'event_category' : 'Link clicked',
      'event_label' : elementText
    })
}
