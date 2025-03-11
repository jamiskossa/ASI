exports.handler = async (event) => {
    console.log("Requête reçue:", event.body); // Debug

    try {
        const { name, email, subject, message } = JSON.parse(event.body);
        console.log("Données reçues:", name, email, subject, message); // Debug

        // Vérifiez que les champs ne sont pas vides
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Tous les champs sont requis" })
            };
        }

        const response = await fetch("https://api.postmarkapp.com/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Postmark-Server-Token": "f146c1ed-0b9b-414c-b0fb-b4071c7bc890"
            },
            body: JSON.stringify({
                From: "contact@alternatives.asi.org",
                To: "contact@alternatives.asi.org",
                Subject: `Nouveau message: ${subject}`,
                HtmlBody: `
                    <h2>Nouveau message reçu</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Objet :</strong> ${subject}</p>
                    <p><strong>Message :</strong> ${message}</p>
                `,
                MessageStream: "outbound"
            })
        });

        const result = await response.json();
        console.log("Réponse Postmark:", result); // Debug

        return {
            statusCode: response.status,
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error("Erreur serveur:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erreur interne du serveur" })
        };
    }
};

