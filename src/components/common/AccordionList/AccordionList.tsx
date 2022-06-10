import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

interface ISection {
  title?: string;
  content?: string;
}

type Props = {
  sections?: Array<ISection>;
};

export const AccordionList: FC<Props> = props => {
  const {sections} = props;
  const [activeSections, setActiveSections] = useState<Array<number>>([]);

  //const _renderSectionTitle = (section: ISection) => {
  //  return (
  //    <View style={styles.content}>
  //      <Text>{section.title}</Text>
  //    </View>
  //  );
  //};

  const _renderHeader = (section: ISection) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = (section: ISection) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _updateSections = (active_sections: Array<number>) => {
    setActiveSections(active_sections);
  };

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      // buna gerek yok fazla koymuşsunuz
      //renderSectionTitle={_renderSectionTitle}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={_updateSections}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    padding: 6,
  },
  headerText: {},
  content: {},
});
