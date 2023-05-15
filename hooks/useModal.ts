import { modalAtomFamily } from '@/recoil/atom';
import { useRecoilState } from 'recoil';

function useModal(modalId: string) {
  const [isModalOpened, setIsModalOpened] = useRecoilState(modalAtomFamily(modalId));

  const handleIsModalOpened = () => {
    setIsModalOpened((prevIsModalOpened) => !prevIsModalOpened);
  };

  return {
    isModalOpened,
    handleIsModalOpened,
  };
}

export default useModal;
