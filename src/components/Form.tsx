import React, { useState, useEffect } from "react";
import { connect, disconnect } from "starknetkit";
import abi from "./middleware/abi.json";


import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const contractAddress =  "0x056839737baa24d9a9648bde92e3f6b97f777327e12bd0afb4ed0b4478093509";

export default function Form() {
	const [form, setForm] = useState<number>(1);
	const [isConnect, setIsConnect] = useState<boolean>(false);

	
	const [provider, setProvider] = useState();
	const [address, setAddress] = useState();
	const [connection, setConnection] = useState();
	
	console.log(provider, "provider");
	console.log(address, "address");
	console.log(connection, "connection");
	
	const handleFormChange = (val: number) => {
		setForm(val);
		if(val == 1){

		}else{

		}
	};


	const deposit = async () => {

		let core = new starknet.Contract(abi, address, provider)


	}

	const walletStatusChange = (value: boolean) => {
		setIsConnect(value);
	};

	const walletHandle = async () => {
		const connection = await connect();
		if (connection && connection.isConnected) {
			setConnection(connection);
			setProvider(connection.account);
			setAddress(connection.selectedAddress);
			walletStatusChange(true);
		}
	};

	useEffect(() => {
		const connectToStarknet = async () => {
			const connection = await connect({ modalMode: "neverAsk" });
			if (connection && connection.isConnected) {
				setConnection(connection);
				setProvider(connection.account);
				setAddress(connection.selectedAddress);
				walletStatusChange(true);
			}
		};
		connectToStarknet();
	}, []);

	return (
		<div className="main">
			<div className="form">
				<div className="form-head">
					<h2
						onClick={() => handleFormChange(1)}
						className={`${form === 1 ? "active" : ""}`}
					>
						Deposit
					</h2>

					<h2
						onClick={() => handleFormChange(2)}
						className={`${form === 2 ? "active" : ""}`}
					>
						Withdraw
					</h2>
				</div>
				<div className="form-main">
					{form === 1 ? (
						<Deposit isConnect={isConnect} walletHandle={walletHandle} />
					) : (
						<Withdraw isConnect={isConnect} walletHandle={walletHandle} />
					)}
				</div>
			</div>
		</div>
	);
}
