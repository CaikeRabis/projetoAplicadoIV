const SignupScreen = ({ navigation }) => {
    const toggleAuth = () => {
      navigation.navigate('Login');
    };
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <AuthForm isLogin={false} onToggle={toggleAuth} onSubmit={() => {}} />
          
          <View style={styles.imagesContainer}>
            <View style={styles.imageBox}>
              <View style={styles.imagePlaceholder} />
            </View>
            <View style={styles.imageBox}>
              <View style={styles.imagePlaceholder} />
            </View>
            <View style={styles.imageBox}>
              <View style={styles.imagePlaceholder} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };