import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailScreen({ route }) {
  const { movie } = route.params;
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }} edges={['left', 'right', 'bottom']}>
      <ScrollView 
        style={styles.container}
      >
        <Image 
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          style={[styles.banner, { width: screenWidth, height: screenWidth * 0.56 }]} 
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title}>🎬 {movie.title}</Text>

          <View style={styles.detailItem}>
            <Text style={styles.label}>📅 Fecha de estreno:</Text>
            <Text style={styles.value}>{movie.release_date}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailItem}>
            <Text style={styles.label}>⏱️ Duración:</Text>
            <Text style={styles.value}>{movie.runtime} min</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailItem}>
            <Text style={styles.label}>🌎 Idioma original:</Text>
            <Text style={styles.value}>{movie.original_language.toUpperCase()}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailItem}>
            <Text style={styles.label}>⭐ Puntuación:</Text>
            <Text style={styles.value}>{movie.vote_average} / 10</Text>
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>📝 Sinopsis</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  banner: { marginBottom: 15 },
  content: { padding: 20 },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  detailItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10 
  },
  label: { fontSize: 16, fontWeight: '600' },
  value: { fontSize: 16, color: '#444' },
  separator: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    marginVertical: 8 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 10 
  },
  overview: { fontSize: 15, color: '#555', lineHeight: 22 }
});
