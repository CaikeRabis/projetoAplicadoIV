import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ScrollView,
  TextInput
} from 'react-native';

const StudyRoomsScreen = ({ navigation }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [studyRooms, setStudyRooms] = useState([
    {
      id: 1,
      name: 'Sala de Matemática - Prof. Silva',
      subject: 'Matemática',
      professor: 'Prof. João Silva',
      capacity: 25,
      type: 'subject',
      equipment: ['Quadro Digital', 'Projetor', 'Calculadoras'],
      description: 'Sala dedicada ao estudo de Matemática com recursos específicos',
      schedule: ['08:00 - 10:00', '14:00 - 16:00'],
      floor: '2º Andar',
      active: true
    },
    {
      id: 2,
      name: 'Laboratório de Física - Prof. Santos',
      subject: 'Física',
      professor: 'Prof. Maria Santos',
      capacity: 20,
      type: 'laboratory',
      equipment: ['Microscópios', 'Equipamentos de Experimento', 'Bancadas'],
      description: 'Laboratório para aulas práticas de Física',
      schedule: ['10:00 - 12:00', '16:00 - 18:00'],
      floor: '3º Andar',
      active: true
    },
    {
      id: 3,
      name: 'Sala de Literatura - Prof. Costa',
      subject: 'Português/Literatura',
      professor: 'Prof. Ana Costa',
      capacity: 30,
      type: 'subject',
      equipment: ['Biblioteca', 'Projetor', 'Sistema de Som'],
      description: 'Espaço para discussões literárias e análise de textos',
      schedule: ['09:00 - 11:00', '15:00 - 17:00'],
      floor: '1º Andar',
      active: false
    }
  ]);

  // Estados para formulário
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    professor: '',
    capacity: '',
    type: 'subject',
    equipment: '',
    description: '',
    schedule: '',
    floor: ''
  });

  const roomTypes = [
    { key: 'subject', label: 'Sala de Matéria', icon: '📚' },
    { key: 'laboratory', label: 'Laboratório', icon: '🔬' },
    { key: 'workshop', label: 'Oficina', icon: '🛠️' },
    { key: 'computer', label: 'Informática', icon: '💻' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      professor: '',
      capacity: '',
      type: 'subject',
      equipment: '',
      description: '',
      schedule: '',
      floor: ''
    });
  };

  const openRoomDetails = (room) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };

  const openCreateModal = () => {
    resetForm();
    setCreateModalVisible(true);
  };

  const openEditModal = (room) => {
    setFormData({
      name: room.name,
      subject: room.subject,
      professor: room.professor,
      capacity: room.capacity.toString(),
      type: room.type,
      equipment: room.equipment.join(', '),
      description: room.description,
      schedule: room.schedule.join(', '),
      floor: room.floor
    });
    setSelectedRoom(room);
    setEditModalVisible(true);
  };

  const createRoom = () => {
    if (!formData.name || !formData.subject || !formData.professor) {
      Alert.alert('Erro', 'Preencha pelo menos nome, matéria e professor');
      return;
    }

    const newRoom = {
      id: Date.now(),
      name: formData.name,
      subject: formData.subject,
      professor: formData.professor,
      capacity: parseInt(formData.capacity) || 20,
      type: formData.type,
      equipment: formData.equipment.split(',').map(item => item.trim()).filter(item => item),
      description: formData.description,
      schedule: formData.schedule.split(',').map(item => item.trim()).filter(item => item),
      floor: formData.floor || '1º Andar',
      active: true
    };

    setStudyRooms([...studyRooms, newRoom]);
    setCreateModalVisible(false);
    resetForm();
    Alert.alert('Sucesso', 'Sala criada com sucesso!');
  };

  const updateRoom = () => {
    if (!formData.name || !formData.subject || !formData.professor) {
      Alert.alert('Erro', 'Preencha pelo menos nome, matéria e professor');
      return;
    }

    const updatedRooms = studyRooms.map(room => {
      if (room.id === selectedRoom.id) {
        return {
          ...room,
          name: formData.name,
          subject: formData.subject,
          professor: formData.professor,
          capacity: parseInt(formData.capacity) || 20,
          type: formData.type,
          equipment: formData.equipment.split(',').map(item => item.trim()).filter(item => item),
          description: formData.description,
          schedule: formData.schedule.split(',').map(item => item.trim()).filter(item => item),
          floor: formData.floor || '1º Andar'
        };
      }
      return room;
    });

    setStudyRooms(updatedRooms);
    setEditModalVisible(false);
    resetForm();
    Alert.alert('Sucesso', 'Sala atualizada com sucesso!');
  };

  const deleteRoom = (roomId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta sala?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setStudyRooms(studyRooms.filter(room => room.id !== roomId));
            Alert.alert('Sucesso', 'Sala excluída com sucesso!');
          }
        }
      ]
    );
  };

  const toggleRoomStatus = (roomId) => {
    const updatedRooms = studyRooms.map(room => {
      if (room.id === roomId) {
        return { ...room, active: !room.active };
      }
      return room;
    });
    setStudyRooms(updatedRooms);
  };

  const getRoomTypeInfo = (type) => {
    const typeInfo = roomTypes.find(t => t.key === type);
    return typeInfo || { icon: '📚', label: 'Sala de Matéria' };
  };

  const getRoomTypeColor = (type) => {
    switch (type) {
      case 'subject': return '#4a90e2';
      case 'laboratory': return '#e67e22';
      case 'workshop': return '#27ae60';
      case 'computer': return '#8e44ad';
      default: return '#95a5a6';
    }
  };

  const renderRoom = ({ item }) => {
    const typeInfo = getRoomTypeInfo(item.type);
    
    return (
      <TouchableOpacity
        style={[
          styles.roomCard,
          { borderLeftColor: getRoomTypeColor(item.type) },
          !item.active && styles.inactiveRoom
        ]}
        onPress={() => openRoomDetails(item)}
      >
        <View style={styles.roomHeader}>
          <Text style={styles.roomIcon}>{typeInfo.icon}</Text>
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.roomSubject}>📖 {item.subject}</Text>
            <Text style={styles.roomProfessor}>👨‍🏫 {item.professor}</Text>
          </View>
          <View style={styles.roomActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => openEditModal(item)}
            >
              <Text style={styles.actionButtonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => deleteRoom(item.id)}
            >
              <Text style={styles.actionButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.roomDescription}>{item.description}</Text>
        
        <View style={styles.roomDetails}>
          <Text style={styles.detailText}>👥 {item.capacity} pessoas</Text>
          <Text style={styles.detailText}>📍 {item.floor}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={styles.statusButton}
            onPress={() => toggleRoomStatus(item.id)}
          >
            <Text style={[
              styles.statusText,
              { color: item.active ? '#27ae60' : '#e74c3c' }
            ]}>
              {item.active ? '✅ Ativa' : '⏸️ Inativa'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFormModal = (visible, onClose, onSubmit, title) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={styles.formModalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          
          <Text style={styles.inputLabel}>Nome da Sala *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            placeholder="Ex: Sala de Matemática - Prof. Silva"
          />
          
          <Text style={styles.inputLabel}>Matéria *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.subject}
            onChangeText={(text) => setFormData({...formData, subject: text})}
            placeholder="Ex: Matemática, Física, Literatura..."
          />
          
          <Text style={styles.inputLabel}>Professor *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.professor}
            onChangeText={(text) => setFormData({...formData, professor: text})}
            placeholder="Ex: Prof. João Silva"
          />
          
          <Text style={styles.inputLabel}>Capacidade</Text>
          <TextInput
            style={styles.textInput}
            value={formData.capacity}
            onChangeText={(text) => setFormData({...formData, capacity: text})}
            placeholder="Número de alunos"
            keyboardType="numeric"
          />
          
          <Text style={styles.inputLabel}>Tipo de Sala</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeSelector}>
            {roomTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.typeOption,
                  formData.type === type.key && styles.selectedType
                ]}
                onPress={() => setFormData({...formData, type: type.key})}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={styles.typeLabel}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <Text style={styles.inputLabel}>Equipamentos</Text>
          <TextInput
            style={styles.textInput}
            value={formData.equipment}
            onChangeText={(text) => setFormData({...formData, equipment: text})}
            placeholder="Separe por vírgulas: Projetor, Quadro, Computadores..."
            multiline
          />
          
          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
            placeholder="Descreva o propósito e características da sala..."
            multiline
            numberOfLines={3}
          />
          
          <Text style={styles.inputLabel}>Horários</Text>
          <TextInput
            style={styles.textInput}
            value={formData.schedule}
            onChangeText={(text) => setFormData({...formData, schedule: text})}
            placeholder="Separe por vírgulas: 08:00-10:00, 14:00-16:00..."
          />
          
          <Text style={styles.inputLabel}>Andar</Text>
          <TextInput
            style={styles.textInput}
            value={formData.floor}
            onChangeText={(text) => setFormData({...formData, floor: text})}
            placeholder="Ex: 1º Andar, 2º Andar..."
          />
          
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.formButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formButton, styles.submitButton]}
              onPress={onSubmit}
            >
              <Text style={styles.submitButtonText}>
                {title.includes('Criar') ? 'Criar Sala' : 'Salvar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Salas de Estudo</Text>
        <Text style={styles.subtitle}>Organize salas por professor e matéria</Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={openCreateModal}
        >
          <Text style={styles.createButtonText}>➕ Nova Sala</Text>
        </TouchableOpacity>
        <Text style={styles.roomCount}>
          {studyRooms.filter(room => room.active).length} salas ativas
        </Text>
      </View>

      <FlatList
        data={studyRooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id.toString()}
        style={styles.roomsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma sala cadastrada</Text>
            <Text style={styles.emptySubtext}>Toque em "Nova Sala" para começar</Text>
          </View>
        }
      />

      {/* Modal de detalhes da sala */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedRoom && (
              <>
                <Text style={styles.modalTitle}>
                  {getRoomTypeInfo(selectedRoom.type).icon} {selectedRoom.name}
                </Text>
                
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Matéria:</Text>
                  <Text style={styles.modalValue}>{selectedRoom.subject}</Text>
                </View>
                
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Professor:</Text>
                  <Text style={styles.modalValue}>{selectedRoom.professor}</Text>
                </View>
                
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Capacidade:</Text>
                  <Text style={styles.modalValue}>{selectedRoom.capacity} alunos</Text>
                </View>
                
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Localização:</Text>
                  <Text style={styles.modalValue}>{selectedRoom.floor}</Text>
                </View>
                
                <View style={styles.modalInfo}>
                  <Text style={styles.modalLabel}>Descrição:</Text>
                  <Text style={styles.modalValue}>{selectedRoom.description}</Text>
                </View>
                
                {selectedRoom.equipment.length > 0 && (
                  <View style={styles.modalInfo}>
                    <Text style={styles.modalLabel}>Equipamentos:</Text>
                    <Text style={styles.modalValue}>{selectedRoom.equipment.join(', ')}</Text>
                  </View>
                )}
                
                {selectedRoom.schedule.length > 0 && (
                  <View style={styles.modalInfo}>
                    <Text style={styles.modalLabel}>Horários:</Text>
                    <Text style={styles.modalValue}>{selectedRoom.schedule.join(', ')}</Text>
                  </View>
                )}
                
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de criação */}
      {renderFormModal(
        createModalVisible,
        () => setCreateModalVisible(false),
        createRoom,
        'Criar Nova Sala'
      )}

      {/* Modal de edição */}
      {renderFormModal(
        editModalVisible,
        () => setEditModalVisible(false),
        updateRoom,
        'Editar Sala'
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  createButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  roomCount: {
    fontSize: 14,
    color: '#666'
  },
  roomsList: {
    flex: 1,
    paddingHorizontal: 15
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderLeftWidth: 4
  },
  inactiveRoom: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5'
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  roomIcon: {
    fontSize: 24,
    marginRight: 10
  },
  roomInfo: {
    flex: 1
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  roomSubject: {
    fontSize: 14,
    color: '#4a90e2',
    marginBottom: 2
  },
  roomProfessor: {
    fontSize: 14,
    color: '#666'
  },
  roomActions: {
    flexDirection: 'row'
  },
  actionButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5
  },
  deleteButton: {
    backgroundColor: '#ffebee'
  },
  actionButtonText: {
    fontSize: 16
  },
  roomDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  roomDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  detailText: {
    fontSize: 12,
    color: '#666'
  },
  statusContainer: {
    alignItems: 'flex-end'
  },
  statusButton: {
    padding: 5
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center'
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 5
  },
  formModalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  modalInfo: {
    flexDirection: 'row',
    marginBottom: 10
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 100
  },
  modalValue: {
    fontSize: 16,
    color: '#666',
    flex: 1
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  typeSelector: {
    marginBottom: 10
  },
  typeOption: {
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 80
  },
  selectedType: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2'
  },
  typeIcon: {
    fontSize: 20,
    marginBottom: 5
  },
  typeLabel: {
    fontSize: 12,
    textAlign: 'center'
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  formButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#f44336'
  },
  submitButton: {
    backgroundColor: '#27ae60'
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default StudyRoomsScreen;