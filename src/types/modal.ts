interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'primary' | 'secondary';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  content?: string;
  message: string;
  buttons: ButtonProps[];
}
