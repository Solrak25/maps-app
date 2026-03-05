import { Pressable, StyleSheet, Text } from 'react-native'

const ThemedPressable = ({ texto, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.btnPrimary,
                { opacity: pressed ? 0.7 : 1 }
            ]}
        >
            <Text style={{ color: '#ffffff' }}>{texto}</Text>
        </Pressable>
    )
}

export default ThemedPressable

const styles = StyleSheet.create({
    btnPrimary: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        margin: 10,
    }
})