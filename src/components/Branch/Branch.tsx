import { Sections, SectionType } from "../BranchesSection/BranchesSection";
import styles from "./styles.module.css";
import ChevronButton from "../ChevronButton/ChevronButton";

type Props = {
  name: string;
  sectionType: SectionType;
};

function Branch({ name, sectionType }: Props) {
  return (
    <div key={name} className={styles.branch}>
      <ChevronButton
        direction="left"
        onClick={() => {}}
        disabled={sectionType === Sections.IN_PROGRESS}
      />
      <h3 className={styles.branchName}>{name}</h3>
      <ChevronButton
        direction="right"
        onClick={() => {}}
        disabled={sectionType === Sections.READY}
      />
    </div>
  );
}

export default Branch;
