const Card = ({ icon, title, subtitle, color }) => {
    const iconColors = {
      indigo: '#4f46e5',
      blue: '#3b82f6',
      purple: '#7e22ce',
      red: '#ef4444',
      amber: '#f59e0b',
      green: '#22c55e',
      teal: '#14b8a6'
    };
    
    const bgColors = {
      indigo: '#eef2ff',
      blue: '#eff6ff',
      purple: '#f5f3ff',
      red: '#fef2f2',
      amber: '#fffbeb',
      green: '#f0fdf4',
      teal: '#f0fdfa'
    };
    
    const iconBgColors = {
      indigo: '#e0e7ff',
      blue: '#dbeafe',
      purple: '#ede9fe',
      red: '#fee2e2',
      amber: '#fef3c7',
      green: '#dcfce7',
      teal: '#ccfbf1'
    };
    
    const IconComponent = icon;
    
    return (
      <View style={[styles.card, { backgroundColor: bgColors[color] }]}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColors[color] }]}>
          <IconComponent name={IconComponent.name} size={20} color={iconColors[color]} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </View>
    );
  };