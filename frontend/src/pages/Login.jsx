import { Button, Container, Typography } from "@mui/material";
import { connectWallet } from "../blockchain/web3";
import { useWallet } from "../context/WalletContext";

export default function Login() {

    const { wallet, setWallet } = useWallet();

    async function login() {

        const data = await connectWallet();

        if (data) {
            setWallet(data.address);
        }
    }

    return (
        <Container sx={{ mt: 10, textAlign: "center" }}>

            <Typography variant="h3" gutterBottom>
                Supply Chain Management
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={login}
            >
                Connect MetaMask
            </Button>

            <Typography sx={{ mt: 3 }}>
                {wallet}
            </Typography>

        </Container>
    );
}