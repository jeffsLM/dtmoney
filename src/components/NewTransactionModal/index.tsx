import Modal from 'react-modal';

Modal.setAppElement("#root");

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen,onRequestClose}:NewTransactionModalProps) {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
            >
                <h2>
                    cadastrar Transação
                </h2>
            </Modal>
        </>
    );
}


