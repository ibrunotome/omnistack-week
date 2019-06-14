import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ImagePickert from 'react-native-image-picker'

import api from '../services/api'

export default class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hastags: '',
    preveiw: null
  }

  static navigationOptions = {
    headerTitle: 'Nova publicação'
  }

  handleSelectImage = () => {
    ImagePickert.showImagePicker({
      title: "Image para o post"
    }, upload =>{
      if (upload.error){
        console.log("Erro ao obter imagem")
      }else if (upload.didCancel){
        console.log("Usuairo cancelou a Imagem")
      } else {
        const preveiw = {
          uri: `data:image/jpeg;base64,${upload.data}`
        }

        let prefixFileName
        let fileExtension
        
        if(upload.fileName){
          [prefixFileName, fileExtension] = upload.fileName.split('.')
          fileExtension = fileExtension.toLowerCase() === 'heic' ? 'jpg' : fileExtension
        }else{
          prefixFileName = new Date().getTime()
          fileExtension = 'jpg'
        }

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: `${prefixFileName}.${fileExtension}`
        }

        this.setState({preveiw, image})
      }

    })
  }

  handleSubmit = async () => {
    const data = new FormData()

    data.append('image', this.state.image)
    data.append('author', this.state.author)
    data.append('place', this.state.place)
    data.append('description', this.state.description)
    data.append('hastags', this.state.hastags)

    await api.post('posts', data)

    this.props.navigation.navigate('Feed')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleSelectImage}
          style={styles.selectButton}
        >
          <Text style={styles.selectButtonText}>Selecionar Image</Text>
        </TouchableOpacity>

        {this.state.preveiw && <Image style={styles.preview} source={this.state.preveiw}/>}

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Onde o post fui criado"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicone uma descrição para o post"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe tags para o post"
          placeholderTextColor="#999"
          value={this.state.hastags}
          onChangeText={hastags => this.setState({ hastags })}
        />

        <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
  
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
  });
  