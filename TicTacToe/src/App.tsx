import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import GameCell from './components/GameCell';
import { tapSound, winSound, tieSound } from './components/Sounds';

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [isCross, setIsCross] = useState(false);
  const [gameWinner, setGameWinner] = useState('');
  const [gameState, setGameState] = useState<string[]>(Array(9).fill('empty'));
  const [winningLine, setWinningLine] = useState<number[]>([]);

  const winnerAnim = useRef(new Animated.Value(0)).current;

  const animateWinner = () => {
    Animated.spring(winnerAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(Array(9).fill('empty'));
    winnerAnim.setValue(0);
  };

  useEffect(() => {
    checkWinner();
  }, [gameState]);

  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        gameState[a] !== 'empty' &&
        gameState[a] === gameState[b] &&
        gameState[b] === gameState[c]
      ) {
        setWinningLine(pattern);
        setGameWinner(`${gameState[a]} won`);
        winSound.play();
        animateWinner();
        return;
      }
    }

    if (!gameState.includes('empty')) {
      setGameWinner('Game Tied');
      tieSound.play();
    }
  };

  const onChangeItem = (index: number) => {
    if (gameWinner) {
      Snackbar.show({
        text: 'Game already finished. Restart to play again.',
        backgroundColor: 'red',
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    if (gameState[index] !== 'empty') {
      Snackbar.show({
        text: 'Position already filled!',
        backgroundColor: 'red',
        textColor: 'white',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    // ✅ PLAY TAP SOUND HERE
    tapSound.stop(() => {
      tapSound.play();
    });

    const newGameState = [...gameState];
    newGameState[index] = isCross ? 'cross' : 'circle';

    setGameState(newGameState);
    setIsCross(!isCross);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Tic Tac Toe</Text>

      {gameWinner ? (
        <Animated.View
          style={[
            styles.winnerInfo,
            {
              transform: [
                {
                  scale: winnerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
              opacity: winnerAnim,
            },
          ]}
        >
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
          <Pressable onPress={reloadGame}>
            <Text style={styles.gameBtnText}>Restart Game</Text>
          </Pressable>
        </Animated.View>
      ) : (
        <View
          style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}
        >
          <Text style={styles.gameTurnTxt}>
            {isCross ? "X's Turn" : "O's Turn"}
          </Text>
        </View>
      )}

      <FlatList
        data={gameState}
        numColumns={3}
        style={styles.grid}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <GameCell
            value={item}
            highlight={winningLine.includes(index)}
            onPress={() => onChangeItem(index)}
          />
        )}
      />

      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>Reload Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    color: '#2C3335',
  },

  playerInfo: {
    height: 56,
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  playerX: {
    backgroundColor: '#38CC77',
  },

  playerO: {
    backgroundColor: '#F7CD2E',
  },

  gameTurnTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  grid: {
    marginTop: 20,
    marginHorizontal: 12,
    alignSelf: 'center',
  },

  winnerInfo: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#38CC77',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  winnerTxt: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    marginBottom: 10,
  },

  gameBtn: {
    marginTop: 20,
    marginHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#8D3DAF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  gameBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
