import React, { useMemo } from "react";
import { Box } from "@mui/material";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { customColor } from "./Config/Color";
import MyNFT from "./Pages/MyNFT";
import theme from "./styles/theme";
import LoginPhone from "./Pages/Login/01LoginPhone";
import LoginVerify from "./Pages/Login/02LoginPhoneVerify";
import Home from "./Pages/Home/Home";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";

// import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";
// import {
//   PhantomWalletAdapter,
//   // CoinbaseWalletAdapter,
//   // SlopeWalletAdapter,
//   // SolflareWalletAdapter,
//   // TorusWalletAdapter,
// } from "@solana/wallet-adapter-wallets";

// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";

const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'. const network = WalletAdapterNetwork.Devnet;
  // const network = WalletAdapterNetwork.Devnet;
  // console.log(network);

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // console.log(endpoint);

  // const walletConnectionErr = (error = WalletError) => {
  //   console.log("Wallet Connection Error:", error);
  // };

  // const wallets = useMemo(
  //   () => [
  //     new PhantomWalletAdapter(),
  //     // new CoinbaseWalletAdapter(),
  //     // new SlopeWalletAdapter(),
  //     // new TorusWalletAdapter(),
  //     // new SolflareWalletAdapter({ network }),
  //   ],
  //   [network]
  // );

  return (
    <ThemeProvider theme={theme}>
      {/* <ConnectionProvider endpoint={endpoint}> */}
        {/* <WalletProvider wallet={wallets}> */}
          <StyledComponent>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPhone />} />
                <Route path="/otp" element={<LoginVerify />} />
                <Route path="/member" element={<MyNFT />} />
                <Route path="/terms-and-conditions" element={<Terms />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/download" element={<Download />} />
              </Routes>
            </BrowserRouter>
            <NotificationContainer />
          </StyledComponent>
        {/* </WalletProvider>
      </ConnectionProvider> */}
    </ThemeProvider>
  );
};

function Download() {
  // 👇️ redirect to external URL
  window.location.replace('https://eatieprod.page.link/download');

  return null;
}

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${customColor.mainColor01};
`;

export default App;
