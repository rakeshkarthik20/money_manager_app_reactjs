import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  updateTitle = e => {
    this.setState({title: e.target.value})
  }

  updateType = e => {
    // if (e.target.value === 'EXPENSES') {
    //   this.setState({type: 'Expenses'})
    // } else if (e.target.value === 'INCOME') this.setState({type: 'Income'})
    this.setState({optionId: e.target.value})
  }

  updateAmount = e => {
    this.setState({amount: e.target.value})
  }

  deleteTransaction = uniqueId => {
    const {balance, income, expenses, transactionsList} = this.state
    const deletedTransaction = transactionsList.filter(
      each => each.id === uniqueId,
    )
    console.log(deletedTransaction[0].type)
    let newBalance = balance
    let newIncome = income
    let newExpenses = expenses

    if (deletedTransaction[0].type === 'Income') {
      newIncome = parseInt(income) - parseInt(deletedTransaction[0].amount)
      newBalance = parseInt(balance) - parseInt(deletedTransaction[0].amount)
    } else if (deletedTransaction[0].type === 'Expenses') {
      newExpenses = parseInt(expenses) - parseInt(deletedTransaction[0].amount)
      newBalance = parseInt(balance) + parseInt(deletedTransaction[0].amount)
    }

    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        each => each.id !== uniqueId,
      ),
      balance: newBalance,
      income: newIncome,
      expenses: newExpenses,
    }))
  }

  addHistoryItems = e => {
    e.preventDefault()
    const {title, amount, balance, income, expenses, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newHistoryItem = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    let newIncome = parseInt(income)
    let newBalance = parseInt(balance)
    let newExpenses = parseInt(expenses)

    if (displayText === 'Income') {
      newIncome = parseInt(income) + parseInt(amount)
      newBalance += parseInt(amount)
    } else if (displayText === 'Expenses') {
      newBalance -= parseInt(amount)
      newExpenses += parseInt(amount)
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newHistoryItem],
      title: '',
      amount: '',
      balance: newBalance,
      income: newIncome,
      expenses: newExpenses,
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  render() {
    const {
      transactionsList,
      title,
      amount,
      balance,
      income,
      expenses,
      optionId,
    } = this.state
    // console.log(balance, income, expenses, type)
    return (
      <div className="mainContainer">
        <div className="userContainer">
          <h1 className="userName">Hi, Rakesh Karthik</h1>
          <p className="welcomeMessage">
            Welcome back to your
            <span className="moneyManager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="transactionManagementContainer">
          <div className="transactionContainer">
            <h1 className="transactionHeading">Add Transaction</h1>
            <form className="form" onSubmit={this.addHistoryItems}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <br />
              <input
                className="title input"
                name="title"
                id="title"
                type="text"
                placeholder="TITLE"
                value={title}
                onChange={this.updateTitle}
              />
              <br />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <br />
              <input
                className="amountInput input"
                name="amount"
                id="amount"
                type="text"
                placeholder="AMOUNT"
                value={amount}
                onChange={this.updateAmount}
              />
              <br />
              <label htmlFor="type" className="label">
                TYPE
              </label>
              <br />
              <select
                className="type input"
                name="type"
                id="type"
                type="select"
                value={optionId}
                onChange={this.updateType}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button className="submit" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="historyContainer">
            <h1 className="historyMainHeading">History</h1>
            <div className="historyTableContainer">
              <ul className="historyTable">
                <li className="historyTableContent">
                  <p className="historyHeading">Title</p>
                  <p className="historyHeading">Amount</p>
                  <p className="historyHeading">Type</p>
                  <p className="lastColumn historyHeading"> image</p>
                </li>
                {transactionsList.map(each => (
                  <TransactionItem
                    deleteTransaction={this.deleteTransaction}
                    history={each}
                    key={each.id}
                    uniqueId={each.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
