import { useState } from 'react';

interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

interface AlertConfig {
  title: string;
  message: string;
  buttons: AlertButton[];
}

export const useCustomAlert = () => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (title: string, message: string, buttons: AlertButton[]) => {
    setAlertConfig({ title, message, buttons });
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
    setAlertConfig(null);
  };

  return {
    alertConfig,
    isVisible,
    showAlert,
    hideAlert,
  };
}; 