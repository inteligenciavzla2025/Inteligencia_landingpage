export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
    }

    try {
        const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('La variable N8N_CHAT_WEBHOOK_URL no está configurada en Vercel.');
            return res.status(500).json({ error: 'Error de configuración del servidor' });
        }

        const { message, history } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'El campo "message" es requerido.' });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history: history || [] }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error devuelto por n8n:', errorText);
            return res.status(response.status).json({ error: 'n8n rechazó la petición' });
        }

        const data = await response.json();
        return res.status(200).json({ reply: data.reply || data.message || data.output || '' });
    } catch (error) {
        console.error('Error procesando el chat:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
