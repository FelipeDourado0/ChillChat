import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import { useRouter } from "next/router";

function Title(props) {
  const Tag = props.tag || "h1";
  const BgColor = props.BgColor || "none";
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: #fff;
          padding: 4px 8px;
          border-radius: 5px;
          background-color: ${BgColor};
        }
      `}</style>
    </>
  );
}

function HomePage() {
  const [userName, setUsername] = React.useState("Default");
  const [imagemPerfil, setImagemPerfil] = React.useState();
  const roteamento = useRouter();

  return (
    <div>
      <Box
        styleSheet={{
          backgroundColor: {
            xs: "rgba(25, 29, 50,.98)",
          },
          maxWidth: "800px",
          height: "300px",
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: "15px",
          boxShadow: "11px 11px 22px #888",
          color: "white",
          padding: "25px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          styleSheet={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Titulo */}
          <Box
            styleSheet={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Title tag="h1">Bem Vindos de Volta!</Title>
            <Text tag="p" variant="body1">
              Chat - Imersão Alura
            </Text>
          </Box>

          {/* Formulario */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              roteamento.push("/chat");
            }}
            styleSheet={{
              width: "100%",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              placeholder="GitHub Account"
              onChange={function (event) {
                const nome = event.target.value;
                setUsername(nome);
                let ulrPerfil = `https://github.com/${nome}.png`;
                setImagemPerfil(ulrPerfil);
              }}
              styleSheet={{
                fontSize: "18px",
                color: "White",
                backgroundColor: "rgb(20, 18, 63)",
                border: "2px solid rgb(20, 18, 63)",
                focus: {
                  border: "2px solid rgb(163, 160, 228)",
                },
                hover: {
                  border: "2px solid rgb(20, 18, 63)",
                },
              }}
            />

            <Button
              label="ENTRAR"
              type="submit"
              styleSheet={{
                marginTop: "8px",
                fontSize: "18px",
                backgroundColor: "rgb(123, 188, 78)",
              }}
            />
          </Box>
        </Box>
        {/* imagem */}
        <Box
          styleSheet={{
            minWidth: "200px",
            maxWidth: "300px",
            height: "200px",
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10%",
            border: "2px solid rgb(40, 40, 80)",
            backgroundColor: "rgb(28, 35, 60)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            src={imagemPerfil}
            styleSheet={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              marginBottom: "10px",
              backgroundColor: "none",
            }}
          ></Image>
          <Title tag="span" BgColor="rgba(100, 100, 100,.2)">
            {userName}
          </Title>
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
