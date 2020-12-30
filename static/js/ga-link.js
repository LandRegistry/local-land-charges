function linkClicked(link){
    gtag('event', 'Link clicked', {
        'event_category' : 'Link clicked',
        'event_label' : link
      });
}
