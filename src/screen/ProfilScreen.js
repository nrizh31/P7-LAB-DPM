// screens/ProfileScreen.js
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  const { user } = state;

  // State untuk pop-up modal
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    console.log('Attempting to logout...');
    await signout(); // Tunggu hingga state diubah
    console.log('Logged out successfully');
    
    // Reset navigasi ke layar Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Arahkan ke Login
    });
  };
  
  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          {/* Gambar profil dari lokal */}
          <Image
            source={require('../../assets/profil.jpg')} // Pastikan path benar
            style={styles.profileImage}
          />
          {/* Tampilkan username dan email */}
          <Text style={styles.username}>{user?.username || 'Username'}</Text>
          <Text style={styles.email}>{user?.email || 'example@example.com'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Activities</Text>
        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item} style={styles.activityItem}>
            <Image
              source={{ uri: `https://picsum.photos/200/200?random=${item + 10}` }}
              style={styles.activityImage}
            />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Activity {item}</Text>
              <Text style={styles.activityDescription}>
                This is a description for activity {item}
              </Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.settingText}>Account Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <Text style={styles.settingText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#333" />
          <Text style={styles.settingText}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Tombol Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)} // Tampilkan modal saat tombol ditekan
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Modal Konfirmasi Logout */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Tutup modal saat di-back
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Apakah anda ingin keluar?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogout} // Fungsi logout
              >
                <Text style={styles.modalButtonText}>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)} // Tutup modal
              >
                <Text style={styles.modalButtonText}>Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activityImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
  activityContent: {
    flex: 1,
    padding: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ff4444',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
