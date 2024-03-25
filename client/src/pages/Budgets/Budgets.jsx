    import React from 'react'
import AddBudgetForm from './AddBudgetForm'
import ExistingBudgets from './ExistingBudgets'
    
    const Budgets = () => {
      return (
        <div className='px-4 my-4'>
          <AddBudgetForm />
          <ExistingBudgets />
        </div>
      )
    }
    
    export default Budgets