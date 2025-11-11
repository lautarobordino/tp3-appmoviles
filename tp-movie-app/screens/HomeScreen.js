import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';

const API_KEY = "2b4f0fba47848521386376180c4e4af6";
const MOVIE_ID = 19995;

export default function HomeScreen({ navigation }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, []);

  if (!movie) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.8} 
        onPress={() => navigation.navigate("Detail", { movie })}
      >
        <Image 
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
          resizeMode="cover"
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={4}>{movie.overview}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  card: { 
    width: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    alignItems: 'center'
  },
  poster: { 
    width: 250, 
    height: 370, 
    borderRadius: 12, 
    marginBottom: 15 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  overview: { 
    fontSize: 15, 
    color: '#555', 
    textAlign: 'center' 
  }
});