import { useParams } from "react-router-dom";
import Kanban from "../../components/Kanban/Kanban";
import { BranchesContextProvider } from "../../contexts/BranchesContext";

function KanbanLoader() {
  const { owner, name } = useParams();
  if (!owner || !name) {
    return null;
  }

  return (
    <BranchesContextProvider owner={owner} name={name}>
      <Kanban />
    </BranchesContextProvider>
  );
}

export default KanbanLoader;
