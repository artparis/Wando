"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "#ui/Alert";
import { Save, AlertTriangle } from "lucide-react";

interface FormChangePopUpComponentProps {
  isChanged: boolean;
}

export const FormChangePopUpComponent = ({ isChanged }: FormChangePopUpComponentProps) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isChanged) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [isChanged]);

  if (!showAlert) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Alert variant="amber" className="w-80">
        <AlertTriangle className="size-5" />
        <AlertDescription className="flex items-center gap-2">
          <Save className="size-4" />
          You have unsaved changes. Click "Save Changes" to apply your configuration.
        </AlertDescription>
      </Alert>
    </div>
  );
}; 