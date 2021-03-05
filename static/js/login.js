gapi.load('auth2', function () {
  auth2 = gapi.auth2.init();
  auth2.attachClickHandler(element, {},
    onSignIn,
    function (error) {
      console.log('Sign-in error', error);
    }
  );
});

element = document.getElementById('google-login-button');
function onSignIn(googleUser) {
  $('#login-spinner').removeClass('d-none')
  const token = googleUser.getAuthResponse().id_token;
  $.post('/login', {
    token
  }, response => {
    if (response.status === 200)
      window.location = '/profile';
    else
      acceptLogin();
  })
}

function acceptLogin(extras = '') {
  $('#login-spinner').addClass('d-none')
  $('#login-buttons').addClass('d-none')
  $('#login-username').removeClass('d-none')
  $('#login-username-input').attr('disabled', false)
  $('#username-extras').text(extras)
  $('#username-submit').removeClass('disabled')
  
}
function acceptUsername() {
  $('#login-spinner').removeClass('d-none')
  $('#login-username-input').attr('disabled', true)
  $('#username-submit').addClass('disabled')

  const username = $('#login-username-input').val();
  
  if (username === '') {
    acceptLogin('Username can\'t be empty.')
    return
  }
  
  $.post('/choose-username', {
    username
  }, response => {
    if(response.status === 200)
      window.location = '/';
    else if (response.status === 400)
      acceptLogin(`"${username}" is taken.`)
  });
}

if (signingUp !== 'false')
  acceptLogin();

$('#username-submit').click(acceptUsername);