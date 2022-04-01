function Table({ tableHeads=['Heading'], tableRows=[<tr>Nothing yet</tr>], textCenter=false }) {
    
    return ( 
        <div className="table-responsive">
            <table className={textCenter? "table table-striped text-center" : "table table-striped"}>
                <thead>
                    <tr>
                        {tableHeads.map((heading ,index)=> <th key={index}>{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
}

export default Table;