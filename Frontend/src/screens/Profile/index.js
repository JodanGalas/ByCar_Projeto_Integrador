import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/auth";
import InputEdit from "../../components/Input/InputEdit";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [nome, setNome] = useState(user.nome);
  const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState(user.email);
  const [telefone, setTelefone] = useState(user.telefone);
  const [endereco, setEndereco] = useState(user.endereco);

  const Edinting = async (Id) => {
    const res = await fetch(`http://192.168.0.16:5000/atualizar/usuario/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        cpf,
        email,
        telefone,
        endereco,
      }),
    });

    const novoUsuario = await res.json();
    console.log(novoUsuario);
    novoUsuario.estaLogado = true;
    AsyncStorage.setItem("user", JSON.stringify(novoUsuario));
  };

  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser({
      estaLogado: false,
      atividade: "",
      cod: "",
      cpf: "",
      email: "",
      endereco: "",
      nome: "",
      senha: "",
      status: "",
      telefone: "",
    });

  }
 
  return (
    <ImageBackground
      source={require("../images/back2.png")}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          height: 10,
          marginTop: 100,
          marginBottom: 20,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            backgroundColor: "#5facdb",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Image
            source={require("../images/perfil3.png")}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: 1,
        }}
      >
        <TouchableOpacity
          underlayColor="#6600bb"
          onPress={() => logout()}
          style={{
            width: 200,
            marginTop: 70,
            marginLeft: 90,
            backgroundColor: "#EF6666",
            paddingVertical: 10,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#FFF",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Sair da Aplicação X
          </Text>
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: 32,
            alignSelf: "center",

            backgroundColor: "#FFF",
            height: 386,
            elevation: 1,
            width: 300,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              paddingTop: 20,

              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 20,
              }}
            >
              Nome:
            </Text>
            <InputEdit onChangeText={(n) => setNome(n)} value={nome} />
          </View>

          <View
            style={{
              marginTop: 5,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 20,
              }}
            >
              Email:
            </Text>
            <InputEdit onChangeText={(e) => setEmail(e)} value={email} />
          </View>

          <View
            style={{
              marginTop: 5,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 20,
              }}
            >
              Endereço:
            </Text>
            <InputEdit onChangeText={(e) => setEndereco(e)} value={endereco} />
          </View>

          <View
            style={{
              marginTop: 5,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 20,
              }}
            >
              CPF:
            </Text>
            <InputEdit onChangeText={(c) => setCpf(c)} value={cpf} />
          </View>

          <View
            style={{
              marginTop: 5,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 20,
              }}
            >
              Telefone:
            </Text>
            <InputEdit onChangeText={(t) => setTelefone(t)} value={telefone} />
          </View>

          <TouchableHighlight
            underlayColor="#6600bb"
            onPress={() => Edinting(user.id)}
            style={{
              width: 200,
              marginLeft: 5,
              elevation: 2,

              marginTop: 10,
              backgroundColor: "#3F37C9",
              paddingVertical: 13,
              borderRadius: 25,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#FFF",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Salvar
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
