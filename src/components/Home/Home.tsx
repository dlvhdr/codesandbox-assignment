import classNames from "classnames";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodesandboxLogo from "../../assets/CodesandboxLogo";
import { useFetchRepo } from "../../hooks/useFetchRepo";
import styles from "./styles.module.css";

function Root() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [repo, setRepo] = useState<{
    owner: string | undefined;
    name: string | undefined;
  }>({
    owner: undefined,
    name: undefined,
  });

  const { isFetching, isSuccess, error } = useFetchRepo(repo.owner, repo.name);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (inputRef.current == null) {
        return;
      }

      const url = new URL(inputRef.current.value);
      const [owner, name] = url.pathname.slice(1).split("/");
      setRepo({ owner, name });
    },
    [inputRef.current]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${repo.owner}/${repo.name}`);
    }
  }, [isSuccess]);

  return (
    <main className={styles.root}>
      <section className={styles.content}>
        <CodesandboxLogo className={styles.logo} />
        <h1 className={styles.heading}>Start by pasting the repository URL.</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="https://"
            type="url"
            ref={inputRef}
            required={true}
            pattern="(https:\/\/)?(www)?github.com\/.+\/.+"
          />
          <button className={styles.submit} type="submit">
            {isFetching ? "Loading..." : "Submit"}
          </button>
        </form>
        <p
          className={classNames(styles.error, {
            [styles.hasError]: error != null,
          })}
        >
          Oops! Something went wrong. Try again.
        </p>
      </section>
    </main>
  );
}

export default Root;
