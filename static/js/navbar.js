$('#navbar-logout').click(() => {
  $.post('/logout', _ => {
    window.location = '/'
  })
})