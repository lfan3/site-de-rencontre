const { CLIENT_ORIGIN } = require('../config/global')

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

  confirm: (to, id) => ({
    to : to,
    subject: 'React Confirm Email',
    html: `
      <a href='${CLIENT_ORIGIN}/confirm/${to}/${id}'>
        click to confirm email
      </a>
    `,      
    text: `if the link above does not work. Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })
  
}