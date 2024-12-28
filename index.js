import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Video,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  ActivityIndicator // Importa ActivityIndicator
} from 'react-native';

const VideoViewer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://localhost/get_videos.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error al cargar los videos:', error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setLoading(false); // Establece loading a false una vez que la carga finaliza
      }
    };

    fetchVideos();
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartY(e.nativeEvent.pageY);
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.nativeEvent.pageY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        showVideo(currentVideoIndex + 1);
      } else {
        showVideo(currentVideoIndex - 1);
      }
    }
  };

  const showVideo = (index) => {
    if (index < 0) index = videos.length - 1;
    if (index >= videos.length) index = 0;
    setCurrentVideoIndex(index);
  };

  const handleLikePress = async (videoId) => {
    setLikes(prevLikes => ({ ...prevLikes, [videoId]: !prevLikes[videoId] }));
    try {
      const response = await fetch('https://localhost/like_video.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error al enviar el like:', error);
      // Revertir el estado del like en caso de error
      setLikes(prevLikes => ({ ...prevLikes, [videoId]: !prevLikes[videoId] }));
    }
  };

  const handleDislikePress = async (videoId) => {
      setDislikes(prevDislikes => ({ ...prevDislikes, [videoId]: !prevDislikes[videoId] }));
    try {
      const response = await fetch('https://localhost/dislike_video.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error al enviar el dislike:', error);
        setDislikes(prevDislikes => ({ ...prevDislikes, [videoId]: !prevDislikes[videoId] }));
    }
  };

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Error al abrir el enlace:', err));
    }
  };

  if (loading) {
      return (
          <View style={[styles.container, styles.loadingContainer]}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>Cargando videos...</Text>
          </View>
      );
  }

  if (videos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hay videos disponibles.</Text>
      </View>
    );
  }

  const currentVideo = videos[currentVideoIndex];
  const videoId = currentVideo ? currentVideo.id : null;

    if (!videoId) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Cargando video...</Text>
            </View>
        );
    }

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderStart={handleTouchStart}
      onResponderRelease={handleTouchEnd}
    >
