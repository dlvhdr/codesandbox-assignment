import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";
import { useParams } from "react-router-dom";
import BranchesSection, {
  Sections,
} from "../../components/BranchesSection/BranchesSection";
import styles from "./styles.module.css";

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
    };
  }>(
    `
    query($name:String!, $owner:String!, $limit: Int!) { 
      repository(name:$name, owner:$owner) {
        name
        description
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

function Repo() {
  const { owner, repo } = useParams();
  if (!owner || !repo) {
    return null;
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ["repo"],
    queryFn: async () => fetchRepo(owner, repo),
  });

  if (isLoading || error) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.root}>
      <nav className={styles.nav}>
        <h1>{data?.name}</h1>
        <h1>{data?.description}</h1>
      </nav>
      <BranchesSection type={Sections.IN_PROGRESS} />
      <BranchesSection type={Sections.REVIEW} />
      <BranchesSection type={Sections.READY} />
      <p>{data?.refs.nodes.map((node) => node.name).join(", ")}</p>
    </main>
  );
}

export default Repo;
