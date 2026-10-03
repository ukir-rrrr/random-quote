import useFetchQuote from '@/hooks/use-fetch-quote';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  const { quote, loading, error, refetch } = useFetchQuote();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>ランダム名言</Text>
      <View style={styles.quoteContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <Text style={styles.quote}>{quote?.content}</Text>
            {quote?.contentJa ? (
              <Text style={styles.quoteJa}>{quote.contentJa}</Text>
            ) : (
              <Text style={styles.translationFallback}>（日本語訳を取得できませんでした）</Text>
            )}
            <Text style={styles.author}>— {quote?.author}</Text>
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={refetch}
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}>
        <Text style={styles.buttonText}>次の名言を取得</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  quoteContainer: {
    minHeight: 120,
    marginBottom: 32,
    justifyContent: 'center',
  },
  quote: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
  },
  quoteJa: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  translationFallback: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  author: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
  },
  error: {
    color: '#c00',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
  },
});
