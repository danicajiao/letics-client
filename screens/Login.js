import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle
// } from './../components/styles';

const image = require('./../assets/img/eduardo-cano-photo-co-AzX5iNFYBMY-unsplash.jpg');

const Login = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Logo Placeholder</Text>

            </ImageBackground>
        </View>
        // <StyledContainer>
        //     <InnerContainer>
        //         <PageLogo resizeMode="cover" source={require('./../assets/img/eduardo-cano-photo-co-AzX5iNFYBMY-unsplash.jpg')} />
        //         <PageTitle>letics</PageTitle>
        //     </InnerContainer>
        // </StyledContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});

export default Login;
