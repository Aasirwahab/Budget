import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert('Please Fill All Fields');
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "http://192.168.8.146:8080/api/v1/auth/login",
        { email, password }
      );

      console.log("Login response data:", data); // Debugging step

      if (data && data.success) {
        if (data.token) {
          await AsyncStorage.setItem('authToken', data.token);
          await AsyncStorage.setItem("@auth", JSON.stringify(data));
          alert(data.message);
          navigation.navigate('dashboard');
        } else {
          alert("Login successful, but no token received.");
        }
      } else {
        alert(data.message || "Login failed");
      }
      
      setLoading(false);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
        buttonStyle={styles.submitButton}
        textStyle={styles.submitButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#6a0dad",
    padding: 20,
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FFFFFF",
    marginBottom: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#800080',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
