import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { TransactionsContext } from '../../TransactionsContext';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

Modal.setAppElement("#root");

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');


    const { createTransaction } = useContext(TransactionsContext)

   async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
       await createTransaction({ title, amount, category, type })

       setTitle('');
       setAmount(0);
       setCategory('');
       onRequestClose();
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-orverlay"
            className="react-modal-content"
        >
            <button
                onClick={onRequestClose}
                className="react-modal-close">
                <img src={closeImg} alt="fechar Modal" />
            </button>
            <Container>
                <h2>Cadastrar Transação</h2>
                <input
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    placeholder="Valor"
                    type="number"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox type="button"
                        isActive={type === 'deposit'}
                        activeColor="green"
                        onClick={() => setType('deposit')}>
                        <img src={incomeImg} alt="entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button"
                        isActive={type === 'withdraw'}
                        activeColor="red"
                        onClick={() => setType('withdraw')}>
                        <img src={outcomeImg} alt="saida" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)} />
                <button type="submit" onClick={handleCreateNewTransaction}>Cadastrar</button>
            </Container>
        </Modal>

    );
}


