import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Image,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MaterialScreen = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({});
  const [photos, setPhotos] = useState({});
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Dados das matérias/professores
  const subjects = [
    {
      id: 1,
      name: 'Cálculo I',
      professor: 'Prof. Maria Silva',
      icon: '📐',
      color: '#4CAF50'
    },
    {
      id: 2,
      name: 'Física Geral',
      professor: 'Prof. João Santos',
      icon: '⚡',
      color: '#2196F3'
    },
    {
      id: 3,
      name: 'Programação',
      professor: 'Prof. Ana Costa',
      icon: '💻',
      color: '#FF9800'
    },
    {
      id: 4,
      name: 'Química Orgânica',
      professor: 'Prof. Carlos Lima',
      icon: '🧪',
      color: '#9C27B0'
    },
    {
      id: 5,
      name: 'Álgebra Linear',
      professor: 'Prof. Lucia Ferreira',
      icon: '📊',
      color: '#F44336'
    },
    {
      id: 6,
      name: 'Mecânica',
      professor: 'Prof. Roberto Alves',
      icon: '⚙️',
      color: '#607D8B'
    }
  ];

  const openCommentModal = (subject) => {
    setSelectedSubject(subject);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubject(null);
    setNewComment('');
  };

  const addComment = () => {
    if (newComment.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite um comentário válido.');
      return;
    }

    const today = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const comment = {
      id: Date.now(),
      text: newComment.trim(),
      date: today,
      time: time
    };

    setComments(prev => ({
      ...prev,
      [selectedSubject.id]: [...(prev[selectedSubject.id] || []), comment]
    }));

    Alert.alert('Sucesso', 'Comentário adicionado com sucesso!');
    closeModal();
  };

  const getSubjectComments = (subjectId) => {
    return comments[subjectId] || [];
  };

  const getSubjectPhotos = (subjectId) => {
    return photos[subjectId] || [];
  };

  // Função para solicitar permissões
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert(
        'Permissões necessárias',
        'Este app precisa de acesso à câmera e galeria para funcionar corretamente.'
      );
      return false;
    }
    return true;
  };

  // Função para mostrar opções de foto
  const showPhotoOptions = () => {
    Alert.alert(
      'Adicionar Foto do Quadro',
      'Escolha uma opção:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Câmera', onPress: takePhoto },
        { text: 'Galeria', onPress: chooseFromLibrary }
      ]
    );
  };

  // Função para abrir a câmera
  const takePhoto = async () => {
    console.log('Iniciando takePhoto...');
    
    try {
      const hasPermissions = await requestPermissions();
      if (!hasPermissions) {
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Resultado da câmera:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        addPhoto(result.assets[0]);
      }
    } catch (error) {
      console.error('Erro ao abrir câmera:', error);
      Alert.alert('Erro', 'Não foi possível abrir a câmera');
    }
  };

  // Função para escolher da galeria
  const chooseFromLibrary = async () => {
    console.log('Iniciando chooseFromLibrary...');
    
    try {
      const hasPermissions = await requestPermissions();
      if (!hasPermissions) {
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Resultado da galeria:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        addPhoto(result.assets[0]);
      }
    } catch (error) {
      console.error('Erro ao abrir galeria:', error);
      Alert.alert('Erro', 'Não foi possível abrir a galeria');
    }
  };

  // Função para adicionar foto
  const addPhoto = (imageAsset) => {
    console.log('Adicionando foto:', imageAsset);
    
    if (!selectedSubject) {
      Alert.alert('Erro', 'Nenhuma matéria selecionada');
      return;
    }

    const today = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const photo = {
      id: Date.now(),
      uri: imageAsset.uri,
      date: today,
      time: time,
      fileName: `foto_${Date.now()}.jpg`
    };

    setPhotos(prev => ({
      ...prev,
      [selectedSubject.id]: [...(prev[selectedSubject.id] || []), photo]
    }));

    console.log('Foto adicionada com sucesso:', photo);
    Alert.alert('Sucesso', 'Foto adicionada com sucesso!');
  };

  // Função para visualizar foto em tela cheia
  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setPhotoModalVisible(true);
  };

  const closePhotoModal = () => {
    setPhotoModalVisible(false);
    setSelectedPhoto(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Material de Aula</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Selecione uma matéria para adicionar comentários sobre a aula
        </Text>

        <View style={styles.subjectsContainer}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[styles.subjectCard, { borderLeftColor: subject.color }]}
              onPress={() => openCommentModal(subject)}
            >
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.professorName}>{subject.professor}</Text>
                </View>
                <View style={styles.commentBadge}>
                  <Text style={styles.commentCount}>
                    {getSubjectComments(subject.id).length}
                  </Text>
                </View>
                <View style={styles.photoBadge}>
                  <Text style={styles.photoIcon}>📷</Text>
                  <Text style={styles.photoCount}>
                    {getSubjectPhotos(subject.id).length}
                  </Text>
                </View>
              </View>
              
              {getSubjectComments(subject.id).length > 0 && (
                <View style={styles.lastCommentContainer}>
                  <Text style={styles.lastCommentLabel}>Último comentário:</Text>
                  <Text style={styles.lastCommentText} numberOfLines={2}>
                    {getSubjectComments(subject.id)[getSubjectComments(subject.id).length - 1].text}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Comentário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedSubject?.name}
              </Text>
              <Text style={styles.modalSubtitle}>
                {selectedSubject?.professor}
              </Text>
            </View>

            {/* Comentários existentes */}
            <ScrollView style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Comentários e Fotos:</Text>
              
              {/* Seção de Fotos */}
              {getSubjectPhotos(selectedSubject?.id || 0).length > 0 && (
                <View style={styles.photosContainer}>
                  <Text style={styles.sectionTitle}>📷 Fotos do Quadro:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {getSubjectPhotos(selectedSubject?.id || 0).map((photo) => (
                      <TouchableOpacity
                        key={photo.id}
                        style={styles.photoThumbnail}
                        onPress={() => openPhotoModal(photo)}
                      >
                        <Image source={{ uri: photo.uri }} style={styles.thumbnailImage} />
                        <Text style={styles.photoDate}>{photo.date}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Seção de Comentários */}
              <View style={styles.commentsContainer}>
                <Text style={styles.sectionTitle}>💬 Comentários:</Text>
                {getSubjectComments(selectedSubject?.id || 0).length === 0 ? (
                  <Text style={styles.noCommentsText}>
                    Nenhum comentário ainda.
                  </Text>
                ) : (
                  getSubjectComments(selectedSubject?.id || 0).map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentDate}>
                          {comment.date} às {comment.time}
                        </Text>
                      </View>
                      <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>

            {/* Área de novo comentário */}
            <View style={styles.newCommentSection}>
              <Text style={styles.newCommentLabel}>Adicionar comentário sobre a aula:</Text>
              <TextInput
                style={styles.commentInput}
                multiline={true}
                numberOfLines={4}
                placeholder="Digite seu comentário sobre a aula de hoje..."
                value={newComment}
                onChangeText={setNewComment}
                textAlignVertical="top"
              />
            </View>

            {/* Botões do Modal */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.photoButton]}
                onPress={showPhotoOptions}
              >
                <Text style={styles.photoButtonText}>📷 Foto do Quadro</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>Fechar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.addButton]}
                onPress={addComment}
              >
                <Text style={styles.addButtonText}>Adicionar Comentário</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Visualização de Foto */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={photoModalVisible}
        onRequestClose={closePhotoModal}
      >
        <View style={styles.photoModalOverlay}>
          <View style={styles.photoModalContainer}>
            <TouchableOpacity 
              style={styles.closePhotoButton}
              onPress={closePhotoModal}
            >
              <Text style={styles.closePhotoButtonText}>✕</Text>
            </TouchableOpacity>
            
            {selectedPhoto && (
              <>
                <Image 
                  source={{ uri: selectedPhoto.uri }} 
                  style={styles.fullSizeImage}
                  resizeMode="contain"
                />
                <View style={styles.photoInfo}>
                  <Text style={styles.photoInfoText}>
                    📅 {selectedPhoto.date} às {selectedPhoto.time}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  backButton: {
    marginRight: 15
  },
  backButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: '500'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1
  },
  content: {
    flex: 1,
    padding: 20
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22
  },
  subjectsContainer: {
    gap: 15
  },
  subjectCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subjectIcon: {
    fontSize: 24,
    marginRight: 15
  },
  subjectInfo: {
    flex: 1
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  professorName: {
    fontSize: 14,
    color: '#666'
  },
  commentBadge: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  commentCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  photoBadge: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    minWidth: 48,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginLeft: 8
  },
  photoIcon: {
    fontSize: 12,
    marginRight: 4
  },
  photoCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  lastCommentContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  lastCommentLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5
  },
  lastCommentText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic'
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    maxHeight: '80%',
    width: '90%'
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666'
  },
  commentsSection: {
    maxHeight: 300,
    padding: 20
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15
  },
  photosContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10
  },
  photoThumbnail: {
    marginRight: 10,
    alignItems: 'center'
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0'
  },
  photoDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center'
  },
  commentsContainer: {
    marginTop: 10
  },
  noCommentsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  commentItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  commentHeader: {
    marginBottom: 8
  },
  commentDate: {
    fontSize: 12,
    color: '#666'
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20
  },
  newCommentSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  newCommentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10
  },
  commentInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  modalButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 8,
    flexWrap: 'wrap'
  },
  modalButton: {
    flex: 1,
    minWidth: 100,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  photoButton: {
    backgroundColor: '#FF9800',
    flex: 1,
    minWidth: 140
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500'
  },
  addButton: {
    backgroundColor: '#4a90e2'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  // Estilos do Modal de Foto
  photoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoModalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  closePhotoButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  closePhotoButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  fullSizeImage: {
    width: '90%',
    height: '70%',
    borderRadius: 8
  },
  photoInfo: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  photoInfoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  }
});

export default MaterialScreen;