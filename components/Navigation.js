const BottomNavigation = () => {
    return (
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Ionicons name="home" size={24} color="#4f46e5" />
          <Text style={[styles.navText, styles.navActive]}>Início</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="book-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Cursos</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Agenda</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Perfil</Text>
        </View>
      </View>
    );
  };
  