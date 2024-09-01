import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {/* SVG as the background of the entire Tab Bar */}
      <Svg
        width={width + 20}  // Slightly wider to avoid gaps on the sides
        height="80"
        viewBox="0 0 402 66"
        style={styles.svgStyle}
      >
        <Path
          fill="#15718e"
          d="M165.826 28.399C157.947 13.6652 145.337 0 128.629 0H-1V75H403V0H267.368C250.661 0 238.051 13.6628 230.174 28.396C221.757 44.1407 208.274 50 198 50C187.727 50 174.243 44.1415 165.826 28.399Z"
        />
      </Svg>

      <View style={styles.tabItemsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const iconName = route.name === 'Home'
            ? isFocused ? 'home' : 'home-outline'
            : route.name === 'Settings'
            ? isFocused ? 'settings' : 'settings-outline'
            : route.name === 'Accounts'
            ? isFocused ? 'person' : 'person-outline'
            : isFocused ? 'menu' : 'menu-outline';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Ionicons name={iconName} size={24} color={isFocused ? 'gray' : '#fff'} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  tabItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'transparent', // Make background transparent to show SVG
    height: 80,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
