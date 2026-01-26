import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Clipboard from '@react-native-clipboard/clipboard';
import SplashScreen from 'react-native-splash-screen';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password length must be at least 4')
    .max(16, 'Password length must be at most 16')
    .required('Password length is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  useEffect(() => {
    // Hide splash screen after component mounts
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (numbers) {
      characterList += numberChars;
    }
    if (symbols) {
      characterList += symbolChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (character: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * character.length);
      result += character.charAt(randomIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(password);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Password copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied!', 'Password copied to clipboard');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Text style={styles.subtitle}>Create strong & secure passwords</Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              generatePasswordString(Number(values.passwordLength));
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Password Length</Text>
                  <TextInput
                    style={styles.input}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    onBlur={handleBlur('passwordLength')}
                    placeholder="Ex. 8"
                    placeholderTextColor="#7f8c8d"
                    keyboardType="numeric"
                  />
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <View style={styles.checkboxSection}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.checkboxLabel}>Include Lowercase</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                      size={28}
                      iconStyle={styles.checkboxIcon}
                    />
                  </View>

                  <View style={styles.checkboxRow}>
                    <Text style={styles.checkboxLabel}>Include Uppercase</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#FED85D"
                      size={28}
                      iconStyle={styles.checkboxIcon}
                    />
                  </View>

                  <View style={styles.checkboxRow}>
                    <Text style={styles.checkboxLabel}>Include Numbers</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#C9A0DC"
                      size={28}
                      iconStyle={styles.checkboxIcon}
                    />
                  </View>

                  <View style={styles.checkboxRow}>
                    <Text style={styles.checkboxLabel}>Include Symbols</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#FC80A5"
                      size={28}
                      iconStyle={styles.checkboxIcon}
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={[
                      styles.primaryButton,
                      !isValid && styles.disabledButton,
                    ]}
                    activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                    style={styles.secondaryButton}
                    activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPassGenerated && (
          <TouchableOpacity
            style={styles.passwordContainer}
            onPress={copyToClipboard}
            activeOpacity={0.7}>
            <Text style={styles.passwordLabel}>Generated Password:</Text>
            <Text style={styles.password}>{password}</Text>
            <Text style={styles.copyHint}>Tap to copy</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#e94560',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 0.8,
  },
  formContainer: {
    marginTop: 10,
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e94560',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
    marginTop: 6,
  },
  inputWrapper: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#533483',
  },
  checkboxSection: {
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f3460',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#533483',
    minHeight: 56,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
    marginRight: 16,
  },
  checkboxIcon: {
    borderRadius: 50,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#e94560',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e94560',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
    minHeight: 54,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#533483',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#533483',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
    minHeight: 54,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#7f8c8d',
    opacity: 0.5,
  },
  passwordContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  passwordLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e94560',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  password: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  copyHint: {
    fontSize: 11,
    fontWeight: '500',
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});
