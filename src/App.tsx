import { HelmetProvider } from 'react-helmet-async';
import { Landing } from './pages/Landing';

function App() {
    return (
        <HelmetProvider>
            <Landing />
        </HelmetProvider>
    );
}

export default App
