import { FormEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Root() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (inputRef.current == null) {
        return;
      }

      const url = new URL(inputRef.current.value);

      navigate(url.pathname);
    },
    [inputRef.current]
  );

  return (
    <main className={styles.root}>
      <section className={styles.content}>
        <img
          className={styles.logo}
          src="/codesandbox-logo.svg"
          alt="Codesandbox Logo"
        />
        <h1 className={styles.heading}>Start by pasting the repository URL.</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            placeholder="https://"
            type="url"
            ref={inputRef}
            required={true}
            pattern="(https:\/\/)?(www)?github.com\/.+\/.+"
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}

export default Root;
