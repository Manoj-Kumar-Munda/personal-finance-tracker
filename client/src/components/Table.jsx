import React from "react";
import { dateToString, getIndianLocalTime } from "../utils/helpers";

const Table = ({expenses}) => {
  return (
  
      <table className="min-w-full">
        <thead className="font-Maven-Pro">
          <tr>
    
            <th scope="col" className="text-start pr-3 py-2">
              <span>#</span>
            </th>
            <th scope="col" className="text-start pr-3 py-2">
              <span>Spent amount <span className="font-Poppins">( &#8377; )</span></span>
            </th>
           
            <th scope="col" className="text-start pr-3 py-2">
              <span>Date</span>
            </th>
            <th scope="col" className="text-start pr-3 py-2">
              <span>Time</span>
            </th>
          </tr>
        </thead>
        <tbody className="font-Poppins">
          {
            expenses.map( (item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index+1}</td>
                  <td>{item.paidAmount}</td>
                  <td>{dateToString(item.date)}</td>
                  <td>{getIndianLocalTime(item.date)}</td>

                </tr>
              )
            })
          }

        </tbody>
      </table>
    
  );
};

export default Table;
