import React, {useState, useEffect} from 'react'
import { 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import {
  Headline,
  DataTable,
  Title,
  Caption,
  Button,
  Dialog, 
  Portal
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormDataDiri from '../components/auth/FormDataDiri';
import Icon from 'react-native-vector-icons/Ionicons'
import {API as api} from '../app.json'
import axios from 'axios'

const optionsPerPage = [2, 4, 6];

const Home = (props) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(optionsPerPage[0]);
  
  const [token, setToken] = useState(props.route.params.token)
  const [user, setUser] = useState(JSON.parse(props.route.params.user))
  const [dataKaryawan, setDataKaryawan] = useState(null)
  const from = page * numberOfItemsPerPage;

  const [clickedUser, setClickedUser] = useState({})
  const [showDialog, setshowDialog] = useState(false)

  useEffect(() => {
    setPage(0);
    getStorage();
    getDataKaryawan()
    
  }, [numberOfItemsPerPage]);

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
      // to = Math.min((page + 1) * numberOfItemsPerPage, res.data.items.data.length)
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
        props.navigation.push('SignIn')
    })
  }

  const renderListPegawai = (data, index) => {
    const detailUser = (user) => {
      setClickedUser(user)
      setshowDialog(true)
    }

    return (
      <DataTable.Row key={data.id_karyawan}>
        <DataTable.Cell style={{flex: 0.4, alignItems:'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => detailUser(data)}>
            <Icon size={17} name={'ios-eye-outline'}/>
          </TouchableOpacity>
        </DataTable.Cell>
        <DataTable.Cell>{data.nama}</DataTable.Cell>
        <DataTable.Cell>{data.no_ktp}</DataTable.Cell>
      </DataTable.Row>
    )
  }

  const logout = async () => {
    await AsyncStorage.clear();
    props.navigation.push('SignIn')
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, height: '100%'}}>
        {/* Header */}
        <View style={{backgroundColor: COLORS.Amber, paddingHorizontal: SIZES.padding * 3, paddingBottom: SIZES.padding * 3, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center',marginTop: SIZES.padding * 6}}>
            <Title
                style={{
                    fontSize:SIZES.h1 /2,
                    color:COLORS.black,
                    flexWrap: 'wrap'
                }}
            >
                Selamat Datang <Text style={{fontWeight:'bold'}}> {user.name} </Text>
            </Title>
            <TouchableOpacity onPress={logout}>
              <Icon size={24} name={'ios-log-out-outline'} color={COLORS.darkRed} />
            </TouchableOpacity>
          </View>

          {
            user.status == 0 ? 
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon size={24} name={'ios-information-circle-outline'} color={COLORS.darkRed} />
                <Caption style={{color:COLORS.darkRed}}>
                  Akun anda belum aktif
                </Caption>
              </View>
            : 
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Icon size={24} name={'ios-checkmark-circle-outline'} color={COLORS.Green} />
              <Caption style={{color:COLORS.Green}}>
                Selamat, Akun Anda sudah aktif
              </Caption>
            </View>
          }
        </View>
        {
          user.id_role == 1 
          ?
            <>
              <Headline style={{textAlign:'center', marginTop: SIZES.padding2 * 3}}>
                Data Pegawai
              </Headline>

              <View style={{flex: 1, marginTop: SIZES.padding3}}>
                <DataTable>
                  <DataTable.Header style={{alignItems: 'center', justifyContent: 'center'}}>
                    <DataTable.Title style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>Detail</DataTable.Title>
                    <DataTable.Title style={{ alignItems: 'center', justifyContent: 'center'}}>Nama</DataTable.Title>
                    <DataTable.Title style={{ alignItems: 'center', justifyContent: 'center'}} numeric>No. KTP</DataTable.Title>
                  </DataTable.Header>

                  {/* {dataKaryawan != null ? dataKaryawan.map(renderListPegawai) : <View />} */}
                  { dataKaryawan != null ? dataKaryawan.slice(
                    page * numberOfItemsPerPage,
                    page * numberOfItemsPerPage + numberOfItemsPerPage
                  ).map((row) => renderListPegawai(row)) : <View />}

                  { dataKaryawan != null ?
                    <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(dataKaryawan.length / numberOfItemsPerPage)}
                      onPageChange={(page) => setPage(page)}
                      label={`${from + 1}-${Math.min((page + 1) * numberOfItemsPerPage, dataKaryawan.length)} of ${dataKaryawan.length}`}
                      showFastPaginationControls
                      numberOfItemsPerPageList={optionsPerPage}
                      numberOfItemsPerPage={numberOfItemsPerPage}
                      onItemsPerPageChange={onItemsPerPageChange}
                      selectPageDropdownLabel={'Rows per page'}
                    /> : <View /> }
                </DataTable>
              </View>

              {/* Dialog */}
              <Portal>
                <Dialog visible={showDialog}>
                  <Dialog.Title>Detail Pegawai</Dialog.Title>
                  <Dialog.Content>
                    <View style={{padding: 10}}>
                      <Text style={{marginBottom:10}}>
                        Nama : {clickedUser.nama} ({clickedUser.jk})
                      </Text>
                      <Text style={{marginBottom:10}}>
                        No. KTP : {clickedUser.no_ktp}
                      </Text>
                      <Text style={{marginBottom:10}}>
                        TTL : {clickedUser.ttl}
                      </Text>
                      <Text style={{marginBottom:10}}>
                        Agama : {clickedUser.agama}
                      </Text>
                      <Text style={{marginBottom:10}}>
                        Alamat : {clickedUser.alamat}
                      </Text>
                      <Text style={{marginBottom:10}}>
                        No. Telp : {clickedUser.no_telp}
                      </Text>
                    </View>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={() => setshowDialog(false)}>Close</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </>
          : 
            user.status == 0 
            ?
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1,paddingHorizontal: SIZES.padding * 3, paddingBottom: SIZES.padding * 3}}>
                    <Headline style={{textAlign:'center', marginTop: SIZES.padding2 * 3}}>
                      Lengkapi Data Diri Anda
                    </Headline>

                    <View style={{flex: 1, marginTop: SIZES.padding3}}>
                        <FormDataDiri navigation={props.navigation} user={user} karyawan={dataKaryawan} token={token} />
                    </View>
                </View>
              </ScrollView>
            :
            <View style={{flex: 1}}>
              <View style={{flex: 0.8, justifyContent: 'center', alignItems:'center'}}>
                <Headline>
                  Aplikasi Pegawai
                </Headline>
              </View>
                
              {/* <View style={{flex: 0.2}}>
                <Button
                  mode="contained"
                  buttonColor={COLORS.Red}
                  style={{
                      marginTop:SIZES.padding3,
                      borderRadius: SIZES.largeTitle,
                      marginHorizontal: '20%'
                  }}
                  onPress={logout}>
                  Logout
                </Button>
              </View> */}
            </View>
        }
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#FF573300" translucent={true}/>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})