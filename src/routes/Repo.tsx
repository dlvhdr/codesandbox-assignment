import { useParams } from "react-router-dom";
import BranchesSection, {
  Sections,
} from "../components/BranchesSection/BranchesSection";
import styles from "./Repo.module.css";

function Repo() {
  const { repo } = useParams();
  return (
    <main className={styles.root}>
      <nav className={styles.nav}>
        <h1>{repo}</h1>
      </nav>
      <BranchesSection type={Sections.IN_PROGRESS} />
      <BranchesSection type={Sections.REVIEW} />
      <BranchesSection type={Sections.READY} />
    </main>
  );
}

export default Repo;
