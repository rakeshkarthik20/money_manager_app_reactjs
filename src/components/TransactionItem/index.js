// Write your code here
import './index.css'

const TransactionItem = props => {
  const {history, deleteTransaction, uniqueId} = props
  const {title, amount, type} = history

  const deleteTransactionItem = () => {
    deleteTransaction(uniqueId)
  }

  return (
    <li className="historyTableContent">
      <p className="historyContent">{title}</p>
      <p className="historyContent">{amount}</p>
      <p className="historyContent">{type}</p>
      <button
        className="deleteButton"
        type="button"
        onClick={deleteTransactionItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="deleteImage"
        />
      </button>
    </li>
  )
}

export default TransactionItem
