// 예시입니다
// 이런식으로 해당 페이지나 컴포넌트에서 사용하는 type을 여기서 정의한 뒤 import해서 사용하면 됨.

export interface Application {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    createdAt: string;
    href: string;
    shop: {
      id: string;
      name: string;
      category: string;
      address1: string;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    notice: {
      item: {
        id: string;
        hourlyPay: number;
        description: string;
        startsAt: string;
        workhour: number;
        closed: boolean;
      };
    };
  };
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
