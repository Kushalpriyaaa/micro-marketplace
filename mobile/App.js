import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <AuthProvider>
    <StatusBar style="dark" />
    <AppNavigator />
  </AuthProvider>
);

export default App;
