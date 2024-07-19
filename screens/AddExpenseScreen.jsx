import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('LKR');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          alert('No auth token found. Please log in again.');
          return;
        }

        const response = await axios.get('http://192.168.8.146:8080/api/v1/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Expenses response data:', response.data);
        setExpenses(response.data.expenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        alert('Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        alert('No auth token found. Please log in again.');
        return;
      }

      const expenseData = { amount, currency, category, date, notes };
      const response = await axios.post('http://192.168.8.146:8080/api/v1/expenses/add', expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      setAmount('');
      setCurrency('LKR');
      setCategory('Food');
      setDate('');
      setNotes('');
      setExpenses([...expenses, response.data.expense]); // Use the returned expense data
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.pageTitle}>Add Expense</Text>
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.amountContainer}>
              <InputBox
                inputTitle="Amount (LKR)"
                value={amount}
                setValue={setAmount}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.c1}>
            <View style={styles.pickerContainer}>
              <Text style={styles.inputLabel}>Category</Text>
              <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={[
                  { label: 'Food', value: 'Food' },
                  { label: 'Transport', value: 'Transport' },
                  { label: 'Utilities', value: 'Utilities' },
                  { label: 'Rent', value: 'Rent' },
                  { label: 'Entertainment', value: 'Entertainment' },
                  { label: 'Healthcare', value: 'Healthcare' },
                  { label: 'Education', value: 'Education' },
                  { label: 'Shopping', value: 'Shopping' },
                  { label: 'Kids', value: 'Kids' },
                ]}
                value={category}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a category...', value: null }}
              />
            </View>
          </View>
          <InputBox
            inputTitle="Date (YYYY-MM-DD)"
            value={date}
            setValue={setDate}
            keyboardType="default"
            placeholder="Enter date in YYYY-MM-DD format"
          />
          <InputBox
            inputTitle="Notes"
            value={notes}
            setValue={setNotes}
            keyboardType="default"
            autoComplete="off"
            multiline={true}
            numberOfLines={2}
            placeholder="Enter notes here..."
          />
          <SubmitButton handleSubmit={handleAddExpense} btnTitle="Add Expense" />
        </View>
        <View>
          <Text>Recent Expenses</Text>
        </View>
        <View style={styles.expensesContainer}>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseItem}>
              <Text style={styles.expenseText}>
                {expense.category} - {expense.date} - LKR {expense.amount}
              </Text>
              <Text style={styles.expenseNotes}>{expense.notes}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: '#f5f5f5',
  },
  scrollViewContainer: {
    paddingBottom: 80,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  amountContainer: {
    flex: 1,
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 5,
    borderColor: '#fff',
    borderRadius: 0,
    borderWidth: 1,
  },
  inputLabel: {
    color: '#000',
    fontSize: 16,
    marginBottom: 5,
  },
  expensesContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expenseItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  expenseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseNotes: {
    fontSize: 14,
    color: '#555',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'fix',
    bottom: 0,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
  },
  c1: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#800000',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  inputAndroid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  placeholder: {
    color: '#999999',
  },
});

export default AddExpenseScreen;
