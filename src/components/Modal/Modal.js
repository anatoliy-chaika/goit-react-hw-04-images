import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ image, isOpen, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyle isOpen={isOpen}>
        <img src={image} alt={alt} width="1000" />
      </ModalStyle>
    </Overlay>,
    modalRoot
  );
}
// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeydown);
//   }
//   handleKeydown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     const { image, isOpen, alt } = this.props;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalStyle isOpen={isOpen}>
//           <img src={image} alt={alt} width="1000" />
//         </ModalStyle>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  img: PropTypes.array,
  isOpen: PropTypes.bool,
};
