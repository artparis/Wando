import React from "react";

export interface CreateModalProps {
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
  channels: any[];
  roles: any[];
  guildID: string;
  setReactionsConfig: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateModal: React.FC<CreateModalProps> = (props) => {
  // Minimal stub. Replace with your real UI.
  return (
    <div style={{ color: 'white', margin: 8 }}>
      Create Modal (stub)
      <button onClick={() => props.setShowCreate(false)}>Close</button>
    </div>
  );
};

export default CreateModal;
