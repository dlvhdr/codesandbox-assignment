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
  branches?: string[];
};

function BranchesSection({ type, branches = [] }: Props) {
  return (
    <section>
      <h2 className={styles.header}>
        {SectionLabels[type]} ({branches.length})
      </h2>
      <section className={styles.branches}>
        {branches.map((branch) => (
          <Branch key={branch} name={branch} sectionType={type} />
        ))}
      </section>
    </section>
  );
}

export default BranchesSection;
