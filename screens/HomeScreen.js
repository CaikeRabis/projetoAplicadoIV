import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  // Reset para 'home' quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('home');
    }, [])
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Bem-vindo ao Portal do Aluno</Text>
            <View style={styles.cardContainer}>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => navigation.navigate('StudyRooms')}
              >
                <Text style={styles.cardTitle}>📚 Salas de Estudo</Text>
                <Text style={styles.cardDescription}>Reserve salas para estudar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.card}
                onPress={() => navigation.navigate('Calendar')}
              >
                <Text style={styles.cardTitle}>📅 Calendário</Text>
                <Text style={styles.cardDescription}>Eventos e atividades</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardTitle}>📖 Material</Text>
                <Text style={styles.cardDescription}>Acesse o material de aula</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardTitle}>📢 Avisos</Text>
                <Text style={styles.cardDescription}>Comunicados importantes</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'calendar':
        // Não renderizar nada aqui, pois navega para outra tela
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Redirecionando...</Text>
          </View>
        );
      case 'studyrooms':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Salas de Estudo</Text>
            <View style={styles.gradeContainer}>
              <Text style={styles.gradeText}>Redirecionando para salas de estudo...</Text>
            </View>
          </View>
        );
      case 'materials':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Material de Aula</Text>
            <View style={styles.materialContainer}>
              <Text style={styles.materialText}>Esta seção será implementada em breve</Text>
            </View>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Meu Perfil</Text>
            <View style={styles.profileContainer}>
              <Text style={styles.profileText}>Nome: João da Silva</Text>
              <Text style={styles.profileText}>Matrícula: 2024001</Text>
              <Text style={styles.profileText}>Curso: Engenharia</Text>
              <TouchableOpacity 
                style={[styles.button, styles.logoutButton]}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {renderContent()}
      
      {/* Navbar inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navIcon, activeTab === 'home' && styles.activeNavText]}>🏠</Text>
          <Text style={[styles.navLabel, activeTab === 'home' && styles.activeNavText]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'calendar' && styles.activeNavItem]}
          onPress={() => {
            navigation.navigate('Calendar');
          }}
        >
          <Text style={[styles.navIcon, activeTab === 'calendar' && styles.activeNavText]}>📅</Text>
          <Text style={[styles.navLabel, activeTab === 'calendar' && styles.activeNavText]}>Calendário</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'studyrooms' && styles.activeNavItem]}
          onPress={() => {
            navigation.navigate('StudyRooms');
          }}
        >
          <Text style={[styles.navIcon, activeTab === 'studyrooms' && styles.activeNavText]}>📚</Text>
          <Text style={[styles.navLabel, activeTab === 'studyrooms' && styles.activeNavText]}>Salas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'materials' && styles.activeNavItem]}
          onPress={() => setActiveTab('materials')}
        >
          <Text style={[styles.navIcon, activeTab === 'materials' && styles.activeNavText]}>📚</Text>
          <Text style={[styles.navLabel, activeTab === 'materials' && styles.activeNavText]}>Material</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'profile' && styles.activeNavItem]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.navIcon, activeTab === 'profile' && styles.activeNavText]}>👤</Text>
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.activeNavText]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  cardDescription: {
    fontSize: 14,
    color: '#666'
  },
  gradeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  gradeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  },
  materialContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  materialText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  profileText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  logoutButton: {
    backgroundColor: '#f44336'
  },
  // Estilos da Navbar
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5
  },
  activeNavItem: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  activeNavText: {
    color: '#4a90e2',
    fontWeight: 'bold'
  }
});

export default HomeScreen;