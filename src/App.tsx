import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.root}>
      <section className={styles.content}>
        <img
          className={styles.logo}
          src="/codesandbox-logo.svg"
          alt="Codesandbox Logo"
        />
        <h1 className={styles.heading}>Start by pasting the repository URL.</h1>
        <form className={styles.form}>
          <input placeholder="https://" type="url" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}

export default App;
