import styles from "./styles.module.css";

export const Sections = {
  IN_PROGRESS: "IN_PROGRESS",
  REVIEW: "REVIEW",
  READY: "READY",
} as const;

type SectionType = keyof typeof Sections;

const SectionLabels: Record<SectionType, string> = {
  [Sections.IN_PROGRESS]: "In progress",
  [Sections.REVIEW]: "Review",
  [Sections.READY]: "Ready to merge",
};

type Props = {
  type: SectionType;
};

function BranchesSection({ type }: Props) {
  return (
    <section>
      <h2 className={styles.header}>{SectionLabels[type]}</h2>
    </section>
  );
}

export default BranchesSection;
