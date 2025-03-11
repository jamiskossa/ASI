const fetch = require("node-fetch");

exports.handler = async (event) => {
    const { name, email, subject, message } = JSON.parse(event.body);

    const postmarkResponse = await fetch("https://api.postmarkapp.com/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Postmark-Server-Token": "VOTRE_API_KEY_POSTMARK"
        },
        body: JSON.stringify({
            From: "contact@votre-domaine.com",
            To: "admin@votre-domaine.com",
            Subject: `Nouveau message : ${subject}`,
            HtmlBody: `<p><strong>Nom :</strong> ${name}</p>
                       <p><strong>Email :</strong> ${email}</p>
                       <p><strong>Message :</strong></p>
                       <p>${message}</p>`,
            MessageStream: "outbound"
        })
    });

    const result = await postmarkResponse.json();

    return {
        statusCode: postmarkResponse.status,
        body: JSON.stringify(result)
    };
};
