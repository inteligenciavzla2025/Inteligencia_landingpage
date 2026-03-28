import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ── API: Lead capture ──────────────────────────────────────────────────────
app.post('/api/lead', async (req, res) => {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
        return res.status(500).json({ error: 'N8N_WEBHOOK_URL no configurada' });
    }
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        if (!response.ok) {
            const text = await response.text();
            console.error('n8n lead error:', text);
            return res.status(response.status).json({ error: 'Error en n8n' });
        }
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Lead error:', err);
        return res.status(500).json({ error: 'Error interno' });
    }
});

// ── API: Chat ──────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
    const chatUrl = process.env.N8N_CHAT_URL;
    if (!chatUrl) {
        return res.status(500).json({ error: 'N8N_CHAT_URL no configurada' });
    }
    try {
        const response = await fetch(chatUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        const raw = await response.text();
        res.status(response.status).send(raw);
    } catch (err) {
        console.error('Chat error:', err);
        return res.status(500).json({ error: 'Error interno' });
    }
});

// ── Archivos estáticos (build de React) ────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

// ── SPA fallback ───────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
