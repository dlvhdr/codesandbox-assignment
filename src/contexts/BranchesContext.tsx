import { createContext, useCallback, useContext, useMemo } from "react";
import {
  Sections,
  SectionType,
} from "../components/BranchesSection/BranchesSection";
import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";
import { useLocalStorage } from "../hooks/useLocalStorage";

type StoredBranch = {
  name: string;
  state: SectionType;
};

async function fetchRepo(owner: string, name: string) {
  const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });
  const { repository } = await octokit.graphql<{
    repository: {
      name: string;
      description: string;
      refs: {
        nodes: Array<{
          name: string;
        }>;
      };
      stargazerCount: number;
    };
  }>(
    `
    query($name:String!, $owner:String!, $limit: Int!) { 
      repository(name:$name, owner:$owner) {
        name
        description
        stargazerCount
        refs(first: $limit, refPrefix:"refs/heads/") {
          nodes {
            name
          }
        }  
      }
    }
  `,
    { owner, name, limit: 10 }
  );
  return repository;
}

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

function useFetchBranches(owner: string, repo: string): UseBranches {
  const { isLoading, data, error } = useQuery({
    queryKey: ["repo"],
    queryFn: async () => fetchRepo(owner, repo),
  });

  const [storedBranches, setStoredBranches] = useLocalStorage<StoredBranch[]>(
    `${owner}/${repo}`,
    []
  );

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
