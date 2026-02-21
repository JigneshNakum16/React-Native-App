import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fontSize } from '../theme/colors';
import type { Category } from '../index';

interface CategoryChipProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getIconName = (iconName: string): string => {
    const iconMap: Record<string, string> = {
      grid: 'grid-outline',
      mobile: 'phone-portrait-outline',
      laptop: 'laptop-outline',
      headphones: 'headset-outline',
      watch: 'watch-outline',
      tablet: 'tablet-portrait-outline',
    };
    return iconMap[iconName] || 'grid-outline';
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
              onPress={() => onSelectCategory(category.name)}
              activeOpacity={0.7}
            >
              <Icon
                name={getIconName(category.icon)}
                size={18}
                color={isSelected ? colors.background : colors.primary}
                style={styles.chipIcon}
              />
              <Text
                style={[
                  styles.chipText,
                  isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipUnselected: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  chipIcon: {
    marginRight: spacing.xs,
  },
  chipText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.background,
  },
  chipTextUnselected: {
    color: colors.text,
  },
});

export default CategoryChip;
