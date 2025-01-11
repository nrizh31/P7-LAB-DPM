import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Implement your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.featuredCard}>
              <Image
                source={{ uri: `https://picsum.photos/300/200?random=${item}` }}
                style={styles.featuredImage}
              />
              <Text style={styles.featuredTitle}>Featured Item {item}</Text>
              <Text style={styles.featuredDescription}>
                This is a description for featured item {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {[1, 2, 3, 4].map((item) => (
          <TouchableOpacity key={item} style={styles.recentItem}>
            <Image
              source={{ uri: `https://picsum.photos/100/100?random=${item + 3}` }}
              style={styles.recentImage}
            />
            <View style={styles.recentContent}>
              <Text style={styles.recentTitle}>Activity {item}</Text>
              <Text style={styles.recentDescription}>
                This is a description for recent activity {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 5,
  },
  featuredSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredCard: {
    width: 300,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    padding: 10,
    paddingTop: 0,
  },
  recentSection: {
    padding: 15,
  },
  recentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  recentImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  recentContent: {
    flex: 1,
    padding: 10,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen;