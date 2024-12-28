import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Video,
  TouchableOpacity,
  GestureResponderHandlers,
  Dimensions,
} from 'react-native';

const VideoViewer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    // Carga de videos desde el servidor
    fetch('https://localhost/videos.php')
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error('Error al cargar los videos:', error);
      });
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

  if (videos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hay videos disponibles.</Text>
      </View>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderStart={handleTouchStart}
      onResponderRelease={handleTouchEnd}
    >
      <View style={styles.videoWrapper}>
        <Video
          source={{ uri: currentVideo.url_video }}
          style={styles.video}
          resizeMode="contain"
          repeat
          controls={false}
          autoplay
        />
      </View>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => openLink(currentVideo.url_facebook)}>
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(currentVideo.url_youtube)}>
          <Text style={styles.link}>Youtube</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(currentVideo.url_instagram)}>
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(currentVideo.url_linkedin)}>
          <Text style={styles.link}>Linkedin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const openLink = (url) => {
  // Abrir enlaces en el navegador
  Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  socialIcons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
  },
  link: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default VideoViewer;
