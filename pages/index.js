import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from "@blueprintjs/core";
import useSWR, { mutate } from "swr";
import axios from "axios";

export default function Home() {
	const fetcher = (...args) => fetch(...args).then(res => res.json());
	const { data, error, mutate } = useSWR("https://e3c01e81f399.ngrok.io/", fetcher, {
		refreshInterval: 500
	});

	const toggle = async () => {
		await axios.get("https://e3c01e81f399.ngrok.io/toggle");
		mutate();
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<p>{data?.state}</p>
			<Button onClick={toggle} intent="primary" large>Toggle</Button>
		</div>
		)
}
