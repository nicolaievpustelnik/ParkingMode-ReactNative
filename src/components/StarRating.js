import React from 'react';
import { View, Text } from 'react-native';

export default function StarRating({ rating = 0, maxStars = 5, starSize = 14, fullStarColor = '#e8b100' }) {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
        const full = rating >= i - 0.25;
        const half = !full && rating >= i - 0.75;
        stars.push(
            <Text key={i} style={{ fontSize: starSize, color: fullStarColor, opacity: full ? 1 : half ? 0.6 : 0.25 }}>
                {'★'}
            </Text>
        );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}
