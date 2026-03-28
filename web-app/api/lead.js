export default async function handler(req, res) {
    // Solo permitimos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
    }

    try {
        // Tomamos la URL secreta de las variables de entorno de Vercel (SIN VITE_)
        const webhookUrl = process.env.N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('La variable N8N_WEBHOOK_URL no está configurada en Vercel.');
            return res.status(500).json({ error: 'Error de configuración del servidor' });
        }

        // Reenviamos los datos al Webhook de n8n desde nuestro backend
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error devuelto por n8n:', errorText);
            return res.status(response.status).json({ error: 'N8n rechazó la petición' });
        }

        // Respondemos a nuestro frontend (LeadCapture) que todo salió bien
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error grave procesando el lead:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
