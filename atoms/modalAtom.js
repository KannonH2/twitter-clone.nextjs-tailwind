import { atom } from "recoil";


// estos modals states es lo mismo que hacer 
//const [modalState, setModalState] = useRecoilState(modalState);
// y se pueden usar globamente y no solo en el componente

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const postIdState = atom({
  key: "postIdState",
  default: "",
});