export interface profileModalProps {
  isOpen: boolean;
  onClose: () => void;
  writer: writer;
}

interface writer {
  id: number;
  nickname: string;
  image: string;
}
