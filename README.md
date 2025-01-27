# GetFund

GetFund is a decentralized crowdfunding platform that allows users to create and fund projects using Solana blockchain. The platform integrates social login authentication, signing messages, and transactions using the Reown AppKit.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Social Login Authentication](#social-login-authentication)
  - [Signing Messages](#signing-messages)
  - [Sending Transactions](#sending-transactions)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage crowdfunding projects.
- Fund projects using Solana cryptocurrency.
- Social login authentication using Reown AppKit.
- Sign messages and transactions securely.

## Getting Started

### Prerequisites

To get started, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:Install the dependencies:

<pre> <code> ```
npm install
Install the Solana web3.js library: ``` </code> </pre>

bash
npm install @solana/web3.js
Install Reown AppKit:

bash
npm install @reown/appkit @reown/appkit-adapter-solana
Usage
Social Login Authentication
GetFund uses Reown AppKit for social login authentication. Here’s how it’s implemented:

Import the necessary modules:

JavaScript
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import type { Provider } from '@reown/appkit-adapter-solana/react';
Initialize the AppKit provider and account:

JavaScript
const { address, isConnected } = useAppKitAccount();
const { walletProvider } = useAppKitProvider<Provider>('solana');
Check if the user is connected:

JavaScript
if (isConnected) {
  console.log(`User is connected with address: ${address}`);
} else {
  console.log('User is not connected');
}
Signing Messages
To sign messages using Reown AppKit, follow these steps:

Create a function to prompt the modal for signing the message:

JavaScript
const handleSignMsg = async () => {
  // Message to sign
  const encodedMessage = new TextEncoder().encode("Hello Reown AppKit!");

  // Raise the modal
  const sig = await walletProvider.signMessage(encodedMessage);

  // Print the signed message in hexadecimal format
  console.log(Buffer.from(sig).toString("hex"));
};
Call the function when needed:

JavaScript
return (
  isConnected && (
    <div>
      <button onClick={handleSignMsg}>Sign Message</button>
    </div>
  )
);
Sending Transactions
To send a transaction using Reown AppKit, follow these steps:

Import the necessary modules:

JavaScript
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
Create the function to raise the modal to send the transaction:

JavaScript
const handleSendTx = async () => {
  if (!address) {
    console.error("Wallet not connected.");
    return;
  }

  const connection = new Connection('https://devnet.helius-rpc.com/?api-key=your-api-key', 'confirmed');
  const latestBlockhash = await connection.getLatestBlockhash();

  // Create the transaction
  const transaction = new Transaction({
    feePayer: new PublicKey(address),
    recentBlockhash: latestBlockhash.blockhash,
  }).add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(address),
      toPubkey: new PublicKey("destination-wallet-address"), // Replace with destination address
      lamports: LAMPORTS_PER_SOL * 0.01, // 0.01 SOL
    })
  );

  // Raise the modal to sign and send the transaction
  const signature = await walletProvider.sendTransaction(transaction, connection);

  // Print the Transaction Signature
  console.log("Transaction signature:", signature);
};
Call the function when needed:

JavaScript
return (
  isConnected && (
    <div>
      <button onClick={handleSendTx}>Send Transaction</button>
    </div>
  )
);
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.



   ```bash
   git clone https://github.com/bigjoefilms/getfund.git
   cd getfund
