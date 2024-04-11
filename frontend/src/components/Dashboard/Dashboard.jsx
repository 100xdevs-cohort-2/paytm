/* eslint-disable react/prop-types */
import axios from "axios";
import React from "react";

function Dashboard() {
	const [details, setDetails] = React.useState({});
	const [balance, setBalance] = React.useState(0);
	React.useEffect(() => {
		const value = localStorage.getItem("token");
		const { userId } = JSON.parse(value);
		axios
			.get(`http://localhost:3000/api/v1/user/bulk?filter=${userId}`)
			.then((response) => {
				if (response.statusText) {
					setDetails({
						...response.data.users[0],
					});
				}
			})
			.catch((err) => console.log(err));
	}, []);
	React.useEffect(() => {
		const value = localStorage.getItem("token");
		const { token } = JSON.parse(value);
		axios({
			method: "get",
			url: `http://localhost:3000/api/v1/account/balance`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.statusText) {
					setBalance(response.data.balance);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Appbar {...details} />
			<div className="p-5 text-lg text-green-900 font-medium">
				<p>Your Balance : ₹ {Math.floor(balance)} </p>{" "}
			</div>
			<User {...details} />
		</div>
	);
}

export default Dashboard;

function User({ lastName }) {
	const [users, setUsers] = React.useState([]);
	const [query, setQuery] = React.useState("");
	const filteredUsers = users.filter(
		(user) =>
			(user.firstName.includes(query) || user.lastName.includes(query)) &&
			user.lastName !== lastName
	);
	React.useEffect(() => {
		axios
			.get(`http://localhost:3000/api/v1/user/bulk`)
			.then((response) => {
				if (response.statusText) {
					setUsers([...response.data.users]);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			<p className="text-lg p-5 font-semibold border-b border-gray-200">
				Users
			</p>
			<input
				type="text"
				name="user-search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<div>
				{filteredUsers.length > 0 &&
					filteredUsers.map((user, ind) => {
						const { lastName, _id: customerId } = user;
						return (
							<Friend
								key={customerId}
								lastName={lastName}
								ind={ind}
								customerId={customerId}
							/>
						);
					})}
			</div>
		</div>
	);
}

function Friend({ lastName, ind, customerId }) {
	const [modal, setShow] = React.useState(false);
	return (
		<div className="flex flex-row p-5 justify-between">
			<div className="flex flex-row gap-3">
				<p className="bg-yellow-400 w-9 h-9 rounded-full flex justify-center items-center hover:cursor-pointer">
					{ind + 1}
				</p>
				<p className="py-1.5">{lastName.toUpperCase()}</p>
			</div>
			<button
				type="button"
				className="px-4 py-2 bg-yellow-600 text-white rounded-sm font-semibold"
				onClick={() => setShow((currentModal) => !currentModal)}
			>
				Send Money
			</button>
			{modal && (
				<Modal name={lastName} setShow={setShow} customerId={customerId} />
			)}
		</div>
	);
}

function Appbar({ firstName }) {
	if (firstName) {
		return (
			<div className="flex flex-row justify-between p-2 pr-5 pl-5 bg-yellow-400 align-middle font-bold ">
				<h1>Easy Pay App</h1>
				<div className="flex flex-row gap-3">
					<p>Hello, {firstName[0].toUpperCase() + firstName.slice(1)} </p>
					<p className="bg-white w-7 h-7 rounded-full flex justify-center align-middle hover:cursor-pointer">
						{firstName.toUpperCase()[0]}
					</p>
				</div>
			</div>
		);
	}
}

function Modal({ name, setShow, customerId }) {
	const [amount, setAmount] = React.useState(0);
	const { token } = JSON.parse(localStorage.getItem("token"));

	function handleTransfer() {
		axios({
			method: "post",
			url: "http://localhost:3000/api/v1/account/transfer",
			data: {
				to: customerId,
				amount: Number(amount),
			},
			headers: {
				Authorization: `Bearer ${token}`,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
			},
		})
			.then((response) => {
				if (response.statusText) {
					alert(`${response.data.message}`);
					setShow((currentModal) => !currentModal);
				}
			})
			.catch((err) => console.log(err));
	}
	return (
		<div className=" w-screen h-screen absolute bg-slate-200 bottom-0 right-0 flex items-center justify-center py-5 ">
			<div className=" shadow-xl container bg-green-100 w-1/4  mx-auto p-5 rounded-md gap-3 flex flex-col justify-between">
				<h3 className="text-xl text-center font-medium">Send Money</h3>

				<div>
					<div className="flex flex-row gap-3 text-lg mb-3">
						<p className="rounded-full bg-yellow-600 w-9 h-9 flex justify-center items-center text-white font-semibold ">
							{name[0].toUpperCase()}
						</p>
						<p className="flex justify-end py-1">{name}</p>
					</div>
					<p> Amount (in Rs)</p>
					<input
						name="amount"
						className=" py-1 px-0.5  mt-2 w-full border-2 rounded-md"
						placeholder="Enter Amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					<button
						onClick={handleTransfer}
						className="w-full mx-auto bg-orange-400 text-white mt-3 px-1 py-2 rounded-md font-bold"
					>
						Initiate Transfer
					</button>
				</div>
			</div>
		</div>
	);
}
