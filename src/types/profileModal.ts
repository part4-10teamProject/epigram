export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  writer: Writer;
}

interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}
