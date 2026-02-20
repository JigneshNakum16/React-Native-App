import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing } from '../theme/colors';
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
  const getIcon = (iconName: string) => {
    // Simple icon representations using shapes
    switch (iconName) {
      case 'grid':
        return (
          <View style={styles.iconGrid}>
            <View style={styles.gridDot} />
            <View style={styles.gridDot} />
            <View style={styles.gridDot} />
            <View style={styles.gridDot} />
          </View>
        );
      case 'mobile':
        return (
          <View style={styles.iconPhone}>
            <View style={styles.phoneScreen} />
          </View>
        );
      case 'laptop':
        return (
          <View style={styles.iconLaptop}>
            <View style={styles.laptopScreen} />
            <View style={styles.laptopBase} />
          </View>
        );
      case 'headphones':
        return (
          <View style={styles.iconHeadphone}>
            <View style={styles.headphoneBand} />
            <View style={styles.headphoneCup} />
            <View style={styles.headphoneCup} />
          </View>
        );
      case 'watch':
        return (
          <View style={styles.iconWatch}>
            <View style={styles.watchFace} />
            <View style={styles.watchBand} />
          </View>
        );
      case 'tablet':
        return (
          <View style={styles.iconTablet}>
            <View style={styles.tabletScreen} />
          </View>
        );
      default:
        return null;
    }
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
              <View
                style={[
                  styles.iconContainer,
                  isSelected ? styles.iconContainerSelected : null,
                ]}
              >
                {getIcon(category.icon)}
              </View>
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
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipUnselected: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  iconContainerSelected: {
    opacity: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.background,
  },
  chipTextUnselected: {
    color: colors.text,
  },
  // Grid icon
  iconGrid: {
    width: 16,
    height: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  gridDot: {
    width: 6,
    height: 6,
    borderRadius: 2,
    backgroundColor: 'currentColor',
    margin: 1,
  },
  // Phone icon
  iconPhone: {
    width: 12,
    height: 18,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: 'currentColor',
  },
  phoneScreen: {
    width: 8,
    height: 12,
    backgroundColor: 'currentColor',
    margin: 2,
    marginTop: 3,
    borderRadius: 1,
    opacity: 0.3,
  },
  // Laptop icon
  iconLaptop: {
    width: 18,
    height: 14,
  },
  laptopScreen: {
    width: 18,
    height: 10,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: 'currentColor',
  },
  laptopBase: {
    width: 20,
    height: 2,
    backgroundColor: 'currentColor',
    marginLeft: -1,
    borderRadius: 1,
  },
  // Headphone icon
  iconHeadphone: {
    width: 18,
    height: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headphoneBand: {
    position: 'absolute',
    width: 16,
    height: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'currentColor',
    borderBottomWidth: 0,
    left: 1,
  },
  headphoneCup: {
    width: 6,
    height: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: 'currentColor',
  },
  // Watch icon
  iconWatch: {
    width: 16,
    height: 16,
  },
  watchFace: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'currentColor',
    alignSelf: 'center',
  },
  watchBand: {
    width: 8,
    height: 4,
    backgroundColor: 'currentColor',
    alignSelf: 'center',
    marginTop: -1,
    borderRadius: 2,
  },
  // Tablet icon
  iconTablet: {
    width: 16,
    height: 18,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: 'currentColor',
  },
  tabletScreen: {
    width: 12,
    height: 14,
    backgroundColor: 'currentColor',
    margin: 2,
    marginTop: 2,
    borderRadius: 1,
    opacity: 0.3,
  },
});

export default CategoryChip;
