import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from "react-native";

export const Post = () => {
    return (
        <View>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Path d="M28.7075 7.29255L24.7075 3.29255C24.6146 3.19958 24.5043 3.12582 24.3829 3.07549C24.2615 3.02517 24.1314 2.99927 24 2.99927C23.8686 2.99927 23.7385 3.02517 23.6171 3.07549C23.4957 3.12582 23.3854 3.19958 23.2925 3.29255L11.2925 15.2926C11.1997 15.3855 11.1261 15.4958 11.0759 15.6172C11.0257 15.7386 10.9999 15.8687 11 16.0001V20.0001C11 20.2653 11.1054 20.5196 11.2929 20.7072C11.4804 20.8947 11.7348 21.0001 12 21.0001H16C16.1314 21.0002 16.2615 20.9744 16.3829 20.9242C16.5042 20.874 16.6146 20.8004 16.7075 20.7076L28.7075 8.70755C28.8005 8.61468 28.8742 8.50439 28.9246 8.38299C28.9749 8.2616 29.0008 8.13147 29.0008 8.00005C29.0008 7.86864 28.9749 7.73851 28.9246 7.61711C28.8742 7.49572 28.8005 7.38543 28.7075 7.29255ZM15.5863 19.0001H13V16.4138L21 8.4138L23.5863 11.0001L15.5863 19.0001ZM25 9.5863L22.4137 7.00005L24 5.4138L26.5863 8.00005L25 9.5863ZM28 15.0001V26.0001C28 26.5305 27.7893 27.0392 27.4142 27.4143C27.0391 27.7893 26.5304 28.0001 26 28.0001H6C5.46957 28.0001 4.96086 27.7893 4.58579 27.4143C4.21071 27.0392 4 26.5305 4 26.0001V6.00005C4 5.46962 4.21071 4.96091 4.58579 4.58584C4.96086 4.21077 5.46957 4.00005 6 4.00005H17C17.2652 4.00005 17.5196 4.10541 17.7071 4.29295C17.8946 4.48048 18 4.73484 18 5.00005C18 5.26527 17.8946 5.51962 17.7071 5.70716C17.5196 5.8947 17.2652 6.00005 17 6.00005H6V26.0001H26V15.0001C26 14.7348 26.1054 14.4805 26.2929 14.2929C26.4804 14.1054 26.7348 14.0001 27 14.0001C27.2652 14.0001 27.5196 14.1054 27.7071 14.2929C27.8946 14.4805 28 14.7348 28 15.0001Z" fill="#14161B"/>
            </Svg>
        </View>
    );
}