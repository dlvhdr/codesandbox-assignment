import { Sections, SectionType } from "../BranchesSection/BranchesSection";
import styles from "./styles.module.css";
import ChevronButton from "../ChevronButton/ChevronButton";
import { useBranches } from "../../contexts/BranchesContext";

type Props = {
  name: string;
  sectionType: SectionType;
};

const getPreviousSectionType = (sectionType: SectionType): SectionType => {
  switch (sectionType) {
    case Sections.REVIEW:
      return Sections.IN_PROGRESS;
    case Sections.READY:
      return Sections.REVIEW;
    default:
      throw new Error(`Cannot move branch from ${sectionType}`);
  }
};

const getNextSectionType = (sectionType: SectionType): SectionType => {
  switch (sectionType) {
    case Sections.IN_PROGRESS:
      return Sections.REVIEW;
    case Sections.REVIEW:
      return Sections.READY;
    default:
      throw new Error(`Cannot move branch from ${sectionType}`);
  }
};

function Branch({ name, sectionType }: Props) {
  const { moveBranch } = useBranches();

  return (
    <div key={name} className={styles.branch}>
      <ChevronButton
        direction="left"
        onClick={() => moveBranch(name, getPreviousSectionType(sectionType))}
        disabled={sectionType === Sections.IN_PROGRESS}
      />
      <h3 className={styles.branchName}>{name}</h3>
      <ChevronButton
        direction="right"
        onClick={() => moveBranch(name, getNextSectionType(sectionType))}
        disabled={sectionType === Sections.READY}
      />
    </div>
  );
}

export default Branch;
