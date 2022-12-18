import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

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

function useFetchRepo(owner: string | undefined, name: string | undefined) {
  const { isLoading, isFetching, isSuccess, data, error } = useQuery({
    queryKey: ["repo", { owner, name }],
    queryFn: async () => fetchRepo(owner!, name!),
    enabled: owner !== undefined && name !== undefined,
  });

  console.log({ error });

  return { data, isFetching, isLoading, isSuccess, error };
}

export { useFetchRepo };
