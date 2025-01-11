import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Popular', 'Trending', 'New', 'Top Rated'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <TouchableOpacity key={item} style={styles.gridItem}>
              <Image
                source={{ uri: `https://picsum.photos/200/200?random=${item + 6}` }}
                style={styles.gridImage}
              />
              <View style={styles.gridContent}>
                <Text style={styles.gridTitle}>Item {item}</Text>
                <Text style={styles.gridDescription}>Description for item {item}</Text>
                <View style={styles.gridStats}>
                  <View style={styles.stat}>
                    <Ionicons name="heart-outline" size={16} color="#666" />
                    <Text style={styles.statText}>{Math.floor(Math.random() * 1000)}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Ionicons name="chatbubble-outline" size={16} color="#666" />
                    <Text style={styles.statText}>{Math.floor(Math.random() * 100)}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#1e90ff',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  gridImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gridContent: {
    padding: 10,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  gridStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    marginLeft: 5,
    color: '#666',
  },
});

export default ExploreScreen;