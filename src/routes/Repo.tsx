import { useParams } from "react-router-dom";

function Repo() {
  const { owner, repo } = useParams();
  return (
    <div>
      Hi from {owner}/{repo}
    </div>
  );
}

export default Repo;
