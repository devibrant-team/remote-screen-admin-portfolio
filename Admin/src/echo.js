import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const token = localStorage.getItem('token');
const screenId = localStorage.getItem('screen_id') || '1'; // Set your screen ID logic

let echo = null; // Declare echo globally

if (token) {
    echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        auth: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    });

    echo.channel('maintenance')
        .listen('.maintenance.updated', (data) => {
            // Your maintenance event logic here
        });

    // Online: connected to Reverb server
    echo.connector.pusher.connection.bind('connected', () => {
        console.log('Connected to the server.');

        // Notify backend screen is online
        fetch(`http://192.168.10.107:8000/api/screens/${screenId}/online`, {
            method: 'POST',
        });
    });

    // Offline: disconnected from Reverb server
    echo.connector.pusher.connection.bind('disconnected', () => {
        console.log('Disconnected from the broadcasting server.');

        // Notify backend screen is offline
        fetch(`http://192.168.10.107:8000/api/screens/${screenId}/offline`, {
            method: 'POST',
        });
    });

    // When browser/tab is about to close — send offline signal reliably
    window.addEventListener('beforeunload', () => {
        navigator.sendBeacon(
            `http://192.168.10.107:8000/api/screens/${screenId}/offline`
        );
    });

} else {
    console.log('No token found');
}

export default echo;
