const CustomerDetails =({customerDetails})=>{
    console.log("Data",customerDetails)
    if (!customerDetails) {
        return <div>Loading customer details...</div>;
    }
    return (
        <>
        <div className="customer-details">
                        <h3><u>Customer Details</u></h3>
                        <div>
                            <p><strong>Customer Name:</strong> {customerDetails.fullName}</p>
                            <p><strong>Username: </strong> {customerDetails.username}</p>

                            <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
                            <p><strong>Email:</strong> {customerDetails.email}</p>

                        </div>
                    </div>
        </>
    )
}
export default CustomerDetails