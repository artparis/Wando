import React from "react";

export interface DeleteNotificationProps {
  data: any;
  setDeleteNotif: React.Dispatch<React.SetStateAction<any>>;
  setReactionsConfig: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteNotification: React.FC<DeleteNotificationProps> = (props) => {
  // Minimal stub. Replace with your real UI.
  return (
    <div style={{ color: 'white', margin: 8 }}>
      Delete Notification (stub)
      <button onClick={() => props.setDeleteNotif(null)}>Close</button>
    </div>
  );
};

export default DeleteNotification;
