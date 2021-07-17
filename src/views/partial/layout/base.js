import Head from 'next/head';

import s from 'styles/LayoutBase.module.css';

export default function LayoutBase({ children }) {
  return (
    <main className={s.main}>
      <Head>
        <title>Control robotic car</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={s.header}>Raspberry Pi and Arduino UNO car</header>
      <section className={s.content}>{children}</section>
      <footer className={s.footer}>Manipulate car</footer>
    </main>
  );
}
