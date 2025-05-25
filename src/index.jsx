import { createRoot } from 'react-dom/client';

// project imports
import App from 'App';
import { ConfigProvider } from 'contexts/ConfigContext';
import "@copilotkit/react-ui/styles.css";



// style + assets
import 'assets/scss/style.scss';


// ==============================|| REACT DOM RENDER ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);
