import React from "react";

export interface EditModalProps {
  setConfigEdit: React.Dispatch<React.SetStateAction<any>>;
  config: any;
  channels: any[];
  roles: any[];
  guildID: string;
  setReactionsConfig: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  // Minimal stub. Replace with your real UI.
  return (
    <div style={{ color: 'white', margin: 8 }}>
      Edit Modal (stub)
      <button onClick={() => props.setConfigEdit(null)}>Close</button>
    </div>
  );
};

export default EditModal;
