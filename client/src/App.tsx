import { FC } from 'react';
import '@mantine/core/styles.css';
import Routing from './routes/Routing';
import { Provider } from 'react-redux';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persist } from './utils/redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading="Initializing...">
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <MantineProvider withCssVariables>
            <Routing />
            <Notifications />
          </MantineProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
