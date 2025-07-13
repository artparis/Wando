import React from "react";

export interface ReactionRolesListProps {
  reaction: any;
  channels: any[];
  roles: any[];
  setConfigEdit: React.Dispatch<React.SetStateAction<any>>;
  setReactionsConfig: React.Dispatch<React.SetStateAction<any[]>>;
  setDeleteNotif: React.Dispatch<React.SetStateAction<any>>;
}

const ReactionRolesList: React.FC<ReactionRolesListProps> = (props) => {
  // Minimal stub. Replace with your real UI.
  return (
    <div style={{ color: 'white', margin: 8 }}>
      Reaction Role List Item (stub)
    </div>
  );
};

export default ReactionRolesList;
