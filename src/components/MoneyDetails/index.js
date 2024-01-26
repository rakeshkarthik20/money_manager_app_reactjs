// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props
  return (
    <div className="MoneyDetailsContainer">
      <li className="balanceClass MoneyDetailsItem">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image"
        />
        <div className="amountContainer">
          <p className="displayText">Your Balance</p>
          <p className="amount" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </li>
      <li className="MoneyDetailsItem incomeClass">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image"
        />
        <div className="amountContainer">
          <p className="displayText">Your Income</p>
          <p className="amount" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </li>
      <li className="MoneyDetailsItem expensesClass">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image"
        />
        <div className="amountContainer">
          <p className="displayText">Your Expenses</p>
          <p className="amount" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </li>
    </div>
  )
}

export default MoneyDetails
