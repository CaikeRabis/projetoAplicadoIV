import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configuração de localização para o português brasileiro
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  
  // Seleciona uma data no calendário
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    
    // Verificar se já existem eventos para essa data
    if (events[day.dateString]) {
      // Mostrar eventos existentes
      Alert.alert(
        "Eventos em " + formatDate(day.dateString),
        "Você já tem eventos nesta data. Deseja adicionar outro evento?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { 
            text: "Adicionar evento", 
            onPress: () => setModalVisible(true) 
          },
          { 
            text: "Ver eventos", 
            onPress: () => showEventsForDate(day.dateString) 
          }
        ]
      );
    } else {
      // Abrir modal para criar novo evento
      setModalVisible(true);
    }
  };

  // Formatar data no padrão brasileiro (DD/MM/YYYY)
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Mostrar eventos de uma data específica
  const showEventsForDate = (dateString) => {
    if (events[dateString] && events[dateString].length > 0) {
      let message = '';
      events[dateString].forEach((event, index) => {
        message += `${index + 1}. ${event.title}\n${event.description}\n\n`;
      });
      
      Alert.alert(
        `Eventos em ${formatDate(dateString)}`,
        message,
        [
          { text: "OK" },
          { 
            text: "Adicionar evento", 
            onPress: () => setModalVisible(true) 
          }
        ]
      );
    }
  };

  // Adicionar novo evento
  const addEvent = () => {
    if (eventTitle.trim() === '') {
      Alert.alert('Erro', 'O título do evento não pode estar vazio');
      return;
    }

    const newEvent = {
      title: eventTitle,
      description: eventDescription
    };

    // Criar cópia dos eventos atuais
    const updatedEvents = { ...events };
    
    // Adicionar ou atualizar eventos para a data selecionada
    if (!updatedEvents[selectedDate]) {
      updatedEvents[selectedDate] = [];
    }
    updatedEvents[selectedDate].push(newEvent);
    setEvents(updatedEvents);

    // Atualizar marcações no calendário
    const updatedMarkedDates = { ...markedDates };
    updatedMarkedDates[selectedDate] = {
      selected: true,
      marked: true,
      selectedColor: '#4a90e2',
      dotColor: '#4a90e2'
    };
    setMarkedDates(updatedMarkedDates);

    // Limpar campos e fechar modal
    setEventTitle('');
    setEventDescription('');
    setModalVisible(false);

    Alert.alert('Sucesso', `Evento adicionado para ${formatDate(selectedDate)}`);
  };

  // Renderizar lista de todos os eventos
  const renderEventsList = () => {
    const allDates = Object.keys(events).sort();
    
    if (allDates.length === 0) {
      return (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>
            Nenhum evento cadastrado. Selecione uma data no calendário para adicionar eventos.
          </Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={allDates}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.eventDateContainer}>
            <Text style={styles.eventDateTitle}>{formatDate(item)}</Text>
            {events[item].map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </View>
            ))}
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário de Eventos</Text>
      
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths={true}
        theme={{
          todayTextColor: '#4a90e2',
          selectedDayBackgroundColor: '#4a90e2',
          dotColor: '#4a90e2',
          arrowColor: '#4a90e2',
          monthTextColor: '#4a90e2',
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          textDayHeaderFontFamily: 'System',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14
        }}
      />
      
      <View style={styles.eventsListContainer}>
        <Text style={styles.eventsListTitle}>Meus Eventos</Text>
        {renderEventsList()}
      </View>

      {/* Modal para adicionar eventos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Adicionar Evento - {selectedDate ? formatDate(selectedDate) : ''}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título do evento"
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição do evento"
              value={eventDescription}
              onChangeText={setEventDescription}
              multiline
              numberOfLines={4}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]} 
                onPress={addEvent}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  eventsListContainer: {
    flex: 1,
    marginTop: 20
  },
  eventsListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  noEventsText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16
  },
  eventDateContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  eventDateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a90e2'
  },
  eventItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2'
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#f44336'
  },
  saveButton: {
    backgroundColor: '#4caf50'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default CalendarScreen;