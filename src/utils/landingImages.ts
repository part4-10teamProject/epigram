interface ImageInfo {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

interface CardImages {
  [key: string]: ImageInfo[];
}

export const landingImages: CardImages = {
  one: [
    {
      src: '/assets/images/landing/img_mobile_landing01.png',
      alt: 'Mobile Image 1',
      width: 312,
      height: 210,
      className: 'block md:hidden xl:hidden',
    },
    {
      src: '/assets/images/landing/img_Tablet_landing01.png',
      alt: 'Tablet Image 1',
      width: 384,
      height: 240,
      className: 'hidden md:block xl:hidden',
    },
    {
      src: '/assets/images/landing/img_Desktop_landing01.png',
      alt: 'Desktop Image 1',
      width: 744,
      height: 388,
      className: 'hidden xl:block',
    },
  ],
  two: [
    {
      src: '/assets/images/landing/img_mobile_landing02.png',
      alt: 'Mobile Image 2',
      width: 312,
      height: 209,
      className: 'block md:hidden',
    },
    {
      src: '/assets/images/landing/img_Tablet_landing02.png',
      alt: 'Tablet Image 2',
      width: 384,
      height: 240,
      className: 'hidden md:block xl:hidden',
    },
    {
      src: '/assets/images/landing/img_Desktop_landing02.png',
      alt: 'Desktop Image 2',
      width: 744,
      height: 388,
      className: 'hidden xl:block',
    },
  ],
  three: [
    {
      src: '/assets/images/landing/img_mobile_landing03.png',
      alt: 'Mobile Image 3',
      width: 312,
      height: 209,
      className: 'block md:hidden xl:hidden',
    },
    {
      src: '/assets/images/landing/img_Tablet_landing03.png',
      alt: 'Tablet Image 3',
      width: 384,
      height: 240,
      className: 'hidden md:block xl:hidden',
    },
    {
      src: '/assets/images/landing/img_Desktop_landing03.png',
      alt: 'Desktop Image 3',
      width: 744,
      height: 388,
      className: 'hidden xl:block',
    },
  ],
  four: [
    {
      src: '/assets/images/landing/img_mobile_landing04.png',
      alt: 'Mobile Image 4',
      width: 312,
      height: 576,
      className: 'md:hidden ',
    },
    {
      src: '/assets/images/landing/img_Tablet_landing04.png',
      alt: 'Tablet Image 4',
      width: 384,
      height: 688,
      className: 'hidden md:block xl:hidden',
    },
    {
      src: '/assets/images/landing/img_Desktop_landing04.png',
      alt: 'Desktop Image 4',
      width: 640,
      height: 864,
      className: 'hidden xl:block',
    },
  ],
};
