import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {category} from '@api';
import {useApi} from '@hooks';
import {Block} from '@theme';

const DetailPage = () => {
  const [data, setData] = useState([]);
  const categoryApi = useApi(category.CategoryList);

  const loadData = async () => {
    const response = await categoryApi.request();
    if (response.isSuccess) {
      setData(response.data);
    }
  };

  useEffect(() => {
    loadData();
    return () => {
      setData([]);
    };
  }, []);

  const renderItem = (item: any) => {
    return <Text>{item.item.Title}</Text>;
  };

  return (
    <View>
      <FlatList
        data={data}
        ListEmptyComponent={
          <Block marginTop={20} center middle>
            <Text>Kayıt bulunamadı</Text>
          </Block>
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default DetailPage;
