import { View, StyleSheet } from 'react-native';
import { ResizeMode, Video } from 'expo-av'
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

export default function Splash() {

    const navigation = useNavigation();
    const videoRef = useRef(null);

    const handleVideoEnd = () => {

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes:[{ name: 'Login' }],
            })
        );
            
    };

 return (
        <Video
            style={StyleSheet.absoluteFill}
            ref={videoRef}
            resizeMode={ResizeMode.COVER}
            source={require('../../../src/Assets/SimuQuestion.mp4')}
            isLooping={false}
            shouldPlay={true}
            onPlaybackStatusUpdate={
                (status) => {
                    if (status.didJustFinish) {
                        handleVideoEnd();
                    }
                }
            }
        />
  );
}