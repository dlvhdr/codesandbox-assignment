import BranchesSection, { Sections } from "../BranchesSection/BranchesSection";
import RepoHeader from "../RepoHeader/RepoHeader";
import styles from "./styles.module.css";

function Kanban() {
  return (
    <main className={styles.root}>
      <RepoHeader />
      <BranchesSection type={Sections.IN_PROGRESS} />
      <BranchesSection type={Sections.REVIEW} />
      <BranchesSection type={Sections.READY} />
    </main>
  );
}

export default Kanban;
