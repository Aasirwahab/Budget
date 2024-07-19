import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Budget Tracker App
      </Text>
      <View style={styles.imagePlaceholder}>
        <Image 
          source={require('../assets/images/ps1.png')} 
          style={styles.imageBox}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => router.push('/Signup')}
          style={styles.signupButton}
        >
          <Text style={styles.signupButtonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a0dad', // equivalent to bg-primary
  },
  heading: {
    color: 'white', // equivalent to text-white
    fontWeight: 'bold', // equivalent to font-bold
    fontSize: 32, // equivalent to text-4xl
    textAlign: 'center', // equivalent to text-center
    marginTop: 32, // equivalent to mt-8
  },
  imagePlaceholder: {
    flexDirection: 'row', // equivalent to flex-row
    justifyContent: 'center', // equivalent to justify-center
    marginVertical: 32, // equivalent to my-8
  },
  imageBox: {
    width: 256, // equivalent to w-64
    height: 256, // equivalent to h-64
    borderRadius: 10, // equivalent to rounded-lg
  },
  buttonContainer: {
    marginHorizontal: 28, // equivalent to mx-7
    spaceVertical: 16, // equivalent to space-y-4
  },
  signupButton: {
    paddingVertical: 12, // equivalent to py-3
    backgroundColor: '#fbbf24', // equivalent to bg-yellow-400
    borderRadius: 10, // equivalent to rounded-xl
  },
  signupButtonText: {
    fontSize: 18, // equivalent to text-xl
    fontWeight: 'bold', // equivalent to font-bold
    textAlign: 'center', // equivalent to text-center
    color: '#4b5563', // equivalent to text-gray-700
  },
});

export default HomeScreen;
