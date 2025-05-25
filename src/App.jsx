import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';

// auth provider

import { AuthProvider } from './contexts/AuthContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

// ==============================|| APP ||============================== //

const apiKey = import.meta.env.VITE_COPILOT_API_KEY;

export default function App() {
  return (
    <ThemeCustomization>
      <Provider store={store}>
        <AuthProvider>
          <CopilotKit publicApiKey={apiKey}>


            <NavigationScroll>



              <>
                <RouterProvider router={router} />
              </>

              <CopilotPopup
                instructions={"You are assisting the user as best as you can."}
                labels={{
                  title: "Popup Assistant",
                  initial: "Need any help?",
                }}
              />
            </NavigationScroll>
          </CopilotKit>
        </AuthProvider>
      </Provider>
    </ThemeCustomization>
  );
}
