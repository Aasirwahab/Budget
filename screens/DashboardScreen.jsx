import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const DashboardScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Dashboard</Text>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/dashboard')}>
          <Icon name="home" size={30} color="#900" />
          <Text style={styles.iconText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/AddExpense')}>
          <Icon name="add-circle" size={30} color="#900" />
          <Text style={styles.iconText}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/Viewreport')}>
          <Icon name="analytics" size={30} color="#900" />
          <Text style={styles.iconText}>View Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/profile')}>
          <Icon name="person" size={30} color="#900" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
  },
});

export default DashboardScreen;
