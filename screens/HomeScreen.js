import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Portal do Aluno</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            // Adicione aqui a navegação para outras telas existentes
          }}
        >
          <Text style={styles.buttonText}>Acessar Notas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Text style={styles.buttonText}>Calendário de Eventos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            // Adicione aqui a navegação para outras telas existentes
          }}
        >
          <Text style={styles.buttonText}>Material de Aula</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%'
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginTop: 20
  }
});

export default HomeScreen;