// netlify/functions/send-email.js
const postmark = require('postmark');

// Remplacez par votre clé API Postmark
const client = new postmark.Client('votre_clé_api_postmark');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { name, email, subject, message } = JSON.parse(event.body);

    // Construire l'email à envoyer
    const emailContent = {
      From: email, 
      To: 'contact@alternatives.asi.org', // L'email de destination
      Subject: subject,
      HtmlBody: `<p>Nom: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      TextBody: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      // Envoie de l'email via Postmark
      await client.sendEmail(emailContent);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message envoyé avec succès!' }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Une erreur est survenue lors de l\'envoi de l\'email.' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Méthode non autorisée' }),
  };// netlify/functions/send-email.js
  const postmark = require('postmark');
  
  // Remplacez par votre clé API Postmark
  const client = new postmark.Client('votre_clé_api_postmark');
  
  exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
      const { name, email, subject, message } = JSON.parse(event.body);
  
      // Construire l'email à envoyer
      const emailContent = {
        From: email, 
        To: 'contact@alternatives.asi.org', // L'email de destination
        Subject: subject,
        HtmlBody: `<p>Nom: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
        TextBody: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
  
      try {
        // Envoie de l'email via Postmark
        await client.sendEmail(emailContent);
  
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Message envoyé avec succès!' }),
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Une erreur est survenue lors de l\'envoi de l\'email.' }),
        };
      }
    }
  
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Méthode non autorisée' }),
    };
  };
};