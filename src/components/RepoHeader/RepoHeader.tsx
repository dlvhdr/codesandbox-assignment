import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LeftArrowIcon from "../../assets/LeftArrowIcon";
import StarIcon from "../../assets/StarIcon";
import { useBranches } from "../../contexts/BranchesContext";
import styles from "./styles.module.css";

function RepoHeader() {
  const navigate = useNavigate();
  const { repo, isLoading } = useBranches();

  const formattedStars = useMemo(() => {
    let formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(repo.starGazersCount).toLocaleLowerCase();
  }, [repo]);

  return (
    <nav className={styles.nav}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <LeftArrowIcon />
      </button>
      {isLoading ? (
        <>
          <h1 className={styles.repo}>Loading...</h1>
          <div className={styles.stargazers}></div>
          <p className={styles.description}></p>
        </>
      ) : (
        <>
          <h1 className={styles.repo}>{repo.name}</h1>
          <div className={styles.stargazers}>
            <StarIcon />
            <span className={styles.startsCount}>{formattedStars}</span>
          </div>
          <p className={styles.description}>{repo.description}</p>
        </>
      )}
    </nav>
  );
}

export default RepoHeader;
