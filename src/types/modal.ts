interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'primary' | 'secondary';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttons: ButtonProps[];
}
