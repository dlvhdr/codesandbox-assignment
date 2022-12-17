import { useMemo } from "react";
import { useBranches } from "../../contexts/BranchesContext";
import Branch from "../Branch/Branch";
import styles from "./styles.module.css";

export const Sections = {
  IN_PROGRESS: "IN_PROGRESS",
  REVIEW: "REVIEW",
  READY: "READY",
} as const;

export type SectionType = keyof typeof Sections;

const SectionLabels: Record<SectionType, string> = {
  [Sections.IN_PROGRESS]: "In progress",
  [Sections.REVIEW]: "Review",
  [Sections.READY]: "Ready to merge",
};

type Props = {
  type: SectionType;
};

function BranchesSection({ type }: Props) {
  const { branches } = useBranches();

  const sectionBranches = useMemo(() => {
    return branches.filter((branch) => branch.state === type);
  }, [branches]);
  return (
    <section>
      <h2 className={styles.header}>
        {SectionLabels[type]} ({sectionBranches.length})
      </h2>
      <section className={styles.branches}>
        {sectionBranches.map((branch) => (
          <Branch
            key={branch.name}
            name={branch.name}
            sectionType={branch.state}
          />
        ))}
      </section>
    </section>
  );
}

export default BranchesSection;
