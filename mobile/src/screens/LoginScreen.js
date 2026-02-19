import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import loginStyles from '../styles/loginStyles';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please provide both email and password.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      if (response.data?.token) {
        await login(response.data.token);
      } else {
        Alert.alert('Login failed', 'Unexpected response from the server.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Please check your credentials and try again.';
      Alert.alert('Login failed', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={loginStyles.container}
    >
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Sign in</Text>

        <Text style={loginStyles.fieldLabel}>Email</Text>
        <TextInput
          style={loginStyles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={loginStyles.fieldLabel}>Password</Text>
        <TextInput
          style={loginStyles.input}
          secureTextEntry
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          activeOpacity={0.85}
          style={loginStyles.button}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={loginStyles.buttonText}>{submitting ? 'Signing in…' : 'Log in'}</Text>
        </TouchableOpacity>

        <Text style={loginStyles.footerText}>Use the credentials provided in the seed script.</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
