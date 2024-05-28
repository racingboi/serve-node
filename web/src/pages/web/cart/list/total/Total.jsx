import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Total() {
  return (
    <>
      <Container>
        <div className="row">
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    {/* ({totalItems})<span>${Math.round(subtotal)}</span> */}
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    {/* <span>${shipping}</span> */}
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      {/* <strong>${Math.round(subtotal + shipping)}</strong> */}
                    </span>
                  </li>
                </ul>

                <Link
                  to="/checkout"
                  className="btn btn-dark btn-lg btn-block"
                >
                  Go to checkout
                </Link>
              </div>
            </div>
          </div>
       </div>
     </Container>
    </>
  )
}
