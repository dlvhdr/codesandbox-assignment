import { createContext, useCallback, useContext, useMemo } from "react";
import {
  Sections,
  SectionType,
} from "../components/BranchesSection/BranchesSection";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFetchRepo } from "../hooks/useFetchRepo";

type StoredBranch = {
  name: string;
  state: SectionType;
};

type BranchesContextType = {
  branches: StoredBranch[];
  moveBranch: (branchName: string, newSection: SectionType) => void;
  repo: {
    name: string;
    description: string;
    starGazersCount: number;
  };
  isLoading: boolean;
  error: null | unknown;
};

const BranchesContext = createContext<BranchesContextType>({
  branches: [],
  moveBranch: () => {},
  repo: {
    name: "",
    description: "",
    starGazersCount: 0,
  },
  isLoading: true,
  error: null,
});

type Props = {
  owner: string;
  name: string;
  children: React.ReactNode;
};

type UseBranches = {
  isLoading: boolean;
  error: unknown;
  branches: StoredBranch[];
  setStoredBranches: (branches: StoredBranch[]) => void;
  repo: {
    name: string;
    description: string;
    starGazersCount: number;
  };
};

export function useFetchBranches(owner: string, name: string): UseBranches {
  const [storedBranches, setStoredBranches] = useLocalStorage<StoredBranch[]>(
    `${owner}/${name}`,
    []
  );
  const { isLoading, data, error } = useFetchRepo(owner, name);

  const branches: StoredBranch[] = useMemo(() => {
    return (
      data?.refs.nodes.map<StoredBranch>((node) => ({
        name: node.name,
        state:
          storedBranches.find((branch) => branch.name === node.name)?.state ??
          Sections.IN_PROGRESS,
      })) ?? []
    );
  }, [data, storedBranches]);

  return {
    isLoading,
    branches,
    setStoredBranches,
    error,
    repo: {
      name: data?.name!,
      description: data?.description!,
      starGazersCount: data?.stargazerCount!,
    },
  };
}

function BranchesContextProvider({ owner, name, children }: Props) {
  const { isLoading, error, branches, setStoredBranches, repo } =
    useFetchBranches(owner, name);

  const moveBranch = useCallback(
    (branchName: string, newSection: SectionType) => {
      const branch = branches.find((branch) => branch.name === branchName);
      if (!branch) {
        return;
      }

      const newBranch: StoredBranch = {
        ...branch,
        state: newSection,
      };
      setStoredBranches([
        ...branches.filter((branch) => branch.name !== branchName),
        newBranch,
      ]);
    },
    [branches]
  );

  const value = useMemo(
    () => ({
      isLoading,
      error,
      repo,
      branches,
      moveBranch,
    }),
    [branches, moveBranch]
  );

  return (
    <BranchesContext.Provider value={value}>
      {children}
    </BranchesContext.Provider>
  );
}

function useBranches() {
  const context = useContext(BranchesContext);
  if (context === undefined) {
    throw new Error("useBranches must be used within a BranchesContext");
  }

  return context;
}

export { useBranches, BranchesContextProvider };
