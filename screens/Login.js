import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    DarkenImg,
    ButtonContainer
} from './../components/styles';

const image = require('./../assets/img/eduardo-cano-photo-co-AzX5iNFYBMY-unsplash.jpg');

const Login = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <DarkenImg>
                    <Image style={styles.logo} source={require('./../assets/img/logo.png')} />
                </DarkenImg>
                {/* <Text style={styles.text}>Logo Placeholder</Text> */}
            </ImageBackground>
            {/* <ButtonContainer>

            </ButtonContainer> */}
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
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 250,
        resizeMode: "contain"
    }
});

export default Login;
