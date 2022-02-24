import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvb3JkeWRsamN0empjdWV0emtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU1NzczNTgsImV4cCI6MTk2MTE1MzM1OH0.B165MXKg9WuBj1XzwI_6fHHymY92HhN2Ae-E3PnLV5g";

const SUPABASE_URL = "https://eoordydljctzjcuetzks.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagemEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("Mensagens")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("Mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });

    escutaMensagemEmTempoReal((novaMensagem) => {
      setListaDeMensagens((valorAtualLista) => {
        return [novaMensagem, ...valorAtualLista];
      });
    });
  }, []);

  /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [] Lista de mensagens 
    */

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("Mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        setMensagem("");
      });
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "rgba(25, 29, 50,.98)",
          height: "100%",
          Width: "95vw",
          maxHeight: "95vh",
          padding: "20px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            display: "flex",
            backgroundColor: "rgba(28, 35, 60,.2)",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
            border: "0.1px solid",
            borderColor: appConfig.theme.colors.neutrals["700"],
            width: "100%",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: "white",
                marginRight: "12px",
                color: "black",
                fontSize: "1.1rem",
              }}
            />
            <Button
              label="IR!"
              styleSheet={{
                width: "30px",
                height: "30px",
                color: "black",
                backgroundColor: "rgb(9, 999, 130)",
                hover: {
                  backgroundColor: "green",
                },
              }}
              disabled={mensagem === "" ? true : false}
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }}
            ></Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Bem-Vindo ao Chill Chat!</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
          styleSheet={{
            color: "white",
            backgroundColor: "rgba(0, 196, 180,.80)",
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
        minHeight: "500px",
        maxHeight: "530px",
      }}
    >
      {/* logica da mensagem */}
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              width: "80%",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
