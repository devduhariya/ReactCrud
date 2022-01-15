import React, { Component, useState, useEffect } from 'react';
const Table = (props) => {
    console.log('props: ', props);
    let { data, editTableRecordHandler, deleteTableRecordHandler, countries,viewRecordHandler } = props;
    const [searchInp, setSearchInp] = useState('')
  const [filterCountry, setFilterCountry] = useState(countries[0].text);


    return (
        <div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <input type='text' className="form-control" value={searchInp} placeholder='Search By Name, Email' onChange={(evt) => setSearchInp(evt.target.value)} />
                </div>
                <div className='col-4'>
                    <select className="form-control" value={filterCountry} onChange={(evt) => setFilterCountry(evt.target.value)}>
                        {
                            countries.map((data, idx) => {
                                return (
                                    <option value={data.text} key={idx}>
                                        {data.text}
                                    </option>)
                            })
                        }
                    </select>
                </div>

            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Address</th>
                        <th colSpan="3" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(data && data.length > 0) ? data.map((data, index) => {
                        // console.log("filterCountry: ", filterCountry," data.selectedCountry: ", data.selectedCountry)
                        // (data.Email.indexOf(searchInp) !== -1 || data.Name.indexOf(searchInp) !== -1) ||
                        if( (data.Email.indexOf(searchInp) !== -1 || data.Name.indexOf(searchInp) !== -1) || data.selectedCountry.indexOf(filterCountry) !== -1)
                        return (
                            <tr key={index}>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>{data.Phone_Number}</td>
                                <td>{data.selectedCountry}</td>
                                <td>{data.selState}</td>
                                <td>{data.Address}</td>
                                <td><button className="btn btn-sm btn-warning" onClick={() => editTableRecordHandler(data.Email, data)}>Edit </button></td>
                                <td><button className="btn btn-sm btn-primary" onClick={() => viewRecordHandler(data.Email,data)}>View </button></td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => deleteTableRecordHandler(data.Email)}>Delete </button></td>
                            </tr>
                        )
                    }) : <tr><td colSpan="7">No Records Found!</td></tr>}
                </tbody>
            </table>
        </div>
    );
}
export default Table