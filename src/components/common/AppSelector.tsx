import React, {memo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {COLORS, Block, Text} from '@theme';
import AppIcon, {IconTypes} from './AppIcon';
import Modal from 'react-native-modal';
import Separator from './Separator';
import AppIconButton from './AppIconButton';
import AppFlatList from './AppFlatList';
import {useTranslation} from 'react-i18next';
import {AppButton} from '@components';

const AppSelector = ({
  headerTitle = '',
  isVisible = false,
  hideModal = () => {},
  onSelect = ({}) => {},
  itemsList = new Array<any>([]),
  selectedItem = {title: '', value: '', icon: null},
  containerStyle = {},
}) => {
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      avoidKeyboard
      backdropColor={COLORS.black}
      backdropOpacity={0.8}
      style={{margin: 0}}
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      onDismiss={() => {
        hideModal && hideModal();
      }}
      onBackButtonPress={() => {
        hideModal && hideModal();
      }}
      onBackdropPress={() => {
        hideModal && hideModal();
      }}
      onSwipeComplete={() => {
        hideModal && hideModal();
      }}>
      <Block padding={16} flex={0} style={[styles.block, containerStyle]} white>
        <Block row marginBottom={16}>
          <Block center>
            <Block noflex style={styles.stick} />
          </Block>
          <AppIconButton
            icon={{
              type: IconTypes.materialCommunity,
              name: 'window-close',
              size: 22,
            }}
            style={styles.closeButton}
            onPress={() => {
              hideModal && hideModal();
            }}
          />
        </Block>
        {headerTitle?.length > 0 && (
          <Block marginBottom={16} middle center noflex>
            <Text>{headerTitle}</Text>
          </Block>
        )}

        <Block>
          <AppFlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            data={itemsList}
            showsVerticalScrollIndicator={false}
            renderItem={({item}: any) => (
              <Pressable
                onPress={() => {
                  onSelect && onSelect(item);
                  hideModal && hideModal();
                }}>
                <Block noflex padding row>
                  {item?.isIcon && (
                    <Block middle noflex width="15%">
                      <AppIcon
                        type={item.iconType}
                        name={item.iconName}
                        size={22}
                        color={item.iconColor ? item.iconColor : COLORS.primary}
                      />
                      {item.icon}
                    </Block>
                  )}
                  <Text style={styles.itemTitle} medium size={18}>
                    {item?.title}
                  </Text>
                  {selectedItem && selectedItem?.value === item?.value && (
                    <Block middle noflex width="15%">
                      <AppIcon
                        type={IconTypes.material}
                        name={'check'}
                        size={22}
                      />
                    </Block>
                  )}
                </Block>
              </Pressable>
            )}
            ItemSeparatorComponent={Separator}
          />
        </Block>

        {selectedItem?.value !== '' && (
          <Block marginBottom={20} noflex>
            <AppButton
              type="primary"
              title={t('clear')}
              onPress={() => {
                onSelect({title: '', value: ''});
                hideModal && hideModal();
              }}
            />
          </Block>
        )}
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({
  block: {
    height: '50%',
    marginTop: 'auto',
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    padding: 16,
  },
  itemTitle: {
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  stick: {
    borderRadius: 8,
    width: 110,
    height: 4,
    backgroundColor: '#F2F3F6',
  },
  contentContainer: {
    paddingBottom: 100,
  },
});

export default memo(AppSelector);
