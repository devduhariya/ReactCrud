import React, { Component, useState, useEffect } from 'react';
const Table = (props) => {
    //////console.log('props: ', props);
    let { data, editTableRecordHandler, deleteTableRecordHandler, countries, viewRecordHandler } = props;
    const [searchInp, setSearchInp] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterCountry, setFilterCountry] = useState('');
    // setFilteredData(data);
    function search(evt) {
        const val = evt.target.value;
        setSearchInp(val.toLowerCase());
        const filtered = getValues().filter(
            data =>
                data.Email.toLowerCase().indexOf(val) > -1 || data.Name.toLowerCase().indexOf(val) > -1
        );
        ////console.log("filtered: ", filtered);
        setFilteredData(filtered);
    }

    function getValues() {
        return data;
    }

    function searchCountry(evt) {
        const val = evt.target.value;
        setFilterCountry(val);
        const filtered = getValues().filter(
            data => {
                if (searchInp)
                    return data.selectedCountry.indexOf(val) > -1 && (data.Email.toLowerCase().indexOf(searchInp) > -1 || data.Name.toLowerCase().indexOf(searchInp) > -1)
                return data.selectedCountry.indexOf(val) > -1
            }
        );
        ////console.log("country filtered: ", filtered);
        setFilteredData(filtered);
    }

    return (
        <div>
            <div className='row mb-2'>
                <div className='col-4'>
                    <input type='text' className="form-control" value={searchInp} placeholder='Search By Name, Email' onChange={search} />
                </div>
                <div className='col-4'>
                    <select className="form-control" value={filterCountry} onChange={searchCountry}>
                        <option value='' key="543">
                            Select Country
                        </option>
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
                    {

                        (searchInp || filterCountry) ? filteredData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.Name}</td>
                                    <td>{data.Email}</td>
                                    <td>{data.Phone_Number}</td>
                                    <td>{data.selectedCountry}</td>
                                    <td>{data.selState}</td>
                                    <td>{data.Address}</td>
                                    <td><button className="btn btn-sm btn-warning" onClick={() => editTableRecordHandler(data.Email, data)}>Edit </button></td>
                                    <td><button className="btn btn-sm btn-primary" onClick={() => viewRecordHandler(data.Email, data)}>View </button></td>
                                    <td><button className="btn btn-sm btn-danger" onClick={() => deleteTableRecordHandler(data.Email)}>Delete </button></td>
                                </tr>
                            )
                        }) :
                            data.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.Name}</td>
                                        <td>{data.Email}</td>
                                        <td>{data.Phone_Number}</td>
                                        <td>{data.selectedCountry}</td>
                                        <td>{data.selState}</td>
                                        <td>{data.Address}</td>
                                        <td><button className="btn btn-sm btn-warning" onClick={() => editTableRecordHandler(data.Email, data)}>Edit </button></td>
                                        <td><button className="btn btn-sm btn-primary" onClick={() => viewRecordHandler(data.Email, data)}>View </button></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => deleteTableRecordHandler(data.Email)}>Delete </button></td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Table