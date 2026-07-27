import { SVGProps as ReactSVGProps } from "react";

interface SVGProps extends ReactSVGProps<SVGSVGElement> {
  size?: number;
}

const SVGBase = ({size, ...props}: SVGProps) => {
  if (size) {
    props = {
      ...props,
      width: size,
      height: size
    }
  }
  return (
    <svg {...props} />
  );
};

export const SVGLogoFacebook = (props: SVGProps) => (
  <SVGBase
    fill="currentColor"
    height="100px"
    width="100px"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="-337 273 123.5 256"
    xmlSpace="preserve"
    {...props}>
    <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3
      c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"/>
  </SVGBase>
);

export const SVGLogoInstagram = (props: SVGProps) => (
  <SVGBase
    fill="currentColor"
    width="100px"
    height="100px"
    viewBox="0 0 32 32"
    version="1.1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <g>
      <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z"/>
      <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z"/>
      <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z"/>
    </g>
  </SVGBase>
);

export const SVGLogoTwitter = (props: SVGProps) => (
  <SVGBase
    width="100"
    height="100"
    viewBox="0 0 1200 1227"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
      fill="currentColor"/>
  </SVGBase>

);

export const SVGCart = (props: SVGProps) => (
  <SVGBase
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    {...props}>
    <path
      d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round" />
  </SVGBase>
);

export const SVGChevronBlockLeft = (props: SVGProps) => (
  <SVGBase
    width="100px"
    height="100px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
  <rect width="24" height="24"/>
  <path
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM13.7071 8.29289C14.0976 8.68342 14.0976 9.31658 13.7071 9.70711L11.4142 12L13.7071 14.2929C14.0976 14.6834 14.0976 15.3166 13.7071 15.7071C13.3166 16.0976 12.6834 16.0976 12.2929 15.7071L9.5554 12.9696C9.0199 12.4341 9.0199 11.5659 9.55541 11.0304L12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289Z"/>
  </SVGBase>
);

export const SVGChevronBlockRight = (props: SVGProps) => (
  <SVGBase
    width="100px"
    height="100px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <rect width="24" height="24"/>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2929 15.7071C9.90237 15.3166 9.90237 14.6834 10.2929 14.2929L12.5858 12L10.2929 9.70711C9.90237 9.31658 9.90237 8.68342 10.2929 8.29289C10.6834 7.90237 11.3166 7.90237 11.7071 8.29289L14.4229 11.0087C14.9704 11.5562 14.9704 12.4438 14.4229 12.9913L11.7071 15.7071C11.3166 16.0976 10.6834 16.0976 10.2929 15.7071ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z"/>
  </SVGBase>
);

export const SVGChevronDown = (props: SVGProps) => (
  <SVGBase
    width="100px"
    height="100px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"/>
  </SVGBase>
);

export const SVGChevronUp = (props: SVGProps) => (
  <SVGBase
    width="100px"
    height="100px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.29289 15.7071C4.68342 16.0976 5.31658 16.0976 5.70711 15.7071L12 9.41421L18.2929 15.7071C18.6834 16.0976 19.3166 16.0976 19.7071 15.7071C20.0976 15.3166 20.0976 14.6834 19.7071 14.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L4.29289 14.2929C3.90237 14.6834 3.90237 15.3166 4.29289 15.7071Z"/>
  </SVGBase>
);


// export const SVGChevronDown = (props: SVGProps) => (
//   <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="matrix(1, 0, 0, 1, 0, 0)" stroke-width="2.16">
//     <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//     <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.43200000000000005"></g>
//     <g id="SVGRepo_iconCarrier">
//       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#000000">
//       </path>
//     </g>
//   </svg>
// );

// export const SVGChevronUp = (props: SVGProps) => (
//   <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="matrix(1, 0, 0, -1, 0, 0)" stroke-width="2.16">
//     <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//     <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.43200000000000005"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#000000"></path> </g></svg>
// );

/*
chevron down
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <path d="M20 35 L50 65 L80 35"
    fill="none" stroke="currentColor" stroke-width="10"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>

chevron up
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <path d="M20 65 L50 35 L80 65"
    fill="none" stroke="currentColor" stroke-width="10"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>

chevron left
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <path d="M65 20 L35 50 L65 80"
    fill="none" stroke="currentColor" stroke-width="10"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>

chevron right
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <path d="M35 20 L65 50 L35 80"
    fill="none" stroke="currentColor" stroke-width="10"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>


*/