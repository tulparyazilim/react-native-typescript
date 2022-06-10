/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Keyboard, Pressable, ScrollView, View} from 'react-native';
import {getStyleShortcuts} from '../../../utils/StyleShortcut';
import layout from '../../../config/layout.json';
import {window, bottomTabHeight, COLORS} from '@theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../navigation/components/DefaultHeader';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  scroll?: boolean;
  safe?: boolean;
  keyboardScroll?: boolean;
};

export const Screen: FC<Props | any> = ({children, ...props}) => {
  const {scroll, safe, keyboardScroll} = props;
  const navigation = useNavigation();

  const screenCommonStyles = {
    padding: window.offset,
    paddingBottom: layout.menu === 'bottom' && bottomTabHeight + window.offset,
    flex: 1,
    backgroundColor: COLORS.screenBgColor,
  };

  return (
    <>
      <Header navigation={navigation} />
      {scroll && safe && (
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={[
            {...screenCommonStyles},
            {
              backgroundColor: COLORS.screenBgColor,
              paddingBottom: layout.menu === 'bottom' && bottomTabHeight,
            },
            getStyleShortcuts(props),
          ]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SafeAreaView>{children}</SafeAreaView>
          </ScrollView>
        </Pressable>
      )}
      {scroll && !safe && (
        <ScrollView
          style={{...screenCommonStyles}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Pressable
            style={{
              minHeight: '100%',
            }}
            onPress={() => Keyboard.dismiss()}>
            <View
              style={[
                {
                  paddingBottom:
                    layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                },
                getStyleShortcuts(props),
              ]}>
              {children}
            </View>
          </Pressable>
        </ScrollView>
      )}
      {!scroll && safe && (
        <SafeAreaView
          style={[
            {
              ...screenCommonStyles,
            },
            {...getStyleShortcuts(props)},
          ]}>
          <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
            {children}
          </Pressable>
        </SafeAreaView>
      )}
      {keyboardScroll && (
        <KeyboardAwareScrollView
          style={{...screenCommonStyles}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={scroll}
          contentContainerStyle={{...getStyleShortcuts(props)}}>
          <Pressable
            style={{
              minHeight: '100%',
            }}
            onPress={() => Keyboard.dismiss()}>
            <View
              style={[
                {
                  flex: 1,
                  paddingBottom:
                    layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                },
                getStyleShortcuts(props),
              ]}>
              {children}
            </View>
          </Pressable>
        </KeyboardAwareScrollView>
      )}
      {keyboardScroll && safe && (
        <KeyboardAwareScrollView
          style={[
            {
              ...screenCommonStyles,
            },
            {...getStyleShortcuts(props)},
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
          }}
          scrollEnabled={scroll}>
          {children}
        </KeyboardAwareScrollView>
      )}
      {!scroll && !safe && !keyboardScroll && (
        <Pressable
          style={[
            {
              ...screenCommonStyles,
              flex: 1,
            },
            {...getStyleShortcuts(props)},
          ]}
          onPress={() => Keyboard.dismiss()}>
          {children}
        </Pressable>
      )}
    </>
  );
};
