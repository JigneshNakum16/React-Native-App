import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../theme/theme';

interface FormContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  backgroundColor = Colors.background,
  padding = true,
  ...scrollViewProps
}) => {
  const content = (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        !padding && styles.noPadding,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  noPadding: {
    padding: 0,
  },
});

export default FormContainer;
