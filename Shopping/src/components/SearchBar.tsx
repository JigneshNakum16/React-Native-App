import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../theme/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search products...',
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleFocus = () => {
    if (!value) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  const clearButtonOpacity = value ? 1 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchLine} />
          </View>
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          onFocus={handleFocus}
        />
        <TouchableOpacity
          style={[styles.clearButton, { opacity: clearButtonOpacity }]}
          onPress={handleClear}
          activeOpacity={0.7}
          disabled={!value}
        >
          <View style={styles.clearIcon}>
            <View style={styles.clearLine1} />
            <View style={styles.clearLine2} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  iconContainer: {
    marginRight: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchCircle: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    top: 0,
    left: 0,
  },
  searchLine: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: colors.textSecondary,
    bottom: 2,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 16,
    height: 16,
  },
  clearLine1: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: colors.textSecondary,
    top: 7,
    transform: [{ rotate: '45deg' }],
  },
  clearLine2: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: colors.textSecondary,
    top: 7,
    transform: [{ rotate: '-45deg' }],
  },
});

export default SearchBar;
