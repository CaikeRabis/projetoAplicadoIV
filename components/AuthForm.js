const AuthForm = ({ isLogin, onToggle, onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
    return (
      <View style={styles.authForm}>
        <View style={styles.logoContainer}>
          <Ionicons name="book-outline" size={28} color="#4f46e5" />
          <Text style={styles.logoText}>ClassConnect</Text>
        </View>
        
        <Text style={styles.authTitle}>
          {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
        </Text>
        
        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome completo</Text>
              <View style={styles.inputContainer}>
                <Feather name="user" size={18} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome completo"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>
          )}
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={18} color="#9ca3af" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="seu.email@exemplo.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <View style={styles.passwordHeader}>
              <Text style={styles.inputLabel}>Senha</Text>
              {isLogin && (
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={18} color="#9ca3af" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={18} 
                  color="#9ca3af" 
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSubmit}
          >
            <Text style={styles.submitButtonText}>
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.authToggle}>
          <Text style={styles.authToggleText}>
            {isLogin ? 'Novo no ClassConnect?' : 'Já tem uma conta?'}{' '}
          </Text>
          <TouchableOpacity onPress={onToggle}>
            <Text style={styles.authToggleButton}>
              {isLogin ? 'Cadastre-se' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  