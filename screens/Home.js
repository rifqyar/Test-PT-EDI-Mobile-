import React, {useState, useEffect} from 'react'
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import {
  Headline,
  DataTable,
  Title,
  Caption,
  Button
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormDataDiri from '../components/auth/FormDataDiri';
import {API as api} from '../app.json'
import axios from 'axios'

const optionsPerPage = [2, 3, 4];
const Home = (props) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[2]);
  const [token, setToken] = useState(props.route.params.token)
  const [user, setUser] = useState(JSON.parse(props.route.params.user))
  const [dataKaryawan, setDataKaryawan] = useState(null)

  useEffect(() => {
    setPage(0);
    getStorage();
    getDataKaryawan()
    
  }, [itemsPerPage]);

  const getStorage = async () => {
    setToken(await AsyncStorage.getItem('token'))
  }

  const getDataKaryawan = () => {
    axios.get(`${api}api/karyawan/`,{
      headers: {
          token: token
      }
    }).then(async (res) => {
      setDataKaryawan(res.data.items.data)
    }).catch(err => {
        if (err.message == 'Network Error') {
            Alert.alert(
                'Tidak dapat terhubung ke server', 
                'Periksa jaringan anda',
                [{ text: "OK", onPress: () => {
                    props.navigation.push('Wellcome')
                }}]
            );
        }
        console.log(err)
        props.navigation.push('SignIn')
    })
  }

  const renderListPegawai = (data, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell>{data.no_ktp == null ? 'Belum Lengkap' : 'Lengkap'}</DataTable.Cell>
        <DataTable.Cell>{data.nama}</DataTable.Cell>
        <DataTable.Cell>{data.no_ktp}</DataTable.Cell>
        <DataTable.Cell>{data.jk == 1 ? 'Laki-laki' : 'Perempuan'}</DataTable.Cell>
        <DataTable.Cell>{data.no_telp}</DataTable.Cell>
        <DataTable.Cell>{data.alamat}</DataTable.Cell>
      </DataTable.Row>
    )
  }

  const logout = async () => {
    await AsyncStorage.clear();
    props.navigation.push('SignIn')
  }
  
  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <View style={{flex:0.9, marginHorizontal: SIZES.padding * 3}}>
          <Title style={{marginTop: SIZES.padding}}>
            Selamat Datang, {user.name}
          </Title>
          {
            user.status == 0 ? 
              <Caption style={{color:COLORS.Red}}>
                Akun anda belum aktif
              </Caption>
            : 
              <View />
          }

          {
            user.id_role == 1 
            ?
              <>
                <Headline style={{textAlign:'center', marginTop: SIZES.padding2 * 3}}>
                  Data Pegawai
                </Headline>

                <View style={{flex: 1, marginTop: SIZES.padding3}}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Status Data</DataTable.Title>
                      <DataTable.Title>Nama</DataTable.Title>
                      <DataTable.Title numeric>No. KTP</DataTable.Title>
                      <DataTable.Title>Jenis Kelamin</DataTable.Title>
                      <DataTable.Title numeric>No. Telp</DataTable.Title>
                      <DataTable.Title>Alamat</DataTable.Title>
                    </DataTable.Header>

                    {dataKaryawan != null ? dataKaryawan.map(renderListPegawai) : <View />}

                    {/* <DataTable.Pagination
                      page={page}
                      numberOfPages={3}
                      onPageChange={(page) => setPage(page)}
                      label="1-2 of 6"
                      optionsPerPage={optionsPerPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      showFastPagination
                      optionsLabel={'Rows per page'}
                    /> */}
                  </DataTable>
                </View>
              </>
            : 
              <>
                <Headline style={{textAlign:'center', marginTop: SIZES.padding2 * 3}}>
                  Lengkapi Data Diri Anda
                </Headline>

                <View style={{flex: 1, marginTop: SIZES.padding3}}>
                  <FormDataDiri props={props} user={user} />
                </View>
              </>
          }
        </View>
        <View>
          <Button
              mode="contained"
              buttonColor={COLORS.Red}
              style={{
                  marginTop:SIZES.padding3,
                  borderRadius: SIZES.largeTitle,
                  marginHorizontal: '20%'
              }}
              contentStyle={{
                  paddingVertical: SIZES.padding
              }}
              onPress={logout}>
              Logout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})